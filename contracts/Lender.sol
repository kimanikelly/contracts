// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Imports the ILender interface
import {ILender} from "./interfaces/ILender.sol";

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// Imports the OwnableUpgradeable contract
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// Imports the ERC721HolderUpgradeable contract and allows Lender to receive ERC-721's
import {ERC721HolderUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

import {IERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

contract Lender is
    Initializable,
    OwnableUpgradeable,
    ERC721HolderUpgradeable,
    ILender
{
    /**
     * @dev Deploys Lender.sol as an upgradeable smart contract by refactoring the
     * `constructor` with the `initialize` function
     */
    function initialize() public initializer {
        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function borrow(
        address nftCollateralAddress,
        uint256 tokenId,
        uint256 loanAmount
    ) public returns (bool) {
        /// Instantiates an ERC-721 contract from the nftCollateralAddress argument
        IERC721Upgradeable nftCollateral = IERC721Upgradeable(
            nftCollateralAddress
        );

        /// Prevents a loan amount of 0 from being lent out
        require(loanAmount > 0, "Lender: Loan amount can not be 0");
    }
}
