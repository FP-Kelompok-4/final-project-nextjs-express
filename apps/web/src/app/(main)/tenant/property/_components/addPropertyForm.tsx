import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addTenantPropertyThunk,
  getTenantPropertyCategoryThunk,
} from '@/redux/slices/tenant-thunk';
import { useSession } from 'next-auth/react';
import * as z from 'zod';
import { PropertySchema } from '@/schemas/property-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';

const AddPropertyForm = () => {
  const { toast } = useToast();

  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { categories, isLoadingCategories } = useAppSelector(
    (state) => state.tenantReducer,
  );

  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const form = useForm<z.infer<typeof PropertySchema>>({
    resolver: zodResolver(PropertySchema),
  });

  const onSubmit = (data: z.infer<typeof PropertySchema>) => {

    dispatch(
      addTenantPropertyThunk({
        token: session?.user.accessToken!,
        email: session?.user.email!,
        body: data,
      }),
    ).then((data: any) => {
      toast({
        variant: data.payload.error ? 'destructive' : 'default',
        title: data.payload.error ? data.payload.error : data.payload.success,
      });

      if (!data.payload.error) {
        form.reset();

        onSheetOpenHandler(false);
      }
    });
  };

  const onSheetOpenHandler = (value: boolean) => setIsOpenSheet(value);

  useEffect(() => {
    if (isLoadingCategories === true)
      dispatch(
        getTenantPropertyCategoryThunk({ token: session?.user.accessToken! }),
      );
  }, [isLoadingCategories]);

  return (
    <Sheet open={isOpenSheet} onOpenChange={onSheetOpenHandler}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} /> <span>Add Property</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-[95%] flex-col gap-10 overflow-y-auto"
        side={'bottom'}
      >
        <SheetHeader>
          <SheetTitle>Add Property</SheetTitle>
          <SheetDescription>
            This action will add your property to list
          </SheetDescription>
        </SheetHeader>
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
                      field.onChange(
                        event
                          ? categories.findLast((ele) => ele.name === event)!.id
                          : undefined,
                      );
                    }}
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
                          {categories.map((data, index) => (
                            <SelectItem
                              key={`${data.id}-${index}`}
                              value={data.name}
                            >
                              {data.name}
                            </SelectItem>
                          ))}
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
      </SheetContent>
    </Sheet>
  );
};

export default AddPropertyForm;
