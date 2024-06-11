import React from 'react';
import SettingsWrapper from './_components/Settings-Wrapper';

import { auth } from '@/auth';

const page = async () => {
  const session = await auth();

  return <SettingsWrapper session={session} />;
};

export default page;
