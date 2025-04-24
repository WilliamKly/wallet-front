import { api as apiService, ApiService } from './api'

export interface IUser {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface IUserBalance {
    balance: string
  }
  

class UserService {
  constructor(private readonly api: ApiService) {}

  public getAllUsers = async (): Promise<IUser[]> => {
    const users = await this.api.get('/users')
    return users
  }

  public getMyBalance = async (): Promise<IUserBalance[]> => {
    const users = await this.api.get('/users/balance')
    return users
  }
}

export const userService = new UserService(apiService)
