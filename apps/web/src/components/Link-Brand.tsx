import { Vegan } from "lucide-react";
import Link from 'next/link';
import React from 'react';

const LinkBrand = () => {
  return (
    <Link
      href={'/'}
      className="text-gossamer-500 inline-flex items-center gap-1"
    >
      <Vegan strokeWidth={4} />
      <span className="text-xl font-extrabold tracking-tighter">
        StayCation
      </span>
    </Link>
  );
};

export default LinkBrand;
