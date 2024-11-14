"use server";

import * as zod from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
   const validatedFields = RegisterSchema.safeParse(values);

   if (!validatedFields.success) {
      return { error: "Invalid Fields!" };
   }
   const { name, email, password } = validatedFields.data;
   const hashedPassword = await bcrypt.hash(password, 10);

   const existingUser = await getUserByEmail(email);

   if (existingUser) {
      return { error: "Email already in use!" };
   }

   await db.user.create({
      data: {
         name,
         email,
         password: hashedPassword,
      },
   });

   // Todo: Send verification token email
   const verificationToken = await generateVerificationToken(email);
   await sendVerificationEmail(verificationToken.email,verificationToken.token);


   return { success: "Confirmation Email Sent!" };
};
