import { useEffect, useState } from 'react'
import { IUser, userService } from '../../services/userService'
import { Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export function Users() {
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [transferAmount, setTransferAmount] = useState<number>(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers()
        setUsers(response)
      } catch (err: any) {
        console.error('Erro ao buscar usuários')
      }
    }

    fetchUsers()
  }, [])

  const openModal = (user: IUser) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleTransfer = () => {
    console.log(`Transferindo R$${transferAmount} para ${selectedUser?.name}`)
    // Aqui você chama o service de transferência passando:
    // - senderId (vem do token ou do contexto)
    // - receiverId (selectedUser.id)
    // - amount (transferAmount)

    setShowModal(false)
    setTransferAmount(0)
    setSelectedUser(null)
  }

  return (
    <div className="container mt-5">
      <h2>Usuários Cadastrados</h2>
      <table className="table table-bordered table-hover mt-4">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
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
    </div>
  )
}
