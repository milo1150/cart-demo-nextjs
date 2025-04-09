import { Modal } from 'antd'

export type ConfirmPaymentModalAction = {
  open: boolean
  handleOk: () => void
  handleCancel: () => void
}

export type ConfirmPaymentModalProp = {
  title: string
  subtitle: string
}

const ConfirmModal: React.FC<ConfirmPaymentModalAction & ConfirmPaymentModalProp> = ({
  open,
  handleOk,
  handleCancel,
  subtitle,
  title,
}) => {
  return (
    <>
      <Modal
        open={open}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>{subtitle}</p>
      </Modal>
    </>
  )
}

export default ConfirmModal
