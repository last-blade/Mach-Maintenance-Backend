import { apiResponse, asyncHandler, Location } from "../../../allImports.js";

const getLocation = asyncHandler(async (request, response) => {

    const {locationId} = request.params;

    const location = await Location.find({
        // locationCreator: request.user.id,
        _id: locationId,
        // isFactory: true,
    }).populate("children", "locationName locationCode").select("-locationCreator");

    return response.status(200)
    .json(
        new apiResponse(200, location, "Location fetched")
    )
});

export {getLocation}