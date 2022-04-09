## Token

Token.sol is an upgradeable Smart Contract that provides an `x` amount ERC-20 tokens to a recipient's wallet set by the owner when the `fundAccount` function is invoked.

## Events

### FundAmountSet

Emitted when the owner invokes `setFundAmount` to change the `fundAmount` value.

| **Name**       | **Type** | **Description**                                            |
| -------------- | -------- | ---------------------------------------------------------- |
| previousAmount | uint256  | The old `fundAmount` to be replaced.                       |
| newAmount      | uint256  | TThe new `fundAmount` set to replace the `previousAmount`. |

## Read Variables

### fundAmount

The amount of ERC-20 tokens transferred to the msg.sender on `fundAccount`.

| **Visibility** | **Type** |
| -------------- | -------- |
| public         | uint256  |

## Write Functions

### intialize

Deploys Token.sol as an upgradeable ERC-20 smart contract by refactoring the
`constructor` with the `initialize` function.

| **Name** | **Type** | **Description**                 |
| -------- | -------- | ------------------------------- |
| name     | string   | The name of the ERC-20 token.   |
| symbol   | string   | The symbol of the ERC-20 token. |

### mint

Creates and allocates ERC-20 tokens to Token.sol. This function can only be invoked by the owner.

| **Name** | **Type** | **Description**                                    |
| -------- | -------- | -------------------------------------------------- |
| amount   | uint256  | The amount of ERC-20 tokens allocated to Token.sol |

### setFundAmount

Sets the amount of ERC-20 tokens that can be transferred to the msg.sender.This function can only be invoked by the owner.

| **Name** | **Type** | **Description**                                                                  |
| -------- | -------- | -------------------------------------------------------------------------------- |
| amount   | uint256  | Sets the total amount ERC-20 tokens `fundAccount` can transfer to the msg.sender |

### fundAccount

Funds the msg.sender the `fundAmount`.

This function does not take in any arguments.
