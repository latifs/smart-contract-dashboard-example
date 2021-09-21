import { useState } from 'react';
import { ethers } from 'ethers';

import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import GreeterArtifacts from '../artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = `${process.env.REACT_APP_GREETER_ADDRESS}`;

function Greetings() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState<string>('');
  const [contractGreeting, setContractGreeting] = useState<string>('');

  fetchGreeting();

  async function requestAccount() {
    if (window.ethereum?.request)
      return window.ethereum.request({ method: 'eth_requestAccounts' });

    throw new Error(
      'Missing install Metamask. Please access https://metamask.io/ to install extension on your browser'
    );
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        greeterAddress,
        GreeterArtifacts.abi,
        provider
      );

      try {
        const data = await contract.greet();
        setContractGreeting(data);
      } catch (err) {
        console.log('err:', err);
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return;
    console.log('sending');
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        greeterAddress,
        GreeterArtifacts.abi,
        signer
      );

      const transaction = await contract.setGreeting(greeting);
      const response = await transaction.wait();

      fetchGreeting();
    }
  }

  return (
    <Row className="mb-4">
      <Col>
        <Card className="text-center">
          <Card.Header>Greeting</Card.Header>
          <Card.Body>
            <Card.Text>
              <h2>{contractGreeting || 'hello you'}</h2>
            </Card.Text>
            <Button variant="primary" onClick={fetchGreeting}>
              Fetch Greeting
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Header>Set Greeting</Card.Header>
          <Card.Body>
            <InputGroup>
              <FormControl
                onChange={(e) => setGreetingValue(e.target.value)}
                placeholder="Set Greeting"
                aria-label="Recipient's username with two button addons"
              />
              <Button variant="primary" onClick={setGreeting}>
                Go
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Greetings;
