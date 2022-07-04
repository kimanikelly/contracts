// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/// Imports the ILender interface
import {ILender} from "./interfaces/ILender.sol";

/// Imports the PriceConsumerV3 contract and will be used as the testnet oracle
import {PriceConsumerV3} from "./PriceConsumerV3.sol";

/// Imports the Initializable contract
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// Imports the OwnableUpgradeable contract
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// Imports the IERC20Upgradeable contract to create an ERC-20 instance
import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

contract Lender is Initializable, OwnableUpgradeable, ILender {
    modifier checkAddress(address tokenAddress) {
        require(tokenAddress != address(0), "Lender: Cannot be a zero address");

        _;
    }

    /// Declare the ERC-20 token instance
    IERC20Upgradeable public token;

    /// Declare the oracle instance
    PriceConsumerV3 private oracle;

    /**
     * @dev Deploys Lender.sol as an upgradeable smart contract by refactoring the
     * `constructor` with the `initialize` function
     */
    function initialize(address stableCoinAddress, address oracleAddress)
        public
        initializer
    {
        require(
            stableCoinAddress != address(0),
            "Lender: stableCoinAddress cannot be a zero address"
        );

        require(
            oracleAddress != address(0),
            "Lender: oracleAddress cannot be a zero address"
        );

        /// Instantiates the ERC-20 contract with the value of the stableCoinAddress argument
        token = IERC20Upgradeable(stableCoinAddress);

        /// Instantiates the PriceConsumerV3 contract with the value of the oracleAddress argument
        oracle = PriceConsumerV3(oracleAddress);

        /// Initializes OwnableUpgradeable.sol and assigns the msg.sender as the owner
        __Ownable_init();
    }

    function borrow(uint256 loanAmount) public pure returns (bool) {
        /// Prevents a loan amount of 0 from being lent out
        require(loanAmount > 0, "Lender: Loan amount can not be 0");

        return true;
    }
}
