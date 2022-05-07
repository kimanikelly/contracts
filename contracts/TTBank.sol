//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Token} from "./Token.sol";
import "hardhat/console.sol";

contract TTBank is Initializable, OwnableUpgradeable {
    struct BankDetails {
        uint256 accountNumber;
        address accountName;
        bytes32 accountType;
        uint256 balance;
    }

    modifier verifyAccountType(bytes32 _accountType) {
        // Requires the _accountType to either be a Checking or Savings account
        require(
            _accountType == "Checking" || _accountType == "Savings",
            "TTBank: Invalid account type"
        );

        _;
    }

    Token public token;
    BankDetails private bankDetails;
    mapping(address => BankDetails[]) private checkingAccounts;
    mapping(address => BankDetails[]) private savingsAccounts;

    function initialize(address _tokenAddress) public initializer {
        token = Token(_tokenAddress);

        __Ownable_init();
    }

    function openAccount(bytes32 _accountType, uint256 _balance)
        public
        verifyAccountType(_accountType)
    {
        // Requires the deposit amount to be greater than 0
        require(_balance > 0, "TTBank: Deposit amount is 0");

        // Sets the accountNumber and increments it by 1 per account
        bankDetails.accountNumber++;

        // Sets the accountName to the callers public address
        bankDetails.accountName = msg.sender;

        // Sets the accountType to the _accountType value passed in by the msg.sender
        // Either "Checking" or "Savings" can be accepted
        bankDetails.accountType = _accountType;

        // Sets the inital balance to the _balance value passed in by the msg.sender
        bankDetails.balance = _balance;

        // Checks if the _accountType is equal to the string "Checking"
        if (_accountType == "Checking") {
            // Stores the bankDetails in the checkingAccounts mapping
            checkingAccounts[msg.sender].push(bankDetails);

            // Checks if the _accountType is equal to the string "Savings"
        } else if (_accountType == "Savings") {
            // Stores the bankDetails in the savingsAccounts mapping
            savingsAccounts[msg.sender].push(bankDetails);
        }

        // Transfers the TT _balance to the TTBank contract
        token.transferFrom(msg.sender, address(this), _balance);
    }

    function viewAccountByIndex(bytes32 _accountType, uint256 index)
        public
        view
        verifyAccountType(_accountType)
        returns (BankDetails memory)
    {
        BankDetails memory account;

        if (_accountType == "Checking") {
            account = checkingAccounts[msg.sender][index];
        } else if (_accountType == "Savings") {
            account = savingsAccounts[msg.sender][index];
        }

        return account;
    }
}
