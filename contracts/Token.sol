//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract Token is Initializable, OwnableUpgradeable, ERC20Upgradeable {
    /**
     * @dev Emitted when the owner invokes `setFundAmount` to change the
     * `fundAmount` value.
     * @param previousAmount The old `fundAmount` to be replaced.
     * @param newAmount The new `fundAmount` set to replace the `previousAmount`.
     */
    event FundAmountSet(uint256 previousAmount, uint256 newAmount);

    /// The amount of ERC-20 tokens transferred to the msg.sender on `fundAccount`.
    uint256 public fundAmount;

    /// Used to check against the `amount` on `mint` and `setFundAmount`.
    uint256 internal amountCheck;

    /**
     * @dev Prevents the `mint` and `setFundAmount` functions from passing in 0
     * as an argument.
     * @param amount The amount ERC-20 tokens used to check against the `amountCheck` variable.
     */
    modifier preventZeroAmount(uint256 amount) {
        require(amount > amountCheck, "Token: Amount cannot be set to 0");
        _;
    }

    /**
     * @dev Deploys Token.sol as an upgradeable ERC-20 smart contract by refactoring the
     * `constructor` with the `initialize` function.
     * @param name The name of the ERC-20 token.
     * @param symbol The symbol of the ERC-20 token.
     */
    function initialize(string memory name, string memory symbol)
        public
        initializer
    {
        /// Initializes ERC20Upgradeable.sol with the name and symbol
        __ERC20_init(name, symbol);

        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();

        /// Sets the `amountCheck` value to 0 on deployment
        amountCheck = 0;
    }

    /**
     * @dev Creates and allocates ERC-20 tokens to Token.sol. This function
     * can only be invoked by the owner.
     * @param amount The amount of ERC-20 tokens allocated to Token.sol
     */
    function mint(uint256 amount) public onlyOwner preventZeroAmount(amount) {
        /// Invokes the ERC20Upgradeable.sol _mint function
        _mint(address(this), amount);
    }

    /**
     * @dev Creates and allocates ERC-20 tokens to Token.sol. This function
     * can only be invoked by the owner.
     * @param amount Sets the total amount ERC-20 tokens `fundAccount` can transfer to the msg.sender
     */
    function setFundAmount(uint256 amount)
        public
        onlyOwner
        preventZeroAmount(amount)
    {
        /// The value of the current fundAmount
        uint256 previousAmount = fundAmount;

        /// Sets the new fundAmount
        fundAmount = amount;

        /// Emits the SetFundAmount event with the previousAmount and amount arguments
        emit FundAmountSet(previousAmount, amount);
    }

    /**
     * @dev Funds the msg.sender the `fundAmount`.
     */
    function fundAccount() public {
        /// Creates an  ERC20Upgradeable.sol instance and invokes `transfer`
        ERC20Upgradeable(address(this)).transfer(msg.sender, fundAmount);
    }
}
