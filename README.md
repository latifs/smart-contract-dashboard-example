# Basic Sample smart contract Dashboard

This project (WIP) demonstrates a basic Dashboard example with a greeter contract and a token contract.

## ScreenShot

![dash](public/dashboard.png?raw=true 'dash')

## To run the project locally

### Step 1

```
npx hardhat node
```

### Step 2

```
npx hardhat run scripts/deploy.ts --network localhost
```

This will return 2 addresses to use in the next command

### Step 3

```
REACT_APP_GREETER_ADDRESS='address-1' REACT_APP_TOKEN_ADDRESS='address-2' yarn start
```

### notes

if you get a compile or deploy error make sure to modify in tsconfig.json:

```
...
"isolatedModules": true -> "isolatedModules": false
...
```
