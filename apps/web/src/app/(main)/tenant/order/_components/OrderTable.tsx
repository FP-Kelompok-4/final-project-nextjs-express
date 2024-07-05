import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Ban, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RoomAvailabilityDataTable from './data-table/Data-Table';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { format } from 'date-fns';
import { TGetOrdersByUserId } from '@/redux/slices/orderTenant-slice';
import { formatCurrencyRp } from '@/lib/formatNumber';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { cancelOrderByTenantThunk } from '@/redux/slices/orderTenant-thunk';
import { useToast } from '@/components/ui/use-toast';

const OrderTable = () => {
  const { orders } = useAppSelector((state) => state.orderTenantReducer);

  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const columns: ColumnDef<TGetOrdersByUserId>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Property Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'propertyCategory',
      header: 'Category',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('propertyCategory')}</div>
      ),
    },
    {
      accessorKey: 'invoiceId',
      header: 'Invoice Id',

    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const order = row.original;

        return (
          <div
            className={cn(
              `font-semibold capitalize`,
              order.status === 'finished'
                ? 'text-gossamer-600'
                : order.status === 'cancelled'
                  ? 'text-red-700'
                  : order.status === 'pending' &&
                      new Date(order.expDateTime) < new Date()
                    ? 'text-yellow-700'
                    : 'text-yellow-500',
            )}
          >
            {order.status === 'pending' &&
            new Date(order.expDateTime) < new Date()
              ? 'expired'
              : order.status}
          </div>
        );
      },
    },
    {
      accessorKey: 'totalPayment',
      header: 'Total Payment',
      cell: ({ row }) => (
        <div>{formatCurrencyRp(row.getValue('totalPayment'))}</div>
      ),
    },
    {
      accessorKey: 'checkIn',
      header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Check In
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {format(row.getValue('checkIn'), 'PPP')}
        </div>
      ),
    },
    {
      accessorKey: 'checkOut',
      header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Check Out
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {format(row.getValue('checkOut'), 'PPP')}
        </div>
      ),
    },
    {
      accessorKey: 'roomDetail',
      header: 'Room Detail',
      cell({ row }) {
        const order = row.original;

        return (
          <Popover>
            <PopoverTrigger className="underline">See Detail</PopoverTrigger>
            <PopoverContent className="flex flex-col">
              {order.rooms.map((o, i) => (
                <>
                  {i !== 0 && <Separator className="my-3" />}
                  <div className="flex flex-col gap-2 text-sm" key={i}>
                    <span>Type room: {o.type}</span>
                    <span>Qty: {o.quantity}</span>
                    <span>Price: {formatCurrencyRp(o.price)} night</span>
                  </div>
                </>
              ))}
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      accessorKey: 'customerDetail',
      header: 'Customer Detail',
      cell({ row }) {
        const order = row.original;

        return (
          <Popover>
            <PopoverTrigger className="underline">
              {order.customerGender
                ? order.customerGender === 'L'
                  ? `Mr. ${order.customerName}`
                  : `Mrs. ${order.customerName}`
                : order.customerName}
            </PopoverTrigger>
            <PopoverContent>
              <span className="text-sm">Email: {order.customerEmail}</span>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const roomAvaila = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {roomAvaila.status === 'pending' &&
                new Date(roomAvaila.expDateTime) > new Date() && (
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (session)
                        dispatch(
                          cancelOrderByTenantThunk({
                            tenantId: session.user.id,
                            userId: roomAvaila.customerId,
                            invoiceId: roomAvaila.invoiceId,
                            token: session.user.accessToken!,
                          }),
                        ).then((data: any) => {
                          toast({
                            variant: data.payload.error
                              ? 'destructive'
                              : 'default',
                            title: data.payload.error
                              ? data.payload.error
                              : data.payload.success,
                          });
                        });
                    }}
                  >
                    <Ban size={16} />
                    <span>Cancel</span>
                  </DropdownMenuItem>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <RoomAvailabilityDataTable columns={columns} data={orders} />
    </>
  );
};

export default OrderTable;
