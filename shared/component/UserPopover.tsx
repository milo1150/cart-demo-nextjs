import { LogoutOutlined } from '@ant-design/icons'
import { logout } from '@shared/auth/AuthGuard'
import { Row } from 'antd'

const UserPopoverContent = () => {
  return (
    <div>
      <Row className="text-center cursor-pointer" onClick={logout}>
        <LogoutOutlined />
        <p className="pl-1 text-md">Logout</p>
      </Row>
    </div>
  )
}

export default UserPopoverContent
