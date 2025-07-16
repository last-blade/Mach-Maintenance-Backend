// import mongoose, { Schema } from "mongoose";

// const employeeSchema = new Schema({
//     employee: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },

//     employeeCreator: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
// }, {timestamps: true});

// export const Employee = mongoose.model("Employee", employeeSchema);


import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const employeeSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
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


employeeSchema.methods.generateAccessToken = async function(){
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

employeeSchema.methods.generateRefreshToken = async function(){
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

employeeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }

    return next();
});

export const Employee = mongoose.model("Employee", employeeSchema);