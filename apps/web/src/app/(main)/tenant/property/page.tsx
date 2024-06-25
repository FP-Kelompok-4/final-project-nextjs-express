'use client';

import React from 'react';
import AddPropertyForm from './_components/AddPropertyForm';
import PropertyTable from './_components/PropertyTable';

const Property = () => {
  return (
    <main className="flex min-h-svh flex-col gap-6 pt-[78px]">
      <div className="mt-5 flex w-full flex-row justify-between px-6 md:px-10 xl:px-20">
        <p className="text-xl font-semibold">Property</p>

        <AddPropertyForm />
      </div>
      <div className="w-full px-6 md:px-10 xl:px-20">
        <PropertyTable />
      </div>
    </main>
  );
};

export default Property;
