import Order from "../models/orderModel.js";

// @desc    Create new order
// route    POST api/orders/create
// @access  private Auth
export const createOrder = async (req, res, next) => {};

// @desc Get order
// route GET api/orders/:orderId
// @access private Users Auth
export const getOrder = async (req, res, next) => {};

// @desc Get all orders
// route GET api/orders/all
// @access private Auth
export const getAllOrder = async (req, res, next) => {};

// @desc Update order
//  route POST api/orders/update/:orderId
// @access private Auth
export const updateOrder = async (req, res, next) => {};

// @desc Delete order
// route DELETE api/orders/delete/:orderId
// @access private Auth
export const deleteOrder = async (req, res, next) => {};
