const User = require("../models/User");

exports.register = async (req, res) => {

    const user = await User.create(req.body);

    res.json(user);

};

exports.getUsers = async (req, res) => {

    const users = await User.find();

    res.json(users);

};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    message: "Login successful",
    user
  });
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted"
  });
};
