import { apiResponse, asyncHandler, Employee } from "../../../allImports.js";

const getEmployees = asyncHandler(async (request, response) => {
  const employees = await Employee.find({
    // employeeCreator: request.user.id,
  }).populate("department", "department").select("-employeeCreator -refreshToken -password");

  return response
    .status(200)
    .json(new apiResponse(200, employees, "Employees fetched"));
});

export { getEmployees };
