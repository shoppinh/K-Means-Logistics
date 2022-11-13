const Order = require("../models/Order");

const getAll = async (req, res, next) => {
  const { skip = 0, limit = 16, text=""} = req.value.query
  try {
    const orders = await Order.find({recipientName: {
      $regex: text,
      $options: 'i'
    }}).skip(skip).limit(limit);
    const totalItems = await Order.countDocuments();
    return res.status(200).json({
      orders: orders,
      totalItems,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getOrderById = async (req, res, next) => {
  const { orderId } = req.value.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
    } else {
      return res.status(200).json(order);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
const createOrder = async (req, res, next) => {
  const order = new Order(req.value.body);

  try {
    const newOrder = await Order.save();
    return res.status(200).json(newOrder);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateOrder = async (req, res, next) => {
  const { orderId } = req.value.params;
  const newOrder = req.value.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, newOrder);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteOrder = async (req, res, next) => {
  const { orderId } = req.value.params;
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
    } else {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getOrderById,
  getAll,
  createOrder,
  updateOrder,
  deleteOrder,
};
