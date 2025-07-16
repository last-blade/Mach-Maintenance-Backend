import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const registerUser = asyncHandler(async (request, response) => {
    const {fullName, email, contactNumber, jobTitle, accountType, password, confirmPassword,} = request.body;

    if([fullName, email, contactNumber, accountType, password, confirmPassword].some(inputField => inputField === undefined || inputField.trim === "")){
        throw new apiError(404, "All fields are required")
    }

    if(password !== confirmPassword){
        throw new apiError(400, "Passwords do not match")
    }

    const foundUser = await User.findOne({email});

    if(foundUser){
        throw new apiError(409, "User with this email already exists")
    }

    await User.create({
        fullName,
        email,
        contactNumber,
        jobTitle, 
        accountType,
        password,
    });

    const foundNewlyCreatedUser = await User.findOne({email}).select("-password -refreshToken -__v -_id");

    if(!foundNewlyCreatedUser){
        throw new apiError(500, "Something went wrong, try again")
    }

    return response.status(201)
    .json(
        new apiResponse(201, foundNewlyCreatedUser, "User registered successfully")
    )

});

export {registerUser}