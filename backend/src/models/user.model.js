import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is reuired'],
    },

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },


    blogs: {
        type: Array
    },


    password: {
        type: String,
        required: [true, 'password is required']
    }




}, { timetamps: true }
)


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.genrateAccessToken = async function () {
    return jwt.sign({
        _id: this.id,
        email: this.email,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model('BlogProject', userSchema)