import express from "express";
import { BlogDelete, contactReq, editBlog, getAllBlogs, getAllContactRequest, getUser, logout, registerUser, uploadBlog, userLogedIn } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express()



router.route('/register').post(registerUser)
router.route('/login').post(userLogedIn)
router.route('/uploadBlog').post(verifyJWT, upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
   
]),uploadBlog)

router.route('/current-user').get(verifyJWT,getUser)
router.route('/delete-blog').post(verifyJWT,BlogDelete)
router.route('/edit-blog').post(verifyJWT,editBlog)
router.route('/get-all-blogs').get(getAllBlogs)
router.route('/logout').get(verifyJWT,logout)
router.route('/contact-request').post(contactReq)
router.route('/get-contact-request').get(getAllContactRequest)




export default router





