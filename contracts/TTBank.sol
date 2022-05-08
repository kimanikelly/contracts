//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {Token} from "./Token.sol";
import "hardhat/console.sol";

contract TTBank is Initializable, OwnableUpgradeable {
    using SafeERC20Upgradeable for Token;

    event AccountOpened(
        uint256 accountNumber,
        address accountName,
        uint256 balance
    );

    // event Deposit(
    //     uint256 _accountNumber
    // )

    struct BankDetails {
        uint256 accountNumber;
        address accountName;
        uint256 balance;
    }

    modifier verifyDepositAmount(uint256 amount) {
        // Requires the deposit amount to be greater than 0
        require(amount > 0, "TTBank: Deposit amount is 0");

        _;
    }

    // Token.sol instance
    Token public token;

    BankDetails private bankDetails;

    // Maps the msg.senders's to their bank account details
    mapping(address => BankDetails) private accounts;

    function initialize(address tokenAddress) public initializer {
        // Instantiates the Token.sol instance
        token = Token(tokenAddress);

        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function openAccount(uint256 balance) public verifyDepositAmount(balance) {
        // Sets the accountNumber and increments it by 1 per account
        bankDetails.accountNumber++;

        // Sets the accountName to the msg.sender
        bankDetails.accountName = msg.sender;

        // Sets the initial balance to the balance value passed in by the msg.sender
        bankDetails.balance = balance;

        // Adds the msg.sender's bank account details to the accounts mapping
        accounts[msg.sender] = bankDetails;

        // Transfers the TT _balance to the TTBank contract
        token.safeTransferFrom(msg.sender, address(this), balance);

        emit AccountOpened(
            bankDetails.accountNumber,
            msg.sender,
            bankDetails.balance
        );
    }

    function deposit(uint256 amount) public verifyDepositAmount(amount) {
        // Increments the msg.sender's account balance by their deposit
        accounts[msg.sender].balance += amount;

        // Transfers the deposit from the msg.sender to the bank contract
        token.safeTransferFrom(msg.sender, address(this), amount);
    }

    function viewAccount() public view returns (BankDetails memory) {
        return accounts[msg.sender];
    }

    function bankBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
