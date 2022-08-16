import Head from 'next/head'
import SignupForm from '../components/authForms/SignupForm'
// import LoginForm from '../components/authForms/LoginForm'

export default function Home() {
  return (
    <>
    <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div >
      
      <SignupForm></SignupForm>
      {/* <LoginForm></LoginForm> */}
    </div>
    </>
  )
}
