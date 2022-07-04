// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import {AggregatorV3Interface} from "../interfaces/AggregatorV3Interface.sol";

contract MockOracle {
    AggregatorV3Interface internal priceFeed;
    int256 private price;

    constructor() {
        /*
        // Thursday, July 30th 2022, 4:19pm
        // TestToken price is 200 usd for testing purposes
        // 200 usd = 0.2 eth
        // 0.2 eth = 200000000 gwei
        // 200000000 gwei = 200000000000000000 wei
        */
        price = 200000000000000000;

        /// Set the test contract to the zero address for ETH
        priceFeed = AggregatorV3Interface(
            0x0000000000000000000000000000000000000000
        );
    }

    function getLatestPrice() public view returns (int256) {
        return price;
    }

    function setPrice(int256 _price) external {
        price = _price;
    }
}
