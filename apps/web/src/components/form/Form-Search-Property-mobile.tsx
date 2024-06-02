import React from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { DatePickerWithRange } from '../Datepicker-range';
import { cn } from '@/lib/utils';

const FormSearchPropertyMobile = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-2">
        <Input
          className="hover:bg-athens-gray-100 flex h-auto items-center justify-center rounded-full bg-transparent px-9 py-4 placeholder:capitalize focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="cari destinasi"
        />
        <DatePickerWithRange isOutline />
        <Input
          className="hover:bg-athens-gray-100 flex h-auto items-center justify-center rounded-full bg-transparent px-9 py-4 placeholder:capitalize focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="jumlah kamar"
          type="number"
        />
      </div>

      <Button className="bg-gossamer-500 hover:bg-gossamer-500/90 flex w-full gap-1.5 rounded-full">
        <Search size={16} />
        <span>Cari</span>
      </Button>
    </div>
  );
};

export default FormSearchPropertyMobile;
