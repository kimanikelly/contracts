//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {IDoctor} from "./interfaces/IDoctor.sol";

contract Doctor is IDoctor {
    function signUp(bytes32 detailsCid) public returns (bool) {}
}
