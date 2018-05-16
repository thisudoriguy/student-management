const User = require('../models/Users');

exports.userSignup = (req, res, next)=>{
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConfirm) {
      
        var userData = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          passwordConf: req.body.passwordConfirm,
        }
        var new_user = new User.create(userData, (err, user)=>{
            if (error) {
                console.log(err);
            } else {
                res.redirect('/profile');
            }
        })
    } 
   /* var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      }

    var new_user = new User(userData);
    new_user.save()
    .then(item=>{
        res.redirect('profile')
    })
    .catch(err =>{
        console.log(err)
    })
*/

}