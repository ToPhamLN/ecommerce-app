import Order from "../models/orderModel.js";

// @desc    Create new order
// route    POST api/orders/create
// @access  private Auth
export const createOrder = async (req, res, next) => {
  const {
    order,
    totalPrice,
    currentcy,
    discount,
    address,
    contact,
    username,
    email,
    paymentMethod,
  } = req.body;
  console.log("user", req.user);
  try {
    const newCart = new Order({
      order,
      totalPrice,
      currentcy,
      discount: discount || undefined,
      address,
      contact,
      username,
      email,
      paymentMethod,
      user: req.user._id,
    });
    const newOrder = await newCart.save();
    console.log(newOrder);
    res.status(200).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update order
//  route POST api/orders/update/:orderId
// @access private Auth
export const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const {
      order,
      totalPrice,
      currentcy,
      discount,
      address,
      contact,
      username,
      email,
      paymentMethod,
      status,
    } = req.body;

    const orderExisted = Order.findById({ _id: orderId });
    if (!orderExisted) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    const newOrder = {
      order: order ? order : orderExisted.order,
      totalPrice: totalPrice
        ? totalPrice
        : orderExisted.totalPrice,
      currentcy: currentcy ? currentcy : orderExisted.currentcy,
      discount: discount ? discount : orderExisted.discount,
      address: address ? address : orderExisted.address,
      contact: contact ? contact : orderExisted.contact,
      username: username ? username : orderExisted.username,
      email: email ? email : orderExisted.email,
      paymentMethod: paymentMethod
        ? paymentMethod
        : orderExisted.paymentMethod,
      status: status ? status : orderExisted.status,
    };
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: newOrder },
      { new: true }
    );
    res.status(200).json({
      message: "Order updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete order
// route DELETE api/orders/delete/:orderId
// @access private Auth
export const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const user = req.user;

    const order = await Order.findById({ _id: orderId });
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (!user.isAdmin && order.status === "Confirmed") {
      return res.status(404).json({
        message:
          "The order has already confirmed, you can't delete it",
      });
    }
    const result = await Order.findByIdAndDelete({
      _id: order._id,
    });
    res.status(200).json({
      message: "Order deleted successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get order
// route GET api/orders/:orderId
// @access private Users Auth
export const getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate({
        path: "order",
        populate: {
          path: "product",
          populate: {
            path: "category brand",
            select: "name _id",
          },
        },
      })
      .populate({
        path: "discount",
      });
  } catch (error) {
    next(error);
  }
};

// @desc Get all orders
// route GET api/orders/all
// @access private Auth
export const getAllOrder = async (req, res, next) => {
  try {
    let query = {};
    let sort = {};
    let page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let skip = (page - 1) * limit;

    if (req.query.gtePrice && req.query.ltePrice) {
      query.currentcy = {
        $gte: parseInt(req.query.gtePrice),
        $lte: parseInt(req.query.ltePrice),
      };
    }

    if (req.query.gteDate && req.query.lteDate) {
      const startDate = new Date(
        req.query.gteDate + "T00:00:00.000Z"
      );
      const endDate = new Date(
        req.query.lteDate + "T23:59:59.999Z"
      );
      query.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    if (req.query.status) query.status = req.query.status;
    if (req.query.sort) sort.updatedAt = req.query.sort;
    console.log(query, req.query);

    const order = await Order.find(query)
      .populate({
        path: "order",
        populate: {
          path: "product",
          populate: {
            path: "category brand",
            select: "name _id",
          },
        },
      })
      .populate({
        path: "discount",
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const currentcyRange = async (req, res, next) => {
  try {
    const range = req.params.range;
    const today = new Date();
    let start, end;

    switch (range) {
      case "day":
        start = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        end = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        );
        break;
      case "week":
        start = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        end = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 7
        );
        break;
      case "month":
        start = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        end = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        break;
      case "year":
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        throw new Error("Invalid range");
    }

    const total = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lt: end },
          status: "Confirmed",
        },
      },
      {
        $group: {
          _id: null,
          totalCurrentcy: { $sum: "$currentcy" },
          totalQuantity: { $sum: { $size: "$order" } },
        },
      },
    ]);

    res.json({
      total: total[0] ? total[0].totalCurrentcy : 0,
      quantity: total[0] ? total[0].totalQuantity : 0,
    });
  } catch (error) {
    next(error);
  }
};
