import * as zod from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = zod.object({
  email: zod.string().email({
    message: "Email is required",
  }),
  password: zod.string().min(1, {
    message: "Minimum of 6 characters required!",
  }),
  code: zod.optional(zod.string()),
});

export const ResetSchema = zod.object({
  email: zod.string().email({
    message: "Email is required",
  }),
});

export const RegisterSchema = zod.object({
  name: zod.string().min(1, {
    message: "Name is required!",
  }),
  email: zod.string().email({
    message: "Email is required",
  }),
  password: zod.string().min(1, {
    message: "Minimum of 6 characters required!",
  }),
});

export const NewPasswordSchema = zod.object({
  password: zod.string().min(6, {
    message: "Minimum of 6 characters required!",
  }),
});

export const SettingsSchema = zod
  .object({
    name: zod.optional(zod.string()),
    isTwoFactorEnabled: zod.optional(zod.boolean()),
    role: zod.enum([UserRole.ADMIN, UserRole.USER]),
    email: zod.optional(zod.string().email()),
    password: zod.optional(zod.string().min(6)),
    newPassword: zod.optional(zod.string().min(6)),
  })
  .refine(
    (data) => {
      return !(data.password && !data.newPassword);
    },
    {
      message: "New password required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      return !(data.newPassword && !data.password);
    },
    {
      message: "Password is required",
      path: ["password"],
    },
  );
