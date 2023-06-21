const config = require("../../config/config");
const User = require("../../models/User");

const CTRL = {};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

CTRL.login = (req, res) => {
  console.log(req.body.email)
  // User.findOne({email:req.body.email})
  // .then(user =>{
  //   console.log(`${JSON.stringify(user)}`)
  // })
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!user) {
      
      return res.status(401).json({
        ok: false,
        msg: "Username/Password invalid!",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        ok: false,
        msg: "Username/Password invalid!",
      });
    }

    let token = jwt.sign({ data: user }, config.SECRET_KEY, {
      expiresIn:'10h'
    });

    return res.status(200).json({
      ok: true,
      token,
    });
  });
};

module.exports = CTRL;
