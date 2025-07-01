import { apiError, apiResponse, asyncHandler, Location } from "../../../allImports.js";

const editLocation = asyncHandler(async (request, response) => {
    const {locationId} = request.params;

    const {locationName, locationCode} = request.body;

    if(!locationId){
        throw new apiError(400, "Location ID not found")
    }

    if(!locationCode.trim() || locationName.trim()){
        throw new apiError(400, "All fields are required")
    }

    const foundLocation = await Location.findById(locationId);

    if(!foundLocation){
        throw new apiError(404, "Location not found")
    }

    const updatedLocation = await Location.findByIdAndUpdate(locationId, {
        $set: {
            locationName, 
            locationCode,
        }
    }, {new: true});

    return response.status(200)
    .json(
        new apiResponse(200, updatedLocation, "Location updated")
    )

});

export {editLocation}