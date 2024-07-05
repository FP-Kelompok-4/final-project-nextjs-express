import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { TGetOrdersByUserId, TGetRoomsByUserId, toGetOrdersByUserIdRes } from "models/order.model";

export class OrderService {
  static async getOrdersByUserId(userId: string) {
    const orders = await prisma.$queryRaw`SELECT o.id as orderId, p.name, pc.name as propertyCategory,
      o.status, o.totalPayment, o.checkIn, o.checkOut, o.invoiceId, u.name as customerName,
      u.email as customerEmail, u.gender as customerGender
      FROM orders o
      INNER JOIN users u ON o.user_id=u.id
      INNER JOIN orderRooms ors ON o.id=ors.order_id
      INNER JOIN rooms r ON ors.room_id=r.id
      INNER JOIN properties p ON r.property_id=p.id
      INNER JOIN propertyCategories pc ON p.property_category_id=pc.id
      WHERE p.user_id=${userId}
      GROUP BY orderId, p.id
      ORDER BY o.updateAt DESC` as TGetOrdersByUserId[]

    const ordersId = orders.map((o) => o.orderId);

    const rooms = await prisma.$queryRaw`SELECT ors.order_id as orderId, ors.quantity, ors.price, r.type
      FROM orderRooms ors
      INNER JOIN rooms r ON ors.room_id=r.id
      WHERE ors.order_id IN (${Prisma.join(ordersId)})` as TGetRoomsByUserId[]

    return toGetOrdersByUserIdRes({orders, rooms});
  }
}