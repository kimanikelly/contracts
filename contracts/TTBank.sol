//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {Token} from "./Token.sol";
import "hardhat/console.sol";

contract TTBank is Initializable, OwnableUpgradeable {
    using SafeERC20Upgradeable for Token;

    /**
     * @dev Emits after a bank account is opened
     */
    event AccountOpened(
        uint256 accountNumber,
        address accountName,
        uint256 startingBalance
    );

    /**
     * @dev Emits after a deposit is made into a bank account
     */
    event Deposit(
        uint256 accountNumber,
        address accountName,
        uint256 depositAmount,
        uint256 newBalance
    );

    /**
     * @dev Emits after a withdrawal is made on a bank account
     */
    event Withdraw(
        uint256 accountNumber,
        address accountName,
        uint256 withdrawAmount,
        uint256 newBalance
    );

    // Structures the bank account details
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

    modifier verifyAccountExists(address account) {
        // Requires the msg.sender to have an existing account
        require(accountExists[msg.sender], "TTBank: Account does not exist");
        _;
    }

    // Token.sol instance
    Token public token;

    // Instance of the struct BankDetails
    BankDetails private bankDetails;

    // Maps the msg.sender to their bank account details
    mapping(address => BankDetails) private accounts;

    // Maps the msg.sender to true/false if their account exists
    mapping(address => bool) private accountExists;

    /**
     * @dev Deploys TTBank.sol as an upgradeable smart contract by refactoring the
     * `constructor` with the `initialize` function
     * @param tokenAddress The address of the Token.sol contract
     */
    function initialize(address tokenAddress) public initializer {
        // Instantiates the Token.sol instance
        token = Token(tokenAddress);

        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    /**
     * @dev Allows the msg.sender to open an account with TTBank and make an initial deposit
     * @param startingBalance The amount of TT the msg.sender wants to open their account with
     */
    function openAccount(uint256 startingBalance)
        public
        verifyDepositAmount(startingBalance)
        returns (bool)
    {
        // Prevents an existing account from creating a new account
        require(!accountExists[msg.sender], "TTBank: Account already exists");

        // Sets the accountNumber and increments it by 1 per account
        bankDetails.accountNumber++;

        // Sets the accountName to the msg.sender
        bankDetails.accountName = msg.sender;

        // Sets the initial balance to the balance value passed in by the msg.sender
        bankDetails.balance = startingBalance;

        // Adds the msg.sender's bank account details to the accounts mapping
        accounts[msg.sender] = bankDetails;

        // Maps the msg.sender to the bool true when they open an account
        accountExists[msg.sender] = true;

        // Transfers the TT _balance to the TTBank contract
        token.safeTransferFrom(msg.sender, address(this), startingBalance);

        // Emits the AccountOpened event
        emit AccountOpened(
            bankDetails.accountNumber,
            msg.sender,
            bankDetails.balance
        );

        return true;
    }

    /**
     * @dev Allows the msg.sender to deposit TT into their existing account balance
     * @param amount The amount of TT the msg.sender wants to deposit into their account balance
     */
    function deposit(uint256 amount)
        public
        verifyDepositAmount(amount)
        verifyAccountExists(msg.sender)
        returns (bool)
    {
        // Increments the msg.sender's account balance by their deposit
        accounts[msg.sender].balance += amount;

        // Transfers the deposit from the msg.sender to the bank contract
        token.safeTransferFrom(msg.sender, address(this), amount);

        // Emits the Deposit event
        emit Deposit(
            accounts[msg.sender].accountNumber,
            msg.sender,
            amount,
            accounts[msg.sender].balance
        );

        return true;
    }

    /**
     * @dev Allows the msg.sender to withdraw a specified amount TT from their bank account
     * @param amount The amount of TT to withdraw from the msg.senders bank account
     */
    function withdraw(uint256 amount)
        public
        verifyAccountExists(msg.sender)
        returns (bool)
    {
        // Prevents the msg.sender from withdrawing more than their balance
        require(
            amount <= accounts[msg.sender].balance,
            "TTBank: Amount exceeds balance"
        );

        // Subtract the TT amount from the msg.senders balance
        accounts[msg.sender].balance -= amount;

        // Transfers the TT amount from TTBank to the msg.sender
        token.safeTransfer(msg.sender, amount);

        // Emits the Withdraw event
        emit Withdraw(
            accounts[msg.sender].accountNumber,
            msg.sender,
            amount,
            accounts[msg.sender].balance
        );

        return true;
    }

    /**
     * @dev Returns the BankDetails of the msg.sender's account
     */
    function viewAccount() public view returns (BankDetails memory) {
        return accounts[msg.sender];
    }

    /**
     * @dev Returns msg.senders bank account balance
     */
    function viewBalance() public view returns (uint256) {
        return accounts[msg.sender].balance;
    }

    /**
     * @dev Returns the TT balance of TTBank
     */
    function bankBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
