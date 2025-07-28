import { apiError, apiResponse, asyncHandler, Employee } from "../../../allImports.js";

const addEmployee = asyncHandler(async (request, response) => {
  const {
    fullName,
    email,
    contactNumber,
    department,
    jobTitle,
    accountType,
    shift,
    address,
    password,
    confirmPassword,
  } = request.body;

  if (
    [
      fullName,
      email,
      contactNumber,
      department,
      jobTitle,
      accountType,
      shift,
      password,
      confirmPassword,
    ].some((inputField) => inputField === undefined || inputField.trim === "")
  ) {
    throw new apiError(404, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new apiError(400, "Passwords do not match");
  }

  const foundEmployee = await Employee.findOne({ email });

  if (foundEmployee) {
    throw new apiError(409, "Employee with this email already exists");
  }

  await Employee.create({
    fullName,
    email,
    contactNumber,
    department,
    jobTitle,
    accountType,
    shift,
    address,
    password,
  });

  const foundNewlyCreatedEmployee = await Employee.findOne({ email }).select(
    "-password -refreshToken -__v -_id"
  );

  if (!foundNewlyCreatedEmployee) {
    throw new apiError(500, "Something went wrong, try again");
  }

  return response
    .status(201)
    .json(
      new apiResponse(
        201,
        foundNewlyCreatedEmployee,
        "Employee registered successfully"
      )
    );
});

export { addEmployee };
