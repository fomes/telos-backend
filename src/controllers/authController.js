const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "testesecret",
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

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

      const payload = {
        userId: user.id,
      };

      const token = await generateToken(payload);

      res
        .status(201)
        .json({ email, password, fullName, birthDate, phone, token });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (user) {
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid password" });
        }

        const payload = {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          birthDate: user.birthDate,
          phone: user.phone,
        };

        const token = await generateToken({ userId: user.id });
        res.json({ token, ...payload });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new AuthController();
