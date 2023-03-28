// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityFactory {
    address[] public deployedCharities;

    function createCharity() public {
        address newCharity = address(new Charity(msg.sender));
        deployedCharities.push(newCharity);
    }

    function getDeployedCharity() public view returns (address[] memory) {
        return deployedCharities;
    }
}

contract Charity {
    event CharityEvent(address indexed from, string message, string username, uint value);

    struct Donator {
        string message;
        string username;
        uint value;
    }

    address public organization;
    Donator[] public donators;
    uint public charityCount;

    constructor(address creator) {
        organization = creator;
    }

    function getSummary() public view returns (uint balance, uint numDonators, uint numCharities) {
        return (
            address(this).balance,
            donators.length,
            charityCount
        );
    }

    function contributeMessage(string memory message, string memory username) public payable {
        charityCount++;

        emit CharityEvent(msg.sender, message, username, msg.value);
        Donator memory newDonator = Donator({
            message: message,
            username: username,
            value: msg.value
        });
        donators.push(newDonator);
    }
}
