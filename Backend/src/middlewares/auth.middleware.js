import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // take token from the req, & for mobile app, take token from header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // decode information from the token, like user id which we have provided during the token generation
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // find user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // Frontend Disscustion will happend on this
      throw new ApiError(401, "Invalid Access Token");

      req.user = user;
      next();
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
