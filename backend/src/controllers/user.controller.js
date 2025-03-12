import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ContactRequest } from "../models/contectRequest.model.js";



export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body

    if ([name, email, username, password,].some((field) => field.trim() == "")) {
        throw new ApiError(400, 'all field are required')
    }


    const userExists = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userExists) {
        throw new ApiError(400, 'user all ready exist from this username and email');
    }


    const user = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password
    })


    const createUser = await User.findById(user._id).select('-password')

    if (!createUser) {
        throw new ApiError(401, 'user does not exist')
    }

    console.log('hwllo')

    const accessToken = await user.genrateAccessToken()

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options).json(
            new ApiResponse(201,{accessToken:accessToken , user:createUser}, 'user register successfully')
        )

})



export const userLogedIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username.trim() || !password.trim()) {
        throw new ApiError(401, "all field are required")
    }


    const user = await User.findOne({ username })
    console.log(user)

    if (!user) {
        throw new ApiError(401, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "password is incorrect")
    }



    const options = {
        httpOnly: true,
        secure: true
    }

    const accessToken = await user.genrateAccessToken()

    return res.status(201).
        cookie('accessToken', accessToken, options)
        .json(
            new ApiResponse(201, {user:user , accessToken:accessToken}, 'user logedIn successfully')
        )




})




export const uploadBlog = asyncHandler(async (req, res) => {
    const { title, blog } = req.body

    console.log(req.user._id)


    if ([title, blog].some((field) => field.trim() === "")) {
        throw new ApiError(401, "All fields are required ====>");
    }

    //hare we are checking if title and blog and avatar file is not empty
    // console.log(title , blog)
    // console.log("File Uploaded:", req.files?.avatar[0]?.path);


    if(!req.files || !req.files.avatar){
        throw new ApiError(401, "Please upload an image");  
    }

    

    const localFilePath = await req.files?.avatar[0]?.path

    if (!localFilePath) {
        throw new ApiError(401, "local File path not avalible")
    }

    const avatar = await uploadOnCloudinary(localFilePath)


    const newBlog = {
        Blogid: new mongoose.Types.ObjectId(),
        title:title.toUpperCase(),
        blog,
        avatar: avatar.url,
        createdAt: new Date()
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { blogs: newBlog } },
        { new: true }
    ).select("-password")

    return res.status(201)
        .json(new ApiResponse(201, user, 'blog has been uploded successfully'))

})




export const getUser = asyncHandler(async (req, res) => {



    if (!req.user) {
        throw new ApiError(401, "please login your id ")
    }


    const userDetails = await User.findById(req.user._id).select("-password")

    if (!userDetails) {
        throw new ApiError(401, "user does not exist")
    }


    return res.status(201)
        .json(
            new ApiResponse(201, userDetails, 'got user details')
        )

})






export const BlogDelete = asyncHandler(async (req, res) => {
    const { deleteId } = req.body;
    const { _id } = req.user;

    if (!deleteId) {
        throw new ApiError(400, "Delete ID is required");
    }

    if (!_id) {
        throw new ApiError(401, "Please log in first");
    }

    // Check if user exists
    const user = await User.findById(_id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    console.log(user.blogs)

    const blogExists = user.blogs.some((blog) => blog.Blogid.toString() === deleteId);

    console.log(blogExists)

    if (!blogExists) {
        throw new ApiError(404, "Blog found  not deleted");
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $pull: { blogs: { Blogid: new mongoose.Types.ObjectId(deleteId) } } }, // blogs array me se deleteId match hone wale object ko remove karega
        { new: true }
    ).select("-password");





    if (!updatedUser) {
        console.log('blog has been deleted')
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, "Blog has been deleted"));
});





export const editBlog = asyncHandler(async (req, res) => {
    const { blogId, title, blog } = req.body
    const { _id } = req.user

    if ([blogId, title, blog].some((field) => field.trim() == "")) {
        throw new ApiError(401, "all field are required")
    }


    const user = await User.findById(_id).select("-password")

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const existBlog = user.blogs.some((blog) => blog.Blogid.toString() === blogId)

    if (!existBlog) {
        throw new ApiError(404, "Blog not found")
    }


    const newData = {
        title: title,
        blog: blog
    }


    const response = await User.findOneAndUpdate(
        { _id, "blogs.Blogid": new mongoose.Types.ObjectId(blogId) },
        { $set: { "blogs.$.title": title, "blogs.$.blog": blog } },
        { new: true }
    ).select("-password");

    console.log(response)

    if (!response) {
        throw new ApiError(404, "Blog not updated");
    }

    res.status(200).json(
        new ApiResponse(201, response, "Blog updated successfully")
    );

})




export const getAllBlogs = asyncHandler(async (req, res) => {
    const _id = '67bf3da76b641a067859e2db'

    if (!_id) {
        throw new ApiError(401, "Please log in first")
    }

    const user = await User.findById(_id).select("-password")   

    if (!user) {
        throw new ApiError(404, "User not found")
    }   

    return res.status(200).json(
        new ApiResponse(200, user.blogs , "All blogs fetched successfully")
    );
}
)




export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken").json(new ApiResponse(200, {}, "Logout successfully"));
});






export const contactReq = asyncHandler(async (req, res) => {
    const {name , email , message ,date} = req.body

    if([name , email , message ].some((field)=> field.trim() == "")){
        throw new ApiError(401, "All fields are required")
    }


    const user = await ContactRequest.create({
        name,
        email,
        message,
        date
    })

    console.log(user)

    if(!user){
        throw new ApiError(401, "user request not send")
    }

    return res.status(201).json(
        new ApiResponse(201 , user , "user request send successfully")
    )

})





export const  getAllContactRequest = asyncHandler(async (req, res) => {
            const contactRequest = await ContactRequest.find()

            if(!contactRequest){
                throw new ApiError(401, "user request not found")
            }


            res.status(200).json(
                new ApiResponse(200 , contactRequest , "all user request fetched successfully")
            )
})







