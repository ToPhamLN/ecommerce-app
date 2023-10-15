import Discount from "../models/discountModel.js";

export const createDiscount = async (req, res, next) => {
  try {
    const newDiscount = new Discount({
      name: req.body.name,
      code: req.body.code,
      valid: req.body.valid,
      quantity: req.body.quantity,
      condition: req.body.condition,
    });
    const discount = await newDiscount.save();
    res.status(200).json({
      message: "Discount created successfully",
      discount,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDiscount = async (req, res, next) => {
  try {
    const { name, code, valid, quantity, condition } = req.body;
    const discount = await Discount.findById(
      req.params.discountId
    );
    if (!discount) {
      return res.status(404).json({
        message: "discount not found",
      });
    }
    let newDiscount = {
      name: name ? name : discount.name,
      code: code ? code : discount.code,
      valid: valid ? valid : discount.valid,
      quantity: quantity ? quantity : discount.quantity,
      condition: condition ? condition : discount.condition,
    };
    const result = await Discount.updateOne(
      { _id: req.params.discountId },
      { $set: newDiscount },
      { new: true }
    );
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDiscount = async (req, res, next) => {
  try {
    await Discount.findByIdAndDelete({
      _id: req.params.discountId,
    });
    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDiscount = async (req, res, next) => {
  try {
    let query = {};
    if (req.params.valid) query.valid = req.params.valid;
    const discount = await Discount.find(query);
    res.status(200).json(discount);
  } catch (error) {
    next(error);
  }
};

export const getDiscountId = async (req, res, next) => {
  try {
    const discount = await Discount.findById(
      req.params.discountId
    );
    if (!discount) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }
    res.status(200).json(discount);
  } catch (error) {
    next(error);
  }
};

export const getDiscount = async (req, res, next) => {
  try {
    const query = {
      quantity: { $gt: 0 },
    };
    if (req.query.code) {
      query.code = req.query.code;
    } else {
      return res.status(404).json({
        message: "Discount not found",
      });
    }
    if (req.query.condition)
      query.condition = { $lte: req.query.condition };
    console.log(query);
    const discount = await Discount.findOne(query);
    if (!discount) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }
    res.status(200).json(discount);
  } catch (error) {
    next(error);
  }
};

export const useDiscount = async (req, res, next) => {
  try {
    const discount = await Discount.findById(
      req.params.discountId
    );
    if (!discount && discount.quantity == 0) {
      return res.status(404).json({
        message: "This discount has expired",
      });
    }
    const newDiscount = {
      quantity: discount.quantity - 1,
    };
    const result = await Discount.updateOne(
      { _id: req.params.discountId },
      { $set: newDiscount },
      { new: true }
    );
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
