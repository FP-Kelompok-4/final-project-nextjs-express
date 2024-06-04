import Image from 'next/image'

const AuthHero = () => {
  return (
    <div className='h-full w-[120%] relative'>
      <Image
        className="object-cover object-[60.5%] brightness-75 rounded-r-3xl"
        src={'/hero.jpg'}
        fill
        priority
        sizes='(min-width: 768px) 80vw, 0vw'
        alt="hero"
      />
    </div>
  )
}

export default AuthHero
