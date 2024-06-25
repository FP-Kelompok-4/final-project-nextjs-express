import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TProperty } from '@/redux/slices/tenant-slice';
import {
  deleteTenantDetailPropertyThunk,
  getTenantPropertiesThunk,
} from '@/redux/slices/tenant-thunk';
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
import UpdatePropertyForm from './UpdatePropertyForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PropertyTable = () => {
  const { data: session } = useSession();

  const route = useRouter();

  const dispatch = useAppDispatch();

  const { properties, isLoadingCategories, categories } = useAppSelector(
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
      accessorKey: 'propertyCategoryId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell(props) {
        const { row } = props;

        const payment = row.original;

        return (
          <>
            {isLoadingCategories
              ? 'Loading...'
              : categories.filter(
                  (data) => data.id === payment.propertyCategoryId,
                )[0].name}
          </>
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

              <Link href={`/tenant/property/${payment.id}`}>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="focus:bg-red-100"
                onClick={() =>
                  dispatch(
                    deleteTenantDetailPropertyThunk({
                      id: session?.user.id!,
                      pId: payment.id,
                      token: session?.user.accessToken!,
                    }),
                  ).then(() => {
                    route.refresh();
                  })
                }
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={properties} />
    </div>
  );
};

export default PropertyTable;
