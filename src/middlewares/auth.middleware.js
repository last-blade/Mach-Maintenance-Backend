import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model.js";

const authentication = asyncHandler(async (request, _, next) => {
    const {accessToken} = request?.cookies;

    if(!accessToken){
        throw new apiError(404, "Unauthorized access")
    }

    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);

    if(!decodedToken){
        throw new apiError(401, "Unauthorized access")
    }

    const userId = decodedToken.id;

    const foundUser = await User.findById(userId).select("-refreshToken -password _id -__v");

    if(!foundUser){
        throw new apiError(401, "Invalid token")
    }

    request.user = foundUser;

    next();

});

export {authentication}