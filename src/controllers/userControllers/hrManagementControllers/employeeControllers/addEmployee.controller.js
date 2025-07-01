import { apiError, apiResponse, asyncHandler, Employee } from "../../../allImports.js";

const addEmployee = asyncHandler(async (request, response) => {
  const {
    fullName,
    email,
    contactNumber,
    department,
    jobTitle,
    shift,
    accountType,
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
      shift,
      accountType,
      password,
      confirmPassword,
    ].some((inputField) => inputField === undefined || inputField.trim === "")
  ) {
    throw new apiError(404, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new apiError(400, "Passwords do not match");
  }

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    throw new apiError(409, "User with this email already exists");
  }

  await User.create({
    fullName,
    email,
    contactNumber,
    department,
    jobTitle,
    shift,
    address,
    accountType,
    password,
  });

  const foundNewlyCreatedUser = await User.findOne({ email }).select(
    "-password -refreshToken -__v -_id"
  );

  if (!foundNewlyCreatedUser) {
    throw new apiError(500, "Something went wrong, try again");
  }

  await Employee.create({
    employee: foundNewlyCreatedUser._id,
    employeeCreator: request.user.id,
  });

  return response
    .status(201)
    .json(
      new apiResponse(
        201,
        foundNewlyCreatedUser,
        "User registered successfully"
      )
    );
});

export { addEmployee };
