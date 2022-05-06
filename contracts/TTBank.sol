//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Token} from "./Token.sol";
import "hardhat/console.sol";

contract TTBank is Initializable, OwnableUpgradeable {
    struct BankDetails {
        uint256 accountNumber;
        bytes32 accountName;
        bytes32 accountType;
        uint256 balance;
    }

    Token public token;
    BankDetails private bankDetails;
    mapping(address => BankDetails) public checkingAccounts;
    mapping(address => BankDetails) public savingsAccounts;

    function initialize(address _tokenAddress) public initializer {
        token = Token(_tokenAddress);

        __Ownable_init();
    }

    function openAccount(
        bytes32 _accountName,
        bytes32 _accountType,
        uint256 _balance
    ) public {
        require(
            _accountType == "Checking" || _accountType == "Savings",
            "Invalid account type"
        );

        _balance = _balance * 1 ether;

        require(_balance > 0, "Invalid balance");

        require(_balance <= token.balanceOf(msg.sender), "Balance not right");

        bankDetails.accountNumber++;
        bankDetails.accountName = _accountName;
        bankDetails.accountType = _accountType;
        bankDetails.balance = _balance;

        if (_accountType == "Checking") {
            checkingAccounts[msg.sender] = bankDetails;
        } else if (_accountType == "Savings") {
            savingsAccounts[msg.sender] = bankDetails;
        }
    }
}
