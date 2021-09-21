import './App.css';
import { ethers } from 'ethers';

import Container from 'react-bootstrap/Container';
import NavbarCMP from './components/NavbarCMP';
import TransactionsTable from './components/TransactionsTable';
import ContractAddresses from './components/ContractAddresses';
import Greetings from './components/Greetings';
import Tokens from './components/Tokens';
import PageHeader from './components/PageHeader';

// fixes ethereum not found on global
declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

function App() {
  return (
    <div className="App">
      <NavbarCMP />
      <Container>
        <PageHeader />
        <ContractAddresses />
        <Greetings />
        <Tokens />
        <TransactionsTable />
      </Container>
    </div>
  );
}

export default App;
