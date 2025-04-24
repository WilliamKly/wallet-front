import { api } from './api'

export interface ITransaction {
  id: string
  receiver: {
    id: string
    name: string
    email: string
  },
  receiverUser: boolean,
  amount: number
  createdAt: string
  reversed: boolean
}

export interface ITransferPayload {
    receiverId?: string
    amount: number
}

export interface IDepositPayload {
    amount: number
}

export interface IDeposit {
    message: string,
    newBalance: number
}

export interface IReversalResponse {
  reversalId: string
  message: string
}

class TransactionService {
  async getMyTransactions(): Promise<ITransaction[]> {
    return await api.get('/transactions')
  }
  
  async transfer(payload: ITransferPayload): Promise<ITransaction> {
    return await api.post('/transactions/transfer', payload)
  }

  async deposit(payload: IDepositPayload): Promise<IDeposit> {
    return await api.post('/transactions/deposit', payload)
  }

  async requestReversal(transactionId: string): Promise<IReversalResponse> {
    return await api.post(`/reversals/${transactionId}`)
  }
}

export const transactionService = new TransactionService()
