import { apiError, apiResponse, asyncHandler, Location } from "../../../allImports.js";

const deleteLocationTree = async (locationId) => {
  const location = await Location.findById(locationId);

  if (!location){
    return;
  }

  for (const childId of location.children) {
    await deleteLocationTree(childId);
  }

  if (location.locationParentId) {
    await Location.findByIdAndUpdate(location.locationParentId, {
      $pull: { children: location._id },
    });
  }

  await Location.findByIdAndDelete(location._id);
};

const deleteLocation = asyncHandler(async (request, response) => {
    const {locationId} = request.params;

    if(!locationId){
        throw new apiError(400, "Location ID not found")
    }

    const foundLocation = await Location.findById(locationId);

    if(!foundLocation){
        throw new apiError(404, "Location not found")
    }

    await deleteLocationTree(locationId);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Location deleted")
    )
});

export {deleteLocation}
