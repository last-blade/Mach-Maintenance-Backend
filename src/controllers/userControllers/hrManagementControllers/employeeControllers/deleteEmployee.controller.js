import { apiError, apiResponse, asyncHandler, Employee } from "../../../allImports";

const deleteEmployee = asyncHandler(async (request, response) => {
    const {employeeId} = request.params;

    if(!employeeId){
        throw new apiError(400, "Employee ID not found")
    }

    const foundEmployee = await Employee.findById(employeeId);

    if(!foundEmployee){
        throw new apiError(404, "Emplyee not found maybe deleted")
    }

    await Employee.findByIdAndDelete(employeeId);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Employee deleted")
    )

});

export {deleteEmployee}