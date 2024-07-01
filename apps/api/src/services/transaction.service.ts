import { DokuVariablesData } from './../utils/doku-utils/doku-config';
import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import { timeStampString } from '@/utils/doku-utils/doku-config';
import {
  AddBokingProperty,
  AddDOKUPayment,
  DOKUPaymentType,
  LineItem,
  toAddBokingProperty,
} from 'models/transaction.model';
import axios from 'axios';
import { generateSignature } from '@/utils/doku-utils/doku-utils';
import {
  AddDOKUPaymentRes,
  DOKURes,
  LineItemAddDOKUPaymentRes,
} from '@/utils/doku-utils/doku-model';
import { countDaysInRange } from '@/utils/date-utils';

export class TransactionService {
  static async addDOKUPayment(req: AddDOKUPayment) {
    const { userId, rooms: roomsOrd, checkIn, checkOut, pId } = req;
    const dateMargin = countDaysInRange(checkIn, checkOut);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new Error('User does not exist.');

    const rooms = await prisma.room.findMany({
      where: {
        id: { in: roomsOrd.map((data) => data.roomId) },
      },
      include: { roomPrices: true },
    });

    if (!rooms) throw new Error('Room does not exist.');

    const order = await prisma.order.findFirst({
      where: {
        userId,
        status: "pending"
      },
    });

    if (order) throw new Error('Finish the previious Order');

    let amount = 0;
    const line_items: LineItemAddDOKUPaymentRes[] = [];

    rooms.forEach(({ id, type, roomPrices }) => {
      const quantity =
        roomsOrd.find((data) => data.roomId === id)?.quantity ?? 1;

      const roomPrice = roomPrices ? roomPrices.price * dateMargin : 0;

      amount += roomPrice * quantity;

      line_items.push({
        id: id,
        name: type,
        price: roomPrice,
        quantity: quantity,
      });
    });

    const raw = JSON.stringify({
      order: {
        amount,
        invoice_number: `INV-${timeStampString}`,
        currency: 'IDR',
        session_id: 'SU5WFDferd561dfasfasdfae123c',
        callback_url: `http://localhost:3000/property/${pId}`,
        line_items: line_items.map(({ name, price, quantity }) => {
          return {
            name,
            price,
            quantity,
          };
        }),
      },
      payment: {
        payment_due_date: 60,
      },
      customer: {
        name: user.name,
        email: user.email,
        phone: '+6285694566147',
        address: 'Plaza Asia Office Park Unit 3',
        country: 'ID',
      },
    });

    const myHeaders = {
      'Client-Id': DokuVariablesData.Client_Id,
      'Request-Id': DokuVariablesData.Request_Id,
      'Request-Timestamp': DokuVariablesData.Request_Timestamp,
      Signature: generateSignature(raw),
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      'https://api-sandbox.doku.com/checkout/v1/payment',
      raw,
      { headers: myHeaders },
    );

    const res: DOKURes = response.data;
    return {
      ...res,
      response: {
        ...res.response,
        order: {
          ...res.response.order,
          line_items,
        },
      },
    } as AddDOKUPaymentRes;
  }

  static async addBookingProperty(
    req: AddBokingProperty & {
      expDateTime: Date;
      urlPayment: string;
      totalPayment: number;
    },
  ) {
    const {
      userId,
      pId,
      rooms,
      checkIn,
      checkOut,
      urlPayment,
      totalPayment,
      expDateTime,
    } = req;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const property = await prisma.property.findUnique({
      where: { id: pId },
      include: { propertyCategory: true },
    });

    if (!property) throw new ResponseError(404, 'Property does not exist.');

    const order = await prisma.order.create({
      data: {
        userId,
        checkIn,
        checkOut,
        urlPayment,
        totalPayment,
        expDateTime,
        orderRooms: {
          createMany: {
            data: [
              ...rooms.map(({ roomId, quantity, price }) => ({
                roomId,
                quantity,
                price,
              })),
            ],
          },
        },
      },
      include: {
        orderRooms: {
          include: { room: true },
        },
      },
    });

    return toAddBokingProperty({
      ...order,
      orderProperty: {
        ...property,
        category: property.propertyCategory.name,
      },
      orderRooms: order.orderRooms.map(
        ({ id, room: { image, description, type }, quantity, price }) => ({
          id,
          image,
          description,
          type,
          quantity,
          price,
        }),
      ),
    });
  }
}
