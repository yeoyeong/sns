'use client'
import { useGoogleLogin } from "../../model/hooks/useGoogleLogin"

const Loginform = () => {
  const { signInWithGoogle } = useGoogleLogin()

  
  return <div>
  
    <button onClick={signInWithGoogle}>Sign In with Google</button>
</div>
}

export default Loginform
