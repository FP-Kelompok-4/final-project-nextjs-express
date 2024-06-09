'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecurityContent from './_components/Security-Content';
import AccountContent from './_components/Account-Content';

const page = () => {
  const tabValues = ['account', 'security'];

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
            {data === 'account' && <AccountContent />}
            {data === 'security' && <SecurityContent />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default page;
