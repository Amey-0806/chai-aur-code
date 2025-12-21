import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "./utils/ApiError.js";
import { User } from "./models/user.models.js";
import { uploadOnCloudnary } from "./utils/cloudinary.servvices.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  //validation - not empty, etx
  //check if user already exists - from username, email
  //check for images
  //check for avatar
  //upload to cloudnary, avatar checking
  //create user object - create entry in db
  //remove password and refresh tofen field from response
  //check for user creation
  //return response / error

  const { fullName, email, userName, password } = req.body;
  console.log("email: ", email);

  if (
    [fullName, email, userName, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username alread exists");
  }

  const avtarLocalPath = req.files?.avtar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avtar file is required");
  }

  const avtar = await uploadOnCloudnary(avtarLocalPath);
  const coverImage = await uploadOnCloudnary(coverImageLocalPath);

  if (!avtar) {
    throw new ApiError(400, "Avtar file is required");
  }

  const User = await User.create({
    fullName,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    emial,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(userName._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something wend wrong while regestring user!!!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registerd Successfully"));
});

export { registerUser };
