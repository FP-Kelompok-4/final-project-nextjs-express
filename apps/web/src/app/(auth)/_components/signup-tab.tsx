'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardWrapper from './card-wrapper'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '@/schemas/auth-schema'
import SignupForm from './signup-form'
import { singup } from '@/actions/auth'
import { useTransition } from 'react'
import { useToast } from '@/components/ui/use-toast'

const SignupTab = () => {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    startTransition(() => {
      singup(values)
        .then((data) => {
          toast({
            variant: data?.error ? "destructive" : "default",
            title: data?.error ? data?.error : data?.success
          })
        })
    })
  }

  return (
    <div className='min-h-svh flex justify-center items-center my-[61.46px] md:mx-12 mx-8'>
      <Tabs defaultValue="user" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user" onClick={() => form.setValue('role', 'user')}>User</TabsTrigger>
          <TabsTrigger value="admin" onClick={() => form.setValue('role', 'admin')}>Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <CardWrapper
           backButtonLabel='Login now!'
           backButtonLink='/signin'
           showSocial
          >
            <SignupForm
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
            />
          </CardWrapper>
        </TabsContent>
        <TabsContent value="admin">
          <CardWrapper
           backButtonLabel='Login now!'
           backButtonLink='/signin'
           showSocial
          >
            <SignupForm
              form={form}
              onSubmit={onSubmit}
              isPending={isPending}
            />
          </CardWrapper>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SignupTab
