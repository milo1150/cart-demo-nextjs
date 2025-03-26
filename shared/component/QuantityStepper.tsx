import { Button, Input, Row } from 'antd'

type QuantityStepperProps = {
  count: number
  decreaseCallback: () => unknown
  increaseCallback: () => unknown
  limit?: number
  displayLimit?: boolean
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  count,
  decreaseCallback,
  increaseCallback,
  limit,
  displayLimit,
}) => {
  return (
    <div>
      <Row className="justify-center">
        <Button className="w-1!" onClick={() => decreaseCallback()}>
          -
        </Button>
        <Input className="w-10! pointer-events-none justify-items-center mx-1!" value={count} />
        <Button className="w-1!" onClick={() => increaseCallback()}>
          +
        </Button>
        {displayLimit && <span className="mt-1 text-gray-400">Stock: {limit}</span>}
      </Row>
    </div>
  )
}

export default QuantityStepper
