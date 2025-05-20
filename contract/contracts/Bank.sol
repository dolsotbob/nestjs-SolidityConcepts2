// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Vault.sol";

contract Bank is Vault {
    constructor() {
        owner = msg.sender;
    }

    event Withdrawn(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call withdraw.");
        _;
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(amount <= sentValue, "Insufficient balance in Vault.");

        sentValue -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed.");

        emit Withdrawn(msg.sender, amount);
    }
}
