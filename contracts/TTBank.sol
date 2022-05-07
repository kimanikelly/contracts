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

    Token public token;
    BankDetails private bankDetails;
    mapping(address => BankDetails[]) private checkingAccounts;
    mapping(address => BankDetails) public savingsAccounts;

    function initialize(address _tokenAddress) public initializer {
        token = Token(_tokenAddress);

        __Ownable_init();
    }

    function openAccount(bytes32 _accountType, uint256 _balance) public {
        // Requires the _accountType to either be a Checking or Savings account
        require(
            _accountType == "Checking" || _accountType == "Savings",
            "TTBank: Invalid account type"
        );

        // Requires the deposit amount to be greater than 0
        require(_balance > 0, "TTBank: Deposit amount is 0");

        bankDetails.accountNumber++;
        bankDetails.accountName = msg.sender;
        bankDetails.accountType = _accountType;
        bankDetails.balance = _balance;

        // Transfers the TEST TOKENS to the TTBank contract
        token.transferFrom(msg.sender, address(this), _balance);

        // Checks if the _accountType is equal to the string "Checking"
        if (_accountType == "Checking") {
            // Stores the bankDetails in the checkingAccounts mapping
            checkingAccounts[msg.sender].push(bankDetails);

            // Checks if the _accountType is equal to the string "Savings"
        } else if (_accountType == "Savings") {
            // Stores the bankDetails in the savingsAccounts mapping
            savingsAccounts[msg.sender] = bankDetails;
        }
    }

    function viewAccount(uint256 index)
        public
        view
        returns (BankDetails memory)
    {
        return checkingAccounts[msg.sender][index];
    }
}
