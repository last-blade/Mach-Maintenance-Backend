/*
Acknowledgement id humein assets-with-mechanics wali api se jo fetch ho raha hai response uske response mein se send karega frontend user
or iss assets-with-mechanics api ko frontend wala "acknowledgement" wale Tab mein bhi integrate karega mobile webApp mein.
or iss api mein acknowledgementid milegi or issi id ko pramas mein send karega user
*/

import { apiError, apiResponse, asyncHandler, MaintenanceAcknowledgment } from "../../../allImports.js";

const getAcknowledgementDetailsForSupervisor = asyncHandler(async (request, response) => {
    const {acknowledgementId} = request.params;

    const acknowledgement = await MaintenanceAcknowledgment.findById(acknowledgementId).populate("assetSpareId");

    if(!acknowledgement){
        throw new apiError(404, "Acknowledgement not found")
    }

    return response.status(200)
    .json(
        new apiResponse(200, acknowledgement, "Acknowledgement fetched")
    )

});

export {getAcknowledgementDetailsForSupervisor}