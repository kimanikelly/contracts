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
        uint256 balance;
    }

    modifier verifyDepositAmount(uint256 amount) {
        // Requires the deposit amount to be greater than 0
        require(amount > 0, "TTBank: Deposit amount is 0");

        _;
    }

    Token public token;
    BankDetails private bankDetails;
    mapping(address => BankDetails) private accounts;

    function initialize(address _tokenAddress) public initializer {
        token = Token(_tokenAddress);

        __Ownable_init();
    }

    function openAccount(uint256 _balance)
        public
        verifyDepositAmount(_balance)
    {
        // Sets the accountNumber and increments it by 1 per account
        bankDetails.accountNumber++;

        // Sets the accountName to the callers public address
        bankDetails.accountName = msg.sender;

        // Sets the inital balance to the _balance value passed in by the msg.sender
        bankDetails.balance = _balance;

        accounts[msg.sender] = bankDetails;

        // Transfers the TT _balance to the TTBank contract
        token.transferFrom(msg.sender, address(this), _balance);
    }

    function deposit(uint256 amount) public verifyDepositAmount(amount) {
        accounts[msg.sender].balance += amount;

        token.transferFrom(msg.sender, address(this), amount);
    }

    function viewAccount() public view returns (BankDetails memory) {
        return accounts[msg.sender];
    }
}
