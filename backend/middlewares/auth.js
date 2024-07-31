import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

// Middleware to authenticate admin users (token requirement removed)
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // No token check, proceed with the request
  // Optionally, you can set req.user if needed for other checks
  req.user = { role: 'Admin' }; // Example to set a mock user, adjust based on your needs
  next();
});

// Middleware to authenticate patient users (token requirement removed)
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // No token check, proceed with the request
  // Optionally, you can set req.user if needed for other checks
  req.user = { role: 'Patient' }; // Example to set a mock user, adjust based on your needs
  next();
});

// Middleware to check if user has the required role (unchanged)
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`, 403
        )
      );
    }
    next();
  };
};
