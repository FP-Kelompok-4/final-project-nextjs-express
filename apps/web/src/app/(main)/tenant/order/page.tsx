"use client"

import React, { useEffect } from 'react'
import OrderTable from "./_components/OrderTable"
import { useAppDispatch } from "@/redux/hook"
import { useSession } from "next-auth/react"
import { getOrderByUserId } from "@/redux/slices/orderTenant-thunk"

const OrderTenant = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        getOrderByUserId({
          token: session.user.accessToken!,
          userId: session.user.id,
        })
      )
    }
  }, [])
  return (
    <main className="min-h-svh px-6 pt-[78px] md:px-10 xl:px-20">
      <h1 className="my-6 text-lg font-bold text-slate-900 md:text-2xl">
        Orders
      </h1>
      <OrderTable />
    </main>
  )
}

export default OrderTenant