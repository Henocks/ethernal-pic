pragma solidity ^0.4.24;

contract EthernalPic {
    
    event createdPic(address sender, uint256 counter);

    struct Picture {
        string rawPictureData;
        string licenseData;
        address uploader;
        address owner;
        uint256 value;
        uint256 timestamp;
    }
    
    mapping (uint256 => Picture) private pictures;
    uint256 public counter;
    
    constructor()
    public
    {
        counter = 0;
    }
    
    function createPic(string picture, address _owner)
    public
    {
        pictures[counter] = Picture(picture, "null", msg.sender, _owner, 0, block.timestamp);
        emit createdPic(msg.sender, counter);
        counter++;
    }

    function createLicensedPic(string picture, string licenseData, address _owner)
    public
    payable
    {
        pictures[counter] = Picture(picture, licenseData, msg.sender, _owner, 0, block.timestamp);
        emit createdPic(msg.sender, counter);
        counter++;
    }
    


    function findPic(uint256 _counter)
    public
    view
    returns(string result)
    {
        result = pictures[_counter].rawPictureData;
    }

    function findLicensedPic(uint256 _counter)
    public
    payable
    returns(string result, string licenseData)
    {
        if(pictures[_counter].value != 0){
            if(pictures[_counter].value != msg.value) revert("not enough value!");
            result = pictures[_counter].rawPictureData;
            licenseData = pictures[_counter].licenseData;
        }
        else {
            revert("not a payable picture!");
        }
    }


    
}