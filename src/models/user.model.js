import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    department: {
        type: String,
        required: true,
        trim: true,
    },

    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },

    shift: {
        type: String,
        required: true,
        trim: true,
    },

    contactNumber: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: false,
    },

    accountType: {
        type: String,
        enum: ["HR Management", "TPM", "IE"],
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    profileImage: {
        type: String,
        required: false,
    },

    refreshToken :{
        type: String,
        required: false,
    }
}, {timestamps: true});


userSchema.methods.generateAccessToken = async function(){
    const accessToken = await jwt.sign(
        {
            id: this._id,
            email: this.email,
            fullName: this.fullName,
        },

        process.env.ACCESS_TOKEN_SECRET_KEY,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    return accessToken;
}

userSchema.methods.generateRefreshToken = async function(){
    const refreshToken = await jwt.sign(
        {
            id: this._id,
        },

        process.env.REFRESH_TOKEN_SECRET_KEY,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    return refreshToken;
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }

    return next();
});

export const User = mongoose.model("User", userSchema);