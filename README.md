# @kimanikelly/contracts

[![Node.js CI](https://github.com/kimanikelly/contracts/actions/workflows/node.js.yml/badge.svg)](https://github.com/kimanikelly/contracts/actions/workflows/node.js.yml) [![Node.js Package](https://github.com/kimanikelly/contracts/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/kimanikelly/contracts/actions/workflows/npm-publish.yml)

## Contract Documentation

- [Token](https://github.com/kimanikelly/contracts/blob/main/docs/token.md)
- [TTBank](https://github.com/kimanikelly/contracts/blob/main/docs/ttBank.md)

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

## NPM Package

### Installation

```
npm i @kimanikelly/core-contracts
```

### Example

- [Token.sol Instance With @kimanikelly/core-contracts](https://github.com/kimanikelly/contracts/blob/main/docs/tokenInstance.md)

- [TTBank.sol Instance With @kimanikelly/core-contracts](https://github.com/kimanikelly/contracts/blob/main/docs/ttBankInstance.md)

## Deployment

A `.env` file has to be configured fro testnet deployment.

- Create a `.env` file by running the command

```
touch .env
```

- Use the `.env.example` file as a template to input the credentials needed for testnet deployment inside the `.env` file.

- Verify `GOERLI_URL=https://goerli.infura.io/v3/<YOUR INFURA KEY>` has a valid key.

- Verify the `PRIVATE_KEY=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1` is a valid wallet private key.

### Token Localhost Deployment

- Open one terminal and run the command `npx hardhat node` to start the local node.

- Open another terminal and run the command `npm run token-local` to deploy Token.sol locally.

- The localhost address will print to the terminal.

### Token Goerli Deployment

- Open one terminal and run the command `npm run token-goerli` to deploy Token.sol to Goerli.

- The Goerli address will print to the terminal.

### TTBank Localhost Deployment

- Open one terminal and run the command `npx hardhat node` to start the local node.

- Open another terminal and run the command `npm run ttBank-local` to deploy TTBank.sol locally.

- The localhost address will print to the terminal.

### TTBank Goerli Deployment

- Open one terminal and run the command `npm run ttBank-goerli` to deploy TTBank.sol to Goerli.

- The Goerli address will print to the terminal.
