import { ILogin } from '../interfaces/ILogin'
import cookies from 'js-cookie'

import { api as apiService, ApiService } from './api'
import { ISignUp } from '../pages/SignUp'

export interface IAuthentication {
  token: string,
  access_token: string
}

class AuthenticationService {
  constructor(private readonly api: ApiService) {}

  public postLogin = async (login: ILogin): Promise<IAuthentication> => {
    const loginData = this.api.post('/auth/login', login)
    .then(data => {
      cookies.set("authToken", data.access_token)
      return data
    })

    return loginData
  }

  public postSignup = async (login: ISignUp): Promise<IAuthentication> => {
    const loginData = this.api.post('/users', login)
    .then(data => {
      cookies.set("authToken", data.token)
      return data
    })

    return loginData
  }
}

export const authenticationService = new AuthenticationService(apiService)
