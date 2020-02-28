const User = require('../models/User');

module.exports = {

  async login(req, res) {
    const { email } = req.body;
    const user = await User.findOne({email});


    try{

      if(user){
        res.json(user).json({message:"Login sucess"})
      }

    }catch(e){
      console.log(e);
    }

  },

}