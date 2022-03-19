//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract Token is Initializable,OwnableUpgradeable,ERC20Upgradeable{
    
    event SetFundAmount(uint256 previousAmount, uint256 newAmount);

    uint256 public fundAmount;

    function initialize(string memory name, string memory symbol) public initializer  {
        __ERC20_init(name,symbol);

        __Ownable_init();
    }

   function mint(uint256 amount) public onlyOwner {
        require(amount > 0, "Token: Amount cannot be 0");
        _mint(address(this), amount);
    }

    function setFundAmount(uint256 amount) public onlyOwner {

        // The value of fund amount before setting to a new value
        uint256 previousAmount = fundAmount;

        // Sets the new fund to the amount passed in as an argument
        fundAmount = amount;

        // Emits the SetFundAmount event with the previousAmount and amount arguments
        emit SetFundAmount(previousAmount, amount);
       
    }

    function fundAccount() public {

        ERC20Upgradeable(address(this)).transfer(msg.sender, fundAmount);
    }
}


