import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

interface DepositModalProps {
  show: boolean
  onClose: () => void
  onConfirm: (amount: number) => void
}

export function DepositModal({ show, onClose, onConfirm }: DepositModalProps) {
  const [amount, setAmount] = useState<string>('')

  const handleConfirm = () => {
    const numericAmount = parseFloat(amount)
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onConfirm(numericAmount)
      setAmount('')
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
            onChange={(e) => setAmount(e.target.value)}
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
          disabled={Number(amount) <= 0}
        >
          Confirmar Depósito
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
