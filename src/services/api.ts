import axios, { AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import cookies from 'js-cookie'

export const baseURL = 'http://localhost:3001'

interface IApi {
  addPopup: (value: any) => void
  signOut: () => void
}

export class ApiService {
  private addPopup: any = null
  private signOut: any = null
  private isAuthError = false

  public setFuncions({ addPopup, signOut }: IApi) {
    this.addPopup = addPopup
    this.signOut = signOut
  }

  public instance = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${cookies.get('token')}`,
    },
  })

  interceptor = this.instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      const data: any = error.response?.data
      if (
        error.response?.status === 401 &&
        data.detail !==
          'No active account found with the given credentials'
      ) {
        if (!this.isAuthError) {
          this.isAuthError = true
          this.signOut()
          this.addPopup({
            type: 'info',
            title: 'Token expirado ou inválido.',
          })
        }
      }
      return Promise.reject(error)
    },
  )

  public get = async (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    return this.instance
      .get(url, config)
      .then(x => {return x.data})
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error')
        if (axios.isAxiosError(err)) throw err.response?.data

        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized')

        throw err
      })
  }

  public post = async (
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    return this.instance
      .post(url, params, config)
      .then(x => x.data)
      .catch(err => {
        if (err?.message === 'Network Error') throw new Error('Network Error')
        if (axios.isAxiosError(err)) throw err.response?.data
        if (err?.messages?.message === "Token is invalid or expired") throw new Error('Unauthorized')
        throw err
      })
  }
  
}

export const api = new ApiService()