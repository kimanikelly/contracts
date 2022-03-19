//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract Token is Initializable,OwnableUpgradeable,ERC20Upgradeable{
    
    event FundAmountSet(uint256 previousAmount, uint256 newAmount);

    uint256 public fundAmount;

    function initialize(string memory name, string memory symbol) public initializer  {
        __ERC20_init(name,symbol);

        __Ownable_init();
    }

   function mint(uint256 amount) public onlyOwner {
        require(amount > 0, "Token: Amount cannot be 0");
        _mint(address(this), amount);
    }

    function setFundAmount(uint256 amount) public onlyOwner  {

        // The value of the current fundAmount
        uint256 previousAmount = fundAmount;

        // Prevents the fundAmount from being set to 0
        require(amount > 0, "Token: Amount cannot be set to 0");

        // Sets the new fundAmount
        fundAmount = amount;

        // Emits the SetFundAmount event with the previousAmount and amount arguments
        emit FundAmountSet(previousAmount, amount);
       
    }

    function fundAccount() public {

        ERC20Upgradeable(address(this)).transfer(msg.sender, fundAmount);
    }
}


