pragma solidity ^0.4.24;

contract EthernalPic {
    
    event createdPic(address sender, uint256 counter);
    
    mapping (uint256 => string) public pictures;
    uint256 public counter;
    
    constructor()
        public
    {
        counter = 0;
    }
    
    function createPic(string picture)
        public
    {
        pictures[counter] = picture;
        emit createdPic(msg.sender, counter);
        counter++;
    }

    function createLicensedPic(string picture, string licenseData)
    public
    payable
    {
        
    }
    
    function findPic(uint256 _counter)
        public
        view
        returns(string result)
    {
        result = pictures[_counter];
    }


    
}