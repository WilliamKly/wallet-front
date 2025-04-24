import { Modal, Button } from 'react-bootstrap'

interface RevertTransactionModalProps {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  transactionId?: string
}

export function RevertTransactionModal({
  show,
  onClose,
  onConfirm,
  transactionId,
}: RevertTransactionModalProps) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reverter Transação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja reverter esta transação?</p>
        {transactionId && <small>ID da transação: {transactionId}</small>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmar Reversão
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
