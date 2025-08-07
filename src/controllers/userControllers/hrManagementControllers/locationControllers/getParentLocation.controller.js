import { apiResponse, asyncHandler, Location } from "../../../allImports.js";

const getParentLocation = asyncHandler(async (request, response) => {
    const location = await Location.find({
        // locationCreator: request.user.id,
        isFactory: true,
    }).select("-locationCreator -__v");

    return response.status(200)
    .json(
        new apiResponse(200, location, "Parent location fetched")
    )
});

export {getParentLocation}