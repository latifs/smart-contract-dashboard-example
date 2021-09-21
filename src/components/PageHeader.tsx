import Alert from 'react-bootstrap/Alert';

function PageHeader() {
  return (
    <Alert variant="success" className="mt-4">
      <Alert.Heading>HI, Nice to see you</Alert.Heading>
      <p>
        This is a simple dashboard to explore samrt contracts and the best way
        to connect them with the front-end.
      </p>
      <hr />
      <p className="mb-0">It's a simple use case with 2 contracts.</p>
    </Alert>
  );
}

export default PageHeader;
