"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CardWrapper } from "@/components/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isVisible, setIsVisible] = useState<boolean>(false);

   const form = useForm<zod.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   const onSubmit = (values: zod.infer<typeof RegisterSchema>) => {
      setError("");
      setSuccess("");
      startTransition(() => {
         register(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
         });
      });
   };

   return (
      <CardWrapper
         headerLabel="Create an Account"
         backButtonLabel="Already have an account? Login Here"
         backButtonHref="/auth/login"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormError message={error} />
               <FormSuccess message={success} />
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 type="name"
                                 {...field}
                                 placeholder="john doe"
                                 disabled={isPending}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 type="email"
                                 {...field}
                                 placeholder="john.doe@example.com"
                                 disabled={isPending}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <div className="flex items-center justify-between relative">
                                 <Input
                                    type={isVisible ? "text" : "password"}
                                    {...field}
                                    disabled={isPending}
                                 />
                                 <span
                                    className={`absolute right-4 cursor-pointer z-10 ${isPending && "text-gray-200 cursor-not-allowed"}`}
                                    onClick={() =>
                                       setIsVisible(
                                          (prevVisible) => !prevVisible
                                       )
                                    }
                                 >
                                    {isVisible ? <FaEye /> : <FaEyeSlash />}
                                 </span>
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <Button type="submit" className="w-full">
                  Create an account
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
};
