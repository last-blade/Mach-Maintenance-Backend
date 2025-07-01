import { apiResponse, asyncHandler, Employee } from "../../../allImports.js";

const editEmployee = asyncHandler(async (request, response) => {
    const {employeeId} = request.params;

    const {fullName, email, contactNumber, department, jobTitle, shift, accountType, address} = request.body;

    if(!employeeId){
        throw new apiError(400, "Employee ID not found")
    }

    if ([fullName, email, contactNumber, department, jobTitle, shift, accountType,]
        .some((inputField) => inputField === undefined || inputField.trim === "")){
        throw new apiError(404, "All fields are required");
    }

    const foundEmployee = await Employee.findById(employeeId);

    if(!foundEmployee){ 
        throw new apiError(404, "Emplyee not found maybe deleted")
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, {
        $set: {
            fullName,
            email,
            contactNumber,
            department,
            jobTitle,
            shift,
            accountType,
            address,
        }
    }, {new: true});

    return response.status(200)
    .json(
        new apiResponse(200, updatedEmployee, "Employee updated")
    )

});

export {editEmployee}