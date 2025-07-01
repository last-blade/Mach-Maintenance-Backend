import {apiError, apiResponse, asyncHandler, Department,} from "../../../allImports";

const addDepartment = asyncHandler(async (request, response) => {
  const { department } = request.body;

  if (department.trim() === "") {
    throw new apiError(400, "Department name is required");
  }

  const newDepartment = await Department.create({
    department,
    departmentCreator: request.user.id,
  });

  const foundDepartment = await Department.findById(newDepartment._id).select(
    "-departmentCreator"
  );

  if (!foundDepartment) {
    throw new apiError(500, "Something went wrong while adding department");
  }

  return response
    .status(201)
    .json(new apiResponse(201, foundDepartment, "Departments fetched"));
});

export { addDepartment };
