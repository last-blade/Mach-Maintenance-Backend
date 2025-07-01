import { apiError, apiResponse, asyncHandler, Location } from "../../allImports.js";

const addLocation = asyncHandler(async (request, response) => {
    const {locationName, locationCode, isFactory} = request.body;

    if(!locationName.trim() || !locationCode.trim()){
        throw new apiError(400, "All fields are required")
    }

    const location = await Location.create({
        locationName, 
        locationCode: locationCode.toUpperCase(),
        isFactory: isFactory || false,
    });

    return response.status(201)
    .json(
        new apiResponse(201, location, "Location created")
    )

});

const addChildLocation = asyncHandler(async (request, response) => {
  const { locationName, locationCode, locationId } = request.body;

  if (!locationId) {
    throw new apiError(400, "Parent location ID is required")
  }

  const parentLocation = await Location.findById(locationId);

  // agar parent location nahin hai iss location id kaa, toh fir yeh khud parent hai yaa factory hai
  if (parentLocation?.hasParent === false) {
    const location = await Location.create({
      locationName,
      locationCode: locationCode.toUpperCase(),
      locationParentId: locationId,
    });

    await Location.findByIdAndUpdate(locationId, {
      $push: { children: location._id },
    }, {new: true});

    location.hasParent = true;
    await location.save({ validateBeforeSave: false });

    const updatedLocation = await Location.findById(locationId);

    return response.status(201)
    .json(
        new apiResponse(201, updatedLocation, "Child location added")
    );
  } 
  
  else if(parentLocation?.hasParent === true || parentLocation?.isFactory === true){
    const location = await Location.create({
      locationName,
      locationCode: locationCode.toUpperCase(),
    });

    const updatedLocation = await Location.findByIdAndUpdate(locationId, {
        $push: {
            children: location._id,
        }
    }, {new: true})

    return response.status(201)
    .json(
        new apiResponse(201, updatedLocation, "Child location added")
    )

  }
});

const addParentLocation = asyncHandler(async (request, response) => {
    const { locationName, locationCode, locationId } = request.body;

    if (!locationId) {
        throw new apiError(400, "Parent location ID is required")
    }

  const childLocation = await Location.findById(locationId);

  if(childLocation?.hasParent === true){
    const location = await Location.create({
        locationName,
        locationCode,
        locationParentId: childLocation.locationParentId,
    });

    const oldPrentLocationId = childLocation.locationParentId;

    childLocation.locationParentId = location._id;
    await childLocation.save({validateBeforeSave: false});

    location.hasParent = true;
    await location.save({validateBeforeSave: false});
    // location.locationParentId = oldPrentLocationId;
    // await location.save({validateBeforeSave: false});

    await Location.findByIdAndUpdate(oldPrentLocationId, {
        $pull: {
            children: locationId,
        },

        $push: {
            children: location._id,
        }
    }, {new: true});


    //~ instead of writing two update calls, maine neeche wala code oopar wale mein hi likh diya i.e. (push wala). 
    // await Location.findByIdAndUpdate(oldPrentLocationId, {
    //     $push: {
    //         children: location._id,
    //     }
    // }, {new: true});

    const updatedLocation = await Location.findById(oldPrentLocationId);

    return response.status(201)
    .json(
        new apiResponse(201, updatedLocation, "Parent location added")
    )

  }

    else if(childLocation?.hasParent === false){
        const location = await Location.create({
            locationName,
            locationCode,
        });

        await Location.findByIdAndUpdate(location?._id, {
            $push: {
                children: locationId,
            }
        }, {new: true});

        childLocation.locationParentId = location?._id;
        childLocation.hasParent = true;
        await childLocation.save({ validateBeforeSave: false });


        const updatedLocation = await Location.findById(location._id)

        return response.status(201)
        .json(
            new apiResponse(201, updatedLocation, "Parent location added")
        )
    }

});

export {addParentLocation}


export{addLocation, addChildLocation}