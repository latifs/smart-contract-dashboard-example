import { useState } from 'react';
import { ethers } from 'ethers';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

interface Transaction {
  hash: string;
  nonce: number;
  // blockHash: string | null;
  // blockNumber: number;
  // transactionIndex: number | null;
  from: string;
  // to: string;
  // gasPrice: number;
  // gas: number;
  // input: string;
}

function TransactionsTable() {
  const [allTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  async function getTransactions() {
    let etherscanProvider = new ethers.providers.EtherscanProvider();
    const [account] = await requestAccount();

    const transactions = await etherscanProvider.getHistory(account);

    async function requestAccount() {
      if (window.ethereum?.request)
        return window.ethereum.request({ method: 'eth_requestAccounts' });

      throw new Error(
        'Missing install Metamask. Please access https://metamask.io/ to install extension on your browser'
      );
    }

    //only display 20 transactions here
    setRecentTransactions(transactions.slice(0, 20));
  }

  function truncate(str: string) {
    return str.length > 20 ? str.substring(0, 15) + '...' : str;
  }

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              Recent Transactions{' '}
              <Button variant="primary" onClick={getTransactions}>
                get Recent Transactions
              </Button>
            </Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>hash</th>
                  <th>Nonce</th>
                  <th>From</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((tr, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{truncate(tr.hash)}</td>
                    <td>{tr.nonce}</td>
                    <td>{truncate(tr.from)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TransactionsTable;
