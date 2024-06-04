import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import SocialButton from './social-button';
import BackButton from './back-button';

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonLink: string;
  showSocial?: boolean;
} 

const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonLink,
  showSocial
} : CardWrapperProps) => {
  return (
    <Card>
      <CardContent className="space-y-2 pt-6">
        {children}
      </CardContent>
      <CardFooter>
        <Separator className='flex-1 bg-gray-400'/>
        <p className='px-4'>Atau</p>
        <Separator className='flex-1 bg-gray-400'/>
      </CardFooter>
      {showSocial && (
        <CardFooter>
          <SocialButton />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          link={backButtonLink}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper