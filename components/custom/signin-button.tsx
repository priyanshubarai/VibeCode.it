
import { signIn } from "@/lib/auth"
import { Button } from "../ui/button"
 
export default function SignIn(prop : {provider : string}) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(prop.provider.toLowerCase())
      }}
    >
      <Button type="submit">Signin with {prop.provider}</Button>
    </form>
  )
} 