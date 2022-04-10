# @kimanikelly/contracts

[![Node.js CI](https://github.com/kimanikelly/contracts/actions/workflows/node.js.yml/badge.svg)](https://github.com/kimanikelly/contracts/actions/workflows/node.js.yml) [![Node.js Package](https://github.com/kimanikelly/contracts/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kimanikelly/contracts/actions/workflows/npm-publish.yml)

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

A `.env` file has to be configured fro testnet deployment.

- Create a `.env` file by running the command

```
touch .env
```

- Use the `.env.example` file as a template to input the credentials needed for testnet deployment inside the `.env` file.

- Verify `RINKEBY_URL=https://rinkeby.infura.io/v3/<YOUR INFURA KEY>` has a valid key.

- Verify the `PRIVATE_KEY=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1` is a valid wallet private key.

### Token Localhost Deployment

- Open one terminal and run the command `npx hardhat node` to start the local node.

- Open another terminal and run the command `npm run local` to deploy Token.sol locally.

- The localhost address will print to the terminal.

### Token Rinkeby Deployment

- Open one terminal and run the command `npm run rinkeby`.

- The rinkeby address will print to the terminal.
