pragma solidity ^0.8.0;

// Import ERC1155 from token contract from OpenZepplin
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable {
    
	constructor() ERC1155("https://e61xv5nlo0vj.usemoralis.com/gadgets/{id}.json") { }
	
	function mint(address account, uint256 id, uint256 amount) public onlyOwner {
		_mint(account, id, amount, "");
	}
	
	function burn(address account, uint256 id, uint256 amount) public {
		require(msg.sender == account);
		_burn(account, id, amount);
	}
}
