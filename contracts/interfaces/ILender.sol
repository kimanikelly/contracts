// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface ILender {
    /// Loan details of a borrower
    struct Vault {
        address borrower; /// Address of the borrower
        uint256 ethCollateralAmount; ///
        uint256 principalAmount; /// ERC-20 loan amount
        uint256 dateOfLoan; /// Date the loan was taken out
        uint256 loanMaturityDate; /// Date the loan matures
    }

    /// Emits the transfer details after a user sends ETH to Lender.sol
    event EthReceived(address from, uint256 amount);

    /// Emits the loan details after the borrower invokes the borrow() function
    event LoanBorrowed(
        address borrower, /// Address of the borrower
        address tokenCollateralAddress, /// Address of the collateral ERC-20 contract
        uint256 principalAmount, /// ERC-20 loan amount
        uint256 dateOfLoan, /// Date the loan was taken out
        uint256 loanMaturityDate /// Date the loan matures
    );

    /// Emits the loan payment details after payer invokes the repayLoan() function
    event LoanRepaid(
        address borrower, /// Address of the borrower
        address payer, /// Address of the loan payer
        address tokenCollateralAddress /// Address of the collateral ERC-20 contract
    );

    function borrow(uint256 amount) external returns (bool);

    // function repayLoan(address borrowerAddress) external returns (bool);

    // function getBorrowers() external returns (address[] memory);

    // function getBorrowerIndex(address borrowerAddress)
    //     external
    //     returns (uint256);

    // function getBorrowerByIndex(uint256 index) external returns (address);

    function getCollateralBalance() external returns (uint256);
}
