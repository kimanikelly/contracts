// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Imports the ILender interface
import {ILender} from "./interfaces/ILender.sol";

/// Imports the Initializable contract
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// Imports the OwnableUpgradeable contract
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// /// Imports the ERC721HolderUpgradeable contract to allow Lender to receive ERC-721's as collateral
// import {ERC721HolderUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

/// Imports the IERC20Upgradeable contract to create an ERC-20 instance
import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

contract Lender is Initializable, OwnableUpgradeable, ILender {
    /**
     * @dev Deploys Lender.sol as an upgradeable smart contract by refactoring the
     * `constructor` with the `initialize` function
     */
    function initialize() public initializer {
        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function borrow(
        address tokenCollateralAddress,
        uint256 tokenId,
        uint256 loanAmount
    ) public returns (bool) {
        /// Instantiates an ERC-721 contract from the nftCollateralAddress argument
        IERC20Upgradeable tokenCollateral = IERC20Upgradeable(
            tokenCollateralAddress
        );

        /// Prevents a loan amount of 0 from being lent out
        require(loanAmount > 0, "Lender: Loan amount can not be 0");
    }
}
