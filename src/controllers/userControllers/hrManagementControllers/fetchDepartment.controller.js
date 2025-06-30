import { apiResponse, asyncHandler, Department } from "../../allImports.js";

const fetchDepartment = asyncHandler(async (request, response) => {
    const departments = await Department.find({
        departmentCreator: request.user.id,
    });

    return response.status(200)
    .json(
        new apiResponse(200, departments, "Departments fetched")
    )
});

export {fetchDepartment}