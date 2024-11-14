import { ReactNode } from "react";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from "@/components/ui/card";
import { BackButton, Header, Social } from "@/components/auth";

interface CardWrapperProps {
   children: ReactNode;
   headerLabel: string;
   backButtonLabel: string;
   backButtonHref: string;
   showSocial?: boolean;
}

export const CardWrapper = ({
   children,
   headerLabel,
   backButtonLabel,
   backButtonHref,
   showSocial,
}: CardWrapperProps) => {
   return (
      <Card className="shadow-md w-[400px]">
         <CardHeader>
            <Header label={headerLabel} />
         </CardHeader>
         <CardContent>{children}</CardContent>
         {showSocial && (
            <CardFooter>
               <Social />
            </CardFooter>
         )}
         <CardFooter>
            <BackButton href={backButtonHref} label={backButtonLabel} />
         </CardFooter>
      </Card>
   );
};
