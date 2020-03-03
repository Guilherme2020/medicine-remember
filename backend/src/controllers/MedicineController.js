const Medicine = require('../models/Medicine');
const User = require('../models/User')
module.exports = {

  async index(req, res) {

    const medicines = await Medicine.find({});

    if (medicines) {
      return res.json(medicines);
    }

  },

  async store(req, res) {

    const { user_id } = req.headers;

    const { name, date, hour, description } = req.body;

    let user = await User.findById(user_id);

    if (!user) {
      return res.json(400).json({ error: "User does not exist" });
    }

    let isDoctor = user.isDoctor;

    let recommendedByDoctor = isDoctor ? true : false;

    const medicine = await Medicine.create({
      user: user_id,
      name,
      date,
      hour,
      recommendedByDoctor,
      description
    });

    console.log(medicine);

    req.io.emit('medicine', medicine);

    return res.json(medicine).json({ sucess: "Medicine create!" });

  },



}