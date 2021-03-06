//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

interface ITTBank {
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

    function openAccount(uint256 startingBalance) external returns (bool);

    function deposit(uint256 amount) external returns (bool);

    function withdraw(uint256 amount) external returns (bool);

    function viewAccount() external returns (BankDetails memory);

    function bankBalance() external returns (uint256);
}
