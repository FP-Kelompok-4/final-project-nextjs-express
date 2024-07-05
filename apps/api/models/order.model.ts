export type TGetOrdersByUserId = {
  orderId: string;
  name: string;
  propertyCategory: string;
  status: string;
  totalPayment: number;
  checkIn: string;
  checkOut: string;
  invoiceId: string;
  customerName: string;
  customerEmail: string;
  customerGender: string;
}

export type TGetRoomsByUserId = {
  orderId: string;
  quantity: number;
  price: number;
  type: string;
}

export const toGetOrdersByUserIdRes = ({
  orders, rooms
}:{
  orders: TGetOrdersByUserId[];
  rooms: TGetRoomsByUserId[];
}) => {
  return orders.map((o) => {
    return {
      ...o,
      rooms: rooms.filter((r) => r.orderId === o.orderId)
    }
  })
}