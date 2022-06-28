// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Loan details of a borrower
struct Vault {
    address borrower; /// Address of the borrower
    address nftCollateralAddress; /// Address of the collateral ERC-721 contract
    uint256 nftCollateralTokenId; /// TokenId of the collateral ERC-721 token
    uint256 principalAmount; /// ERC-20 loan amount
    uint256 dateOfLoan; /// Date the loan was taken out
    uint256 loanMaturityDate; /// Date the loan matures
}
