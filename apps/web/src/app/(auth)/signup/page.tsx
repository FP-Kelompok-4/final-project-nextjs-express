import React from 'react'
import AuthLayout from '../layout'
import AuthHero from '../_components/auth-hero'
import SignupTab from '../_components/signup-tab'

const page = () => {
  return (
    <AuthLayout>
      <main className='min-h-svh relative flex md:flex-row flex-col bg-gossamer-950'>
        <div className='md:flex-1'>
          <AuthHero />
        </div>
        <div className='flex-1 xl:pl-[calc(100%-91%)] md:pl-24'>
          <SignupTab />
        </div>
      </main>
    </AuthLayout>
  )
}

export default page
