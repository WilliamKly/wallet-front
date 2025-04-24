import { ILogin } from "../interfaces/ILogin";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { authenticationService } from "../services/authenticationService";
import { ISignUp } from "../pages/SignUp";

interface IAuthContext {
  handleSignIn: (x: ILogin) => Promise<void>,
  handleSignUp: (x: ISignUp) => Promise<void>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthProvider({ children }: any) {
  const navigate = useNavigate()
  const handleSignIn = async (data: ILogin) => {
    try {
      const { access_token } = await authenticationService.postLogin(data)
      localStorage.setItem("bearerToken", access_token)
      api.instance.defaults.headers["Authorization"] = `Bearer ${access_token}`
      navigate('/home')
    } catch (e: any) {
      toast.error("Este usuário não existe no sistema")
    }
  }

  const handleSignUp = async (data: ISignUp) => {
    try {
      const { token } = await authenticationService.postSignup(data)
      localStorage.setItem("bearerToken", token)
      api.instance.defaults.headers["Authorization"] = `Bearer ${token}`
      window.location.href = '/home'
    } catch (e: any) {
      toast.error("Este usuário não existe no sistema")
    }
  }

  return (
    <AuthContext.Provider value={{ handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)