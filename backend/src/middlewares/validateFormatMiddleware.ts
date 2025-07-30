import { Request, Response, NextFunction } from "express";
import { z } from "zod"
function validateFormatMiddleware(req: Request, res: Response, next: NextFunction) {
    const reqBody = z.object({
        firstname: z.string().min(1, "First name can not be empty"),
        lastname: z.string().min(1, "Last name can not be empty"),
        email: z.string().min(3, "Email is too short").max(50, "Email is too long").email("Invalid email"),
        password: z
          .string()
          .min(6, "Password must have atleast 6 characters")
          .refine((password) => /[A-Z]/.test(password), {
            message: "Password must have atleast one uppercase character",
          })
          .refine((password) => /[0-9]/.test(password), {
            message: "Password must have atleast one number",
          })
          .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "Password must have atleast one special character",
          }),
          college: z.string().min(1, "College can not be empty"),
          society: z.string().min(1, "Society can not be empty").optional(),
          identity_proof: z.string().min(1, "URL can not be empty").optional()
      });
    
      const parsedData = reqBody.safeParse(req.body);
      if (!parsedData.success) {
        res.status(400).json({
          message: `Incorrect format. ${parsedData.error.issues[0].message}`,
        });
        return;
    } else {
        next()
    }
}

export default validateFormatMiddleware