import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TProperty } from '@/redux/slices/tenant-slice';
import { getTenantPropertiesThunk } from '@/redux/slices/tenant-thunk';
import { ColumnDef } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { DataTable } from './Property-Table/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowUpDown,
  Delete,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const PropertyTable = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { properties, isLoadingCategories } = useAppSelector(
    (state) => state.tenantReducer,
  );

  const columns: ColumnDef<TProperty>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Deskripsi',
    },
    {
      accessorKey: 'location',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Location
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'image',
      header: 'Image',
      // http://localhost:8000/user-images/${session.user.image}

      cell(props) {
        const { row } = props;

        const payment = row.original;

        return (
          <Popover>
            <PopoverTrigger>{payment.image}</PopoverTrigger>
            <PopoverContent>
              <div className="relative h-auto w-full">
                <Image
                  className="!relative object-contain"
                  src={`http://localhost:8000/properties/${payment.image}`}
                  fill
                  sizes="100%"
                  alt={`image-${payment.id}`}
                />
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      id: 'actions',
      header: 'Action',
      cell(props) {
        const { row } = props;

        const payment = row.original;

        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Efit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-red-100">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    if (isLoadingCategories === true)
      dispatch(
        getTenantPropertiesThunk({
          token: session?.user.accessToken!,
          id: session?.user.id!,
        }),
      );
  }, [isLoadingCategories]);

  return (
    <div>
      <DataTable columns={columns} data={properties} />
    </div>
  );
};

export default PropertyTable;
