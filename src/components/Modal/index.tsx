import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

interface DepositModalProps {
  show: boolean
  onClose: () => void
  onConfirm: (amount: number) => void
}

export function DepositModal({ show, onClose, onConfirm }: DepositModalProps) {
  const [amount, setAmount] = useState<number>(0)

  const handleConfirm = () => {
    if (amount > 0) {
      onConfirm(amount)
      setAmount(0)
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Depositar Dinheiro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Valor do depósito (R$)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o valor"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={0.01}
            step={0.01}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleConfirm}
          disabled={amount <= 0}
        >
          Confirmar Depósito
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
