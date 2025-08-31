import express from "express"
const router = express.Router();
import {User} from "../models/UserModel.js"; 

import { signUp ,login,logout} from "../utils/authentication.js";



router.get('/', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.json({ success: false });
  }
  console.log(user);

  res.json({ success: true, data: user });
});


router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/logout').get(logout);


export default router;