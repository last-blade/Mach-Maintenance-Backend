import {apiError, apiResponse, asyncHandler, Department,} from "../../../allImports.js";

const editDepartment = asyncHandler(async (request, response) => {
  const { departmentId } = request.params;
  const { department } = request.body;

  if (!departmentId) {
    throw new apiError(400, "Department ID is required");
  }

  const foundDepartment = await Department.findById(departmentId);

  if (!foundDepartment) {
    throw new apiError(500, "Department not found maybe deleted");
  }

  if (!department) {
    throw new apiError(400, "Department is required");
  }

  // foundDepartment.department = department;
  // foundDepartment.save({validateBeforeSave: false});

  const updatedDepartment = await Department.findByIdAndUpdate(
    departmentId,
    {
      $set: {
        department,
      },
    },
    { new: true }
  ).select("departmentCreator");

  return response
    .status(200)
    .json(new apiResponse(200, updatedDepartment, "Department updated"));
});

export { editDepartment };
