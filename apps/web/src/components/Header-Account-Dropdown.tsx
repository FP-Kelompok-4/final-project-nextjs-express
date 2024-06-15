'use client';

import React from 'react';
import { LayoutDashboard, LogOut, Menu, Settings, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signout } from '@/actions/auth';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

const HeaderAccountDropdown = (props: {
  image: string | null;
  session?: Session | null;
}) => {
  const { session } = props;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-athens-gray-50 hover:bg-athens-gray-50/90 text-athens-gray-950 flex h-fit rounded-full p-2"
        >
          <div className="px-2">
            <Menu size={16} />
          </div>
          <Avatar className="aspect-square h-9 w-fit">
            <AvatarImage
              src={
                props.image
                  ? (props.image as string)
                  : 'https://github.com/shadcn.png'
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user.role === 'TENANT' && (
          <DropdownMenuGroup>
            <Link href={'/tenant/dashboard'}>
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <Link href={'/settings'}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signout().then((data) => {
              console.log('LogOut');
              console.log(data);
            });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAccountDropdown;
