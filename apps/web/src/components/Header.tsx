import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Search, Vegan } from 'lucide-react';
import { cn } from '@/lib/utils';
import FormSearchProperty from './form/Form-Search-Property';
import FormSearchPropertyMobile from './form/Form-Search-Property-mobile';
import LinkBrand from './Link-Brand';
import Link from 'next/link';

export const Header = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-3 px-6 py-3 md:px-10 xl:px-20',
        className,
      )}
    >
      <div className="w-[20%]">
        <LinkBrand />
      </div>
      <FormSearchProperty className="hidden h-fit w-full flex-row items-center justify-center gap-1 rounded-full border-[1px] focus:bg-red-400 lg:flex xl:w-fit" />

      <div className="flex w-fit justify-end gap-3 md:w-[20%]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="bg-athens-gray-50 hover:bg-athens-gray-50/90 text-athens-gray-950 flex aspect-square items-center justify-center rounded-full p-0 lg:hidden"
              variant={'outline'}
            >
              <Search size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-4" side={'top'}>
            <SheetHeader>
              <SheetTitle>
                <LinkBrand />
              </SheetTitle>
            </SheetHeader>
            <FormSearchPropertyMobile />
          </SheetContent>
        </Sheet>

        <Button
          className="bg-gossamer-500 hover:bg-gossamer-500/90 rounded-full"
          asChild
        >
          <Link href='/signin'>
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
};
