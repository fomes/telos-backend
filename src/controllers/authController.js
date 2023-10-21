const User = require("../models/users");

class AuthController {
  async register(req, res, next) {
    const { email, password, fullName, birthDate, phone } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({
        email,
        password,
        fullName,
        birthDate,
        phone,
      });

      await user.save();
      res.status(201).json({ email, password, fullName, birthDate, phone });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new AuthController();
