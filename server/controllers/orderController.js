const Order = require("../models/Order");
exports.addOrder = async (req, res) => {
    const order = await Order.create(req.body);
    res.json(order);
};
exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};
    exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(order);
};
exports.deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order deleted" });
};
