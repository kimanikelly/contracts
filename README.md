# @kimanikelly/contracts

[![Node.js CI](https://github.com/kimanikelly/contracts/actions/workflows/node.js.yml/badge.svg)](https://github.com/kimanikelly/contracts/actions/workflows/node.js.yml)

## Contract Documentation

- [Token](docs/token.md)

## Installation

```
git clone https://github.com/kimanikelly/contracts.git
```

## Install Dependencies

```
npm i
```

## Testing

```
npx hardhat test
```

or

```
npm test
```

## Deployment

### Token Localhost Deployment

- Open one terminal and run the command `npx hardhat node` to start the local node.

- Open another terminal and run the command `npm run local` to deploy Token.sol locally.

- The localhost address will print to the terminal.

## Rinkeby Deployment

### Token Rinkeby Deployment

- Create a `.env` file `touch .env`
- Open one terminal and run the command `npm run rinkeby`.
