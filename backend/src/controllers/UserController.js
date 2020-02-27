const User = require('../models/User');

module.exports = {
  
  async index(req, res) {

    const users = await User.find({});
    // .sort('-createdAt');
    console.log(users);
    return res.json(users);


  },
  
  async store(req, res) {
    const { name, email, isDoctor } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, isDoctor })
    }

    return res.json(user).json({message: "created user"});

  },



}