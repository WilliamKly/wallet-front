import { useEffect, useState } from 'react'
import { IUser, IUserBalance, userService } from '../../services/userService'
import { Modal, Button, Form, Table, ButtonGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ITransaction, transactionService } from '../../services/transasctionService'
import { DepositModal } from '../../components/Modal'
import { RevertTransactionModal } from '../../components/ModalReversal'

export function Home() {
  const [view, setView] = useState<'users' | 'transactions'>('users')
  const [showDepositModal, setShowDepositModal] = useState(false)

  const [users, setUsers] = useState<IUser[]>([])
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [balance, setBalance] = useState<IUserBalance[]>([])

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [transferAmount, setTransferAmount] = useState<number>(0)
  const [showModal, setShowModal] = useState(false)
  const [showRevertModal, setShowRevertModal] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)

  const getMyBalance = () => {
    userService.getMyBalance().then(setBalance).catch(() => {
      console.log("erro ao buscar saldo")
    })
  }

  const openRevertModal = (transactionId: string) => {
    setSelectedTransactionId(transactionId)
    setShowRevertModal(true)
  }

  useEffect(() => {
    if (view === 'users') {
      userService.getAllUsers().then(setUsers).catch(() => {
        console.error('Erro ao buscar usuários')
      })
      getMyBalance()
    } else {
      transactionService.getMyTransactions().then(setTransactions).catch(() => {
        console.error('Erro ao buscar transações')
      })
    }
  }, [view])

  const handleRevertConfirm = async () => {
    if (selectedTransactionId) {
      await transactionService.requestReversal(selectedTransactionId)
      setShowRevertModal(false)
    }
  }

  const openModal = (user: IUser) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleTransfer = async () => {
    await transactionService.transfer({
      receiverId: selectedUser?.id,
      amount: transferAmount
    })

    getMyBalance()
    setShowModal(false)
    setTransferAmount(0)
    setSelectedUser(null)
  }

  const handleDeposit = async (amount: number) => {
    await transactionService.deposit({
      amount: amount
    })
    getMyBalance()
    setShowDepositModal(false)
  }
  
  return (
    <div className="container mt-5">
      <ButtonGroup className="mb-4">
        <Button variant={view === 'users' ? 'primary' : 'outline-primary'} onClick={() => setView('users')}>
          Usuários
        </Button>
        <Button variant={view === 'transactions' ? 'primary' : 'outline-primary'} onClick={() => setView('transactions')}>
          Transferências
        </Button>
      </ButtonGroup>

      {view === 'users' && (
        <>
          <div className='d-flex' style={{ justifyContent: 'space-between' }}>
            <div className='d-flex' style={{ alignItems: 'center', gap: '2rem' }}>
              <h2>Usuários Cadastrados</h2>
              |
              <h3>Meu saldo: {balance[0]?.balance}</h3>
            </div>

            <button className='btn btn-secondary' onClick={() => setShowDepositModal(true)}>
              Depositar dinheiro
            </button>
          </div>
          <table className="table table-bordered table-hover mt-4">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(user)}>
                      Transferir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {view === 'transactions' && (
        <>
          <h2>Minhas Transferências</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Destinatário</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.receiver.name}</td>
                  <td>R$ {Number(tx.amount).toFixed(2)}</td>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td>{tx.reversed ? 'Revertida' : 'Concluída'}</td>
                  <td>{tx.receiverUser ? 'Recebido' : 'Enviado'}</td>
                  {!tx.reversed && tx.receiverUser ? (
                    <td>
                      <Button variant="primary" onClick={() => openRevertModal(tx.id)}>
                        Reverter
                      </Button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal de transferência */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transferir para {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Valor (R$)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite o valor"
              value={transferAmount}
              onChange={(e) => setTransferAmount(Number(e.target.value))}
              min={0.01}
              step={0.01}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handleTransfer}
            disabled={transferAmount <= 0}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <DepositModal
        show={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onConfirm={handleDeposit}
      />

    <RevertTransactionModal
      show={showRevertModal}
      onClose={() => setShowRevertModal(false)}
      onConfirm={handleRevertConfirm}
      transactionId={selectedTransactionId || undefined}
    />

    </div>
  )
}
