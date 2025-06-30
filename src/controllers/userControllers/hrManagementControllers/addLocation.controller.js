import { apiError, apiResponse, asyncHandler, Location } from "../../allImports.js";

const addLocation = asyncHandler(async (request, response) => {
    const {locationName, locationCode} = request.body;

    if(!locationName.trim() || !locationCode.trim()){
        throw new apiError(400, "All fields are required")
    }

    const location = await Location.create({
        locationName, 
        locationCode: locationCode.toUpperCase(),
    });

    return response.status(201)
    .json(
        new apiResponse(201, location, "Location created")
    )

});

const addChildLocation = asyncHandler(async (request, response) => {
    const {locationName, locationCode, locationParentId, locationChildId} = request.body;

    if(!locationName.trim() || !locationCode.trim()){
        throw new apiError(400, "All fields are required")
    }

    if(locationParentId){
        const childLocation = await Location.create({
            locationName,
            locationCode,
            hasParent: true,
        });

        const foundChildLocation = await Location.findById(childLocation._id);

        foundChildLocation.children = childLocation._id;
        foundChildLocation.save({validateBeforeSave: false})
    }

    else if(locationChildId){
        const parentLocation = await Location.create({
            locationName,
            locationCode,
            hasParent: true,
        });

        const foundParentLocation = await Location(parentLocation._id);

        // foundParentLocation.children = 

    }

});

export{addLocation, addChildLocation}