import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/FileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get details from user - frontend/postman
  // validate the user details - not empty
  // check is user already exists -> via username,email
  // check for images,check for avatar
  // upload them to cloudinary,avatar
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user creation
  // return response else error

  const { fullname, email, username, password } = req.body;
  console.log("email :", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });
  // console.log(existingUser);

  if (existingUser) {
    throw new ApiError(409, "user with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files);
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // these fields are not selected "-"-->minus
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regstering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
