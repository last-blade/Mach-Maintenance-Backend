import {apiError, apiResponse, asyncHandler, Department,} from "../../../allImports";

const deleteDepartment = asyncHandler(async (request, response) => {
  const { departmentId } = request.params;

  if (!departmentId) {
    throw new apiError(400, "Department ID is required");
  }

  await Department.findByIdAndDelete(departmentId);

  return response
    .status(200)
    .json(new apiResponse(200, {}, "Department deleted"));
});

export { deleteDepartment };
