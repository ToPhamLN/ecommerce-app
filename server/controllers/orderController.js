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
  } catch (error) {
    next(error);
  }
};

// @desc Delete order
// route DELETE api/orders/delete/:orderId
// @access private Auth
export const deleteOrder = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// @desc Get order
// route GET api/orders/:orderId
// @access private Users Auth
export const getOrder = async (req, res, next) => {
  try {
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
    if (req.query.status) query.status = req.query.status;
    if (req.query.sort) sort.updatedAt = req.query.sort;

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
