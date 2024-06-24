'use client';

import React from 'react';
import AddPropertyForm from './_components/addPropertyForm';

const Property = () => {
  return (
    <main className="min-h-svh pt-[78px]">
      <div className="mt-5 flex w-full flex-row justify-between px-6 md:px-10 xl:px-20">
        <p className="text-xl font-semibold">Property</p>

        <AddPropertyForm />
      </div>
    </main>
  );
};

export default Property;
