'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChangePasswordSchema } from '@/schemas/change-password-schema';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const page = () => {
  const tabValues = ['account', 'security'];

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      password_confirm: ''
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="mt-5 flex flex-col gap-10 px-6 md:px-10 xl:px-20">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full flex-row justify-start border-b-[1px]">
          {tabValues.map((data, index) => (
            <TabsTrigger
              key={`${data}-${index}`}
              value={data}
              className="text-athens-gray-400 data-[state=active]:text-gossamer-700 relative capitalize after:absolute after:-bottom-1 after:h-1 after:w-full after:rounded-full after:bg-emerald-500 after:content-[''] data-[state=active]:bg-transparent data-[state=active]:shadow-none after:data-[state=inactive]:hidden"
            >
              {data}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabValues.map((data, index) => (
          <TabsContent
            key={`${data}-${index}`}
            value={data}
            className="py-5 md:px-5"
          >
            {data === 'security' && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-[400px] space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Password Baru"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Konfirmasi Password Baru"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-gossamer-500 hover:bg-gossamer-500/90 w-fit rounded-full"
                  >
                    Ubah Password
                  </Button>
                </form>
              </Form>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default page;
