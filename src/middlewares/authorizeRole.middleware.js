import { asyncHandler } from "../utils/asyncHandler.js";

const authorizeRoles = (...allowedRoles) => {
    return asyncHandler(async (request, response, next) => {
        const userRole = request.user?.accountType;

        if(userRole !== allowedRoles.includes(userRole)){
            return response.status(403)
            .json({
                "statusCode": 403,
                "success": false,
                "data": null,
                "errors": ["Access denied"]
            })
        }

        next();
    })
};

export {authorizeRoles}