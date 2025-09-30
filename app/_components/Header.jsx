import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-1  shadow-sm'>
      <Link href={'/'}>
        <Image alt="Logo here"src={'/logo.png'} width={120} height={100}/>
        </Link>
        <Link href={'/dashboard'}>
          <Button className={'m-5 cursor-pointer'}>Get Started</Button>
        </Link>
    </div>
  )
}

export default Header