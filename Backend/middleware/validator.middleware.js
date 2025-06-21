import { ZodError } from "zod";

export const validateRequest = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // validated + sanitized
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.error(
        {
          status: "error",
          message: "Validation failed",
          data: error.errors.map((issue) => ({
            field: `${issue.path.join(".")} is ${issue.message}`,
          })),
        },
        400
      );
    }

    return res.error(
      {
        status: "error",
        message: "Validation failed",
        data: error.message,
      },
      400
    );
  }
};
