import { apiError, apiResponse, asyncHandler, Employee } from "../allImports.js";

const logoutEmployee = asyncHandler(async (request, response) => {
    const userId = request.user.id;

    const foundEmployee = await Employee.findById(userId);

    if(!foundEmployee){
        throw new apiError(401, "Unauthorized access, please login again")
    }

    await Employee.findByIdAndUpdate(userId, {
        $unset: {
            refreshToken: ""
        }
    }, {new: true});

    return response.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(
        new apiResponse(200, {}, "Logged out successfully")
    )
});

export { logoutEmployee }