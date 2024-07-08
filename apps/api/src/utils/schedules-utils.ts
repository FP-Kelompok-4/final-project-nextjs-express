import prisma from '@/prisma';
import { addDays } from 'date-fns';
import { templateRuleNodemailer } from "lib/nodeMailer";

export const reminderRuleUtil = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: 'finished',
    },
    include: {
      user: true,
    },
  });

  for (const {
    checkIn,
    user: { email },
  } of orders) {
    if (
      new Date().toDateString() ===
      addDays(new Date(checkIn), -1).toDateString()
    ) {
      templateRuleNodemailer(email)
    }
  }
};

export const updateExpiredBookingPayment = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: 'pending',
      expDateTime: {
        lt: new Date(),
      },
    },
  });

  if (orders.length > 0) {
    await prisma.order.updateMany({
      where: {
        status: 'pending',
        expDateTime: {
          lt: new Date(),
        },
      },
      data: {
        status: 'expired',
      },
    });
  }
};

export const updateConfirmingBookingPayment = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: 'pending',
      expDateTime: {
        gt: new Date(),
      },
    },
  });

  if (orders.length > 0) {
    // await prisma.order.updateMany({
    //   where: {
    //     status: 'pending',
    //     expDateTime: {
    //       lt: new Date(),
    //     },
    //   },
    //   data: {
    //     status: 'expired',
    //   },
    // });
  }
};
