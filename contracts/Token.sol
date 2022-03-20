//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract Token is Initializable, OwnableUpgradeable, ERC20Upgradeable {

    /**
     * @dev Emitted when the owner invokes `setFundAmount` to change the 
     * `fundAmount` value.
     * @param previousAmount The old `fundAmount` to be replaced.
     * @param newAmount The new `fundAmount` set to replace the `previousAmount`.
     */
    event FundAmountSet(uint256 previousAmount, uint256 newAmount);

    ///
    uint256 public fundAmount;

    uint256 internal amountCheck;

    function initialize(string memory name, string memory symbol)
        public
        initializer
    {
        __ERC20_init(name, symbol);

        __Ownable_init();

        amountCheck = 0;
    }

    function mint(uint256 amount) public onlyOwner {
        require(amount > amountCheck, "Token: Amount cannot be 0");
        _mint(address(this), amount);
    }

    function setFundAmount(uint256 amount) public onlyOwner {
        // The value of the current fundAmount
        uint256 previousAmount = fundAmount;

        // Prevents the fundAmount from being set to 0
        require(amount > amountCheck, "Token: Amount cannot be set to 0");

        // Sets the new fundAmount
        fundAmount = amount;

        // Emits the SetFundAmount event with the previousAmount and amount arguments
        emit FundAmountSet(previousAmount, amount);
    }

    function fundAccount() public {
        // Transfers the fundAmount to the msg.sender
        ERC20Upgradeable(address(this)).transfer(msg.sender, fundAmount);
    }
}
