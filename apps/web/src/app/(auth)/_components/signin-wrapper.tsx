import CardWrapper from './card-wrapper'

const SigninWrapper = () => {
  return (
    <div className='min-h-svh flex justify-center items-center py-[65px] md:mx-12 mx-8'>
      <CardWrapper
        backButtonLabel='Create your account now!'
        backButtonLink='/signup'
        showSocial
      >
        Form sign in
      </CardWrapper>
    </div>
  )
}

export default SigninWrapper