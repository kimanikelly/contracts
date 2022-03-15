//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20,Ownable {

    constructor(string memory name,string memory symbol) ERC20(name,symbol) {
     
    }

   function fund(uint256 amount) public onlyOwner {
        require(amount > 0, "Token: Insufficient fund amount");
        _mint(address(this), amount);
    }

    function fundAccount(uint256 amount) public {
        require(amount <= 100, "Token: Mint limit exceeded");
        ERC20(address(this)).transfer(msg.sender, 100);
    }
}


