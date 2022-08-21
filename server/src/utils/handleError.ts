import { Prisma } from "@prisma/client";
const {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} = Prisma;

export function handleError(e: any) {
  return new Promise((_, reject) => {
    if (e instanceof PrismaClientInitializationError) {
      reject({
        msg: "error connecting to the database.",
      });
    } else if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2002":
          reject({
            msg: "This email is already registered.",
          });
        default:
          reject(e);
      }
    } else if (e instanceof PrismaClientValidationError) {
      reject({
        msg: "db validation failed.",
      });
    } else {
      reject(e);
    }
  });
}
