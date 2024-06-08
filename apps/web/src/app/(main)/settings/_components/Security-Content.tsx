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

const SecurityContent = () => {

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      password_confirm: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return  <Form {...form}>
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
</Form>;
};

export default SecurityContent;
