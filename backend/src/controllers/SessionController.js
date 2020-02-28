const User = require('../models/User');

module.exports = {

  async login(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });


    try {

      if (user) {
        res.json(user).send({ message: "Login sucess" })
      }else{
        res.status(404).send({message: 'user not found'});
      }

    } catch (e) {
      console.log(e);
    }

  },

}