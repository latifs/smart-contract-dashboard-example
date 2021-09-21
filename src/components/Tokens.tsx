import { useState } from 'react';
import { ethers } from 'ethers';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import TokenArtifacts from '../artifacts/contracts/Token.sol/Token.json';

const tokenAddress = `${process.env.REACT_APP_TOKEN_ADDRESS}`;

function Tokens() {
  // store greeting in local state
  const [userAccount, setUserAccount] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalanceAmount] = useState<number>(0);

  getBalance();

  async function requestAccount() {
    if (window.ethereum?.request)
      return window.ethereum.request({ method: 'eth_requestAccounts' });

    throw new Error(
      'Missing install Metamask. Please access https://metamask.io/ to install extension on your browser'
    );
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        TokenArtifacts.abi,
        provider
      );

      const [account] = await requestAccount();

      const balance = await contract.balanceOf(account);
      setBalanceAmount(Number(balance));
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        tokenAddress,
        TokenArtifacts.abi,
        signer
      );
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
      getBalance();
    }
  }

  return (
    <Row className="mb-4">
      <Col>
        <Card className="text-center">
          <Card.Header>Balance</Card.Header>
          <Card.Body>
            <Card.Text>
              <h2>{balance || '0000'}</h2>
            </Card.Text>
            {/* <Button variant="primary" onClick={getBalance}>
              Get Balance
            </Button> */}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Header>Send Money</Card.Header>
          <Card.Body>
            <InputGroup className="mb-2">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Account ID
              </InputGroup.Text>
              <FormControl
                onChange={(e) => setUserAccount(e.target.value)}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Amount
              </InputGroup.Text>
              <FormControl
                onChange={(e) => setAmount(Number(e.target.value))}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>

            <Button variant="primary" onClick={sendCoins}>
              Send Coins
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Tokens;
