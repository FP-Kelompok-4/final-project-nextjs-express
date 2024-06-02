import React from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { DatePickerWithRange } from '../Datepicker-range';
import { cn } from '@/lib/utils';

const FormSearchProperty = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('', className)}>
      <Input
        className="hover:bg-athens-gray-100 flex h-auto items-center justify-center rounded-full border-none bg-transparent px-9 py-4 placeholder:capitalize focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="cari destinasi"
      />
      <Separator orientation="vertical" className="my-2.5 h-auto" />
      <DatePickerWithRange />
      <Separator orientation="vertical" className="my-2.5 h-auto" />
      <Input
        className="hover:bg-athens-gray-100 flex h-auto items-center justify-center rounded-full border-none bg-transparent px-9 py-4 placeholder:capitalize focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="jumlah kamar"
        type="number"
      />
      <div className="flex h-auto pr-2">
        <Button className="bg-gossamer-500 hover:bg-gossamer-500/90 flex gap-1.5 rounded-full">
          <Search size={16} />
          <span>Cari</span>
        </Button>
      </div>
    </div>
  );
};

export default FormSearchProperty;
