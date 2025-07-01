import { apiResponse, asyncHandler, Employee } from "../../../allImports.js";

const getEmployees = asyncHandler(async (request, response) => {
  const employees = await Employee.find({
    employeeCreator: request.user.id,
  }).populate("employee", "fullName jobTitle contactNumber email");

  return response
    .status(200)
    .json(new apiResponse(200, employees, "Employees fetched"));
});

export { getEmployees };
