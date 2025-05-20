// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
    address public owner;
    uint256 public sentValue;
    uint256 public timestamp;
    uint256 public gasUsed;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value > 0, "Must send some ether.");
        sentValue = msg.value;
        timestamp = block.timestamp;
    }

    function getCaller() public view returns (address) {
        return msg.sender;
    }

    function getOrigin() public view returns (address) {
        return tx.origin;
    }

    function getBlockDetails()
        public
        view
        returns (
            uint256 blockNumber,
            uint256 blockPrevrandao,
            uint256 blockGasLimit,
            address blockCoinBase
        )
    {
        return (block.number, block.prevrandao, block.gaslimit, block.coinbase);
    }

    function trackGasUsage() public {
        uint256 initGas = gasleft();
        uint256 result = 0;

        for (uint256 i = 0; i < 100; i++) {
            result += i;
        }

        uint256 finalGas = gasleft();
        gasUsed = initGas - finalGas;
    }

    function generateHash(
        string calldata message
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(message));
    }
}
