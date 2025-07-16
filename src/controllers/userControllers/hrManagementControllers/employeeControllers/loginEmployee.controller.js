import { accessTokenOptions, refreshTokenOptions } from "../../../../constants.js";
import { apiError, apiResponse, asyncHandler, generateAccessToken, generateRefreshToken, Employee } from "../../../allImports.js";

const loginEmployee = asyncHandler(async (request, response) => {
    const {email, password} = request.body;

    if(!email.trim() || !password){
        throw new apiError(404, "All fields are required")
    }

    const foundEmployee = await Employee.findOne({email});

    if(!foundEmployee){
        throw new apiError(404, "Employee with this email does not exists")
    }

    const isValidPassword = await foundEmployee.isPasswordCorrect(password);

    if(!isValidPassword){
        throw new apiError(401, "Incorrect password")
    }

    const accessToken = await generateAccessToken(foundEmployee._id);
    const refreshToken = await generateRefreshToken(foundEmployee._id);

    if(!accessToken || !refreshToken){
        throw new apiError(500, "Error in generating access and refresh token")
    }

    foundEmployee.refreshToken = refreshToken;
    foundEmployee.save({validateBeforeSave: false});

    const employee = await Employee.findOne({email}).select("-password -refreshToken -_id -__v");

    return response.status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
        new apiResponse(200, employee, "Logged in successfully")
    )

});

export {loginEmployee}