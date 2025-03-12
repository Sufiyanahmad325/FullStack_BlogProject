import mongoose from "mongoose";



const contactRequestSchema = new mongoose.Schema({
     name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        trim:true
     },

     message:{
        type:String,
        required:[true, 'message is required']
     },
     
     date:{
        type:String,
        
     }
     
},{timestamps:true})


export const ContactRequest = mongoose.model('contactRequest', contactRequestSchema)