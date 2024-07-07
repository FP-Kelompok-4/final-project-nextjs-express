import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { templateRuleNodemailer } from 'lib/nodeMailer';
import {
  CancelOrderReq,
  TGetOrdersByUserId,
  TGetRoomsByUserId,
  toCancelOrderRes,
  toGetOrdersByUserIdRes,
} from 'models/order.model';

export class OrderService {
  static async getOrdersByUserId(userId: string) {
    const orders =
      (await prisma.$queryRaw`SELECT o.id as orderId, p.name, pc.name as propertyCategory,
      o.status, o.totalPayment, o.checkIn, o.checkOut, o.invoiceId, u.name as customerName,
      u.email as customerEmail, u.gender as customerGender, u.id as customerId, o.expDateTime as expDateTime
      FROM orders o
      INNER JOIN users u ON o.user_id=u.id
      INNER JOIN orderRooms ors ON o.id=ors.order_id
      INNER JOIN rooms r ON ors.room_id=r.id
      INNER JOIN properties p ON r.property_id=p.id
      INNER JOIN propertyCategories pc ON p.property_category_id=pc.id
      WHERE p.user_id=${userId}
      GROUP BY orderId, p.id
      ORDER BY o.updateAt DESC`) as TGetOrdersByUserId[];

    const ordersId = orders.map((o) => o.orderId);

    const rooms =
      (await prisma.$queryRaw`SELECT ors.order_id as orderId, ors.quantity, ors.price, r.type
      FROM orderRooms ors
      INNER JOIN rooms r ON ors.room_id=r.id
      WHERE ors.order_id IN (${Prisma.join(ordersId)})`) as TGetRoomsByUserId[];

    return toGetOrdersByUserIdRes({ orders, rooms });
  }

  static async cancelOrder(req: CancelOrderReq) {
    const { userId, tenantId, invoiceId } = req;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const tenant = await prisma.user.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) throw new ResponseError(404, 'Tenant does not exist.');

    const order = await prisma.order.findFirst({
      where: {
        userId,
        invoiceId,
      },
      include: {
        orderRooms: {
          include: {
            room: {
              include: {
                property: {
                  include: {
                    propertyCategory: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error('Order does not exist.');

    const property = order.orderRooms[0].room.property;
    const id = order.id;

    if (!property) throw new ResponseError(404, 'Property does not exist.');

    const updateorder = await prisma.order.update({
      where: {
        id,
        userId,
        invoiceId,
      },
      data: {
        status: 'cancelled',
      },
      include: {
        orderRooms: {
          include: { room: true },
        },
      },
    });

    return toCancelOrderRes({
      orderId: updateorder.id,
      name: property.name,
      propertyCategory: property.propertyCategory.name,
      checkIn: updateorder.checkIn,
      checkOut: updateorder.checkOut,
      expDateTime: updateorder.expDateTime,
      invoiceId: updateorder.invoiceId,
      totalPayment: updateorder.totalPayment,
      rooms: updateorder.orderRooms.map(
        ({ orderId, price, quantity, room }) => {
          return {
            orderId,
            quantity,
            price,
            type: room.type,
          };
        },
      ),
      status: updateorder.status,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerGender: user.gender,
    });
  }

  static async rejectOrder(req: CancelOrderReq) {
    const { userId, tenantId, invoiceId } = req;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const tenant = await prisma.user.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) throw new ResponseError(404, 'Tenant does not exist.');

    const order = await prisma.order.findFirst({
      where: {
        userId,
        invoiceId,
      },
      include: {
        orderRooms: {
          include: {
            room: {
              include: {
                property: {
                  include: {
                    propertyCategory: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error('Order does not exist.');

    const property = order.orderRooms[0].room.property;
    const id = order.id;

    if (!property) throw new ResponseError(404, 'Property does not exist.');

    const updateorder = await prisma.order.update({
      where: {
        id,
        userId,
        invoiceId,
      },
      data: {
        status: 'rejected',
      },
      include: {
        orderRooms: {
          include: { room: true },
        },
      },
    });

    return toCancelOrderRes({
      orderId: updateorder.id,
      name: property.name,
      propertyCategory: property.propertyCategory.name,
      checkIn: updateorder.checkIn,
      checkOut: updateorder.checkOut,
      expDateTime: updateorder.expDateTime,
      invoiceId: updateorder.invoiceId,
      totalPayment: updateorder.totalPayment,
      rooms: updateorder.orderRooms.map(
        ({ orderId, price, quantity, room }) => {
          return {
            orderId,
            quantity,
            price,
            type: room.type,
          };
        },
      ),
      status: updateorder.status,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerGender: user.gender,
    });
  }

  static async acceptOrder(req: CancelOrderReq) {
    const { userId, tenantId, invoiceId } = req;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const tenant = await prisma.user.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) throw new ResponseError(404, 'Tenant does not exist.');

    const order = await prisma.order.findFirst({
      where: {
        userId,
        invoiceId,
      },
      include: {
        orderRooms: {
          include: {
            room: {
              include: {
                property: {
                  include: {
                    propertyCategory: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error('Order does not exist.');

    const property = order.orderRooms[0].room.property;
    const id = order.id;

    if (!property) throw new ResponseError(404, 'Property does not exist.');

    const updateorder = await prisma.order.update({
      where: {
        id,
        userId,
        invoiceId,
      },
      data: {
        status: 'finished',
      },
      include: {
        orderRooms: {
          include: { room: true },
        },
      },
    });

    templateRuleNodemailer(user.email);

    return toCancelOrderRes({
      orderId: updateorder.id,
      name: property.name,
      propertyCategory: property.propertyCategory.name,
      checkIn: updateorder.checkIn,
      checkOut: updateorder.checkOut,
      expDateTime: updateorder.expDateTime,
      invoiceId: updateorder.invoiceId,
      totalPayment: updateorder.totalPayment,
      rooms: updateorder.orderRooms.map(
        ({ orderId, price, quantity, room }) => {
          return {
            orderId,
            quantity,
            price,
            type: room.type,
          };
        },
      ),
      status: updateorder.status,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerGender: user.gender,
    });
  }
}
