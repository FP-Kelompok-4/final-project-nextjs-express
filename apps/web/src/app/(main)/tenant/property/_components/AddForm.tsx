import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PropertySchema } from '@/schemas/property-schema';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getTenantPropertyCategoryThunk } from '@/redux/slices/tenant-thunk';
import * as z from 'zod';
import { useSession } from 'next-auth/react';

const AddForm = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof PropertySchema>>;
  onSubmit: (values: z.infer<typeof PropertySchema>) => void;
}) => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { categories, isLoadingCategories } = useAppSelector(
    (state) => state.tenantReducer,
  );

  useEffect(() => {
    if (isLoadingCategories === true)
      dispatch(
        getTenantPropertyCategoryThunk({ token: session?.user.accessToken! }),
      );
  }, [isLoadingCategories]);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Properti</FormLabel>
              <FormControl>
                <Input placeholder="Nama" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Properti</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(event) => {
                  field.onChange(event ? Number(event) : undefined);
                }}
                // onValueChange={field.onChange}
                value={JSON.stringify(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCategories ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      {/* {JSON.stringify(categories)} */}
                      {categories
                        ? categories.map((data, index) => (
                            <SelectItem
                              key={`${data.id}-${index}`}
                              value={JSON.stringify(data.id)}
                            >
                              {data.name}
                            </SelectItem>
                          ))
                        : 'kosong'}
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lokasi</FormLabel>
              <FormControl>
                <Input placeholder="Lokasi" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Input
                  placeholder="gambar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                  ref={field.ref}
                  // {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Tambah Property</Button>
      </form>
    </Form>
  );
};

export default AddForm;
