import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ContractAddresses() {
  return (
    <Card className="mb-4">
      <Card.Header>Contract Addresses</Card.Header>
      <Card.Body>
        <Card.Text>
          <ListGroup>
            <ListGroup.Item>
              Greeter: {process.env.REACT_APP_GREETER_ADDRESS}
            </ListGroup.Item>
            <ListGroup.Item>
              Token: {process.env.REACT_APP_TOKEN_ADDRESS}
            </ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ContractAddresses;
