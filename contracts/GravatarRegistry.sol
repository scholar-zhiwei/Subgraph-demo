//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GravatarRegistry {
  event NewGravatar(uint id, address owner, string displayName, string imageUrl);
  event UpdatedGravatar(uint id, address owner, string displayName, string imageUrl);

  uint id = 1;
  struct Gravatar {
    address owner;
    string displayName;
    string imageUrl;
  }

  Gravatar[] public gravatars;

  mapping (uint => address) public gravatarToOwner;
  mapping (address => uint) public ownerToGravatar;

  function createGravatar(string memory _displayName, string memory _imageUrl) public {
    require(ownerToGravatar[msg.sender] == 0);
    gravatars.push(Gravatar({
        owner: msg.sender, 
        displayName: _displayName, 
        imageUrl: _imageUrl
    }));

    gravatarToOwner[id] = msg.sender;
    ownerToGravatar[msg.sender] = id;
    id++;

    emit NewGravatar(id, msg.sender, _displayName, _imageUrl);
  }

  function updateGravatarName(string memory _displayName) public {
    require(ownerToGravatar[msg.sender] != 0);
    require(msg.sender == gravatars[ownerToGravatar[msg.sender]].owner);

    uint ids = ownerToGravatar[msg.sender];

    gravatars[ids].displayName = _displayName;
    emit UpdatedGravatar(ids, msg.sender, _displayName, gravatars[ids].imageUrl);
  }
}
