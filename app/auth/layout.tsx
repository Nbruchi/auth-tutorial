import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Auth Page",
   description: "Layout for authorization",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
   return (
      <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
         {children}
      </div>
   );
}
