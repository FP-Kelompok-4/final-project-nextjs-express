export type TGetOrdersByUserId = {
  orderId: string;
  name: string;
  propertyCategory: string;
  status: string;
  totalPayment: number;
  checkIn: Date | string;
  checkOut: Date | string;
  expDateTime: Date | string;
  invoiceId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerGender: string | null;
};

export type TGetRoomsByUserId = {
  orderId: string;
  quantity: number;
  price: number;
  type: string;
};

export type CancelOrderReq = {
  userId: string;
  tenantId: string;
  invoiceId: string;
};

// Transform function
export const toGetOrdersByUserIdRes = ({
  orders,
  rooms,
}: {
  orders: TGetOrdersByUserId[];
  rooms: TGetRoomsByUserId[];
}) => {
  return orders.map((o) => {
    return {
      ...o,
      rooms: rooms.filter((r) => r.orderId === o.orderId),
    };
  });
};

export const toCancelOrderRes = (
  order: TGetOrdersByUserId & { rooms: TGetRoomsByUserId[] },
) => {
  return {
    order,
  };
};
