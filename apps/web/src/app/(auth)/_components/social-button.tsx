'use client'

import { Button } from '@/components/ui/button'
import { Chrome } from 'lucide-react'

const SocialButton = () => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <Button
        size='lg'
        className='w-full rounded-full font-semibold'
        variant='outline'
        onClick={() => {}}
      >
        <Chrome />
        <p className='flex-1'>
          Continue with Google
        </p>
      </Button>
    </div>
  )
}

export default SocialButton
