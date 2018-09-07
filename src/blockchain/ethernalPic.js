import React from 'react';
import Web3 from 'web3';

class EthernalPic extends React.Component {
  state = {
    userAddress: 0
  };

  numberComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentWillMount() {
    const ABI = [{"constant":false,"inputs":[{"name":"picture","type":"string"}],"name":"createPic","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pictures","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_counter","type":"uint256"}],"name":"findPic","outputs":[{"name":"result","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"counter","type":"uint256"}],"name":"createdPic","type":"event"}];
    const contractAddr = "0xE8720CB8b80ffb4D93BeE736C624dc547603fc49";
    const web3 = new Web3(Web3.givenProvider);
    const GrassChain = new web3.eth.Contract(ABI, contractAddr);
    const GSCID = 2;
    const getAddress = async () => {
      const Adr = await web3.eth.getAccounts();
      return Adr[0];
    }
    const getGSCData = async (GSCID) => {
      const [GSCList, GSCRatio, GSCTimeStamp, GSCAddr] = await Promise.all(
        [
          GrassChain.methods.GSCList(GSCID).call(),
          GrassChain.methods.getGSCRatio(GSCID).call(),
          GrassChain.methods.getGSCTimestamp(GSCID).call(),
          GrassChain.methods.getGSCAddr(GSCID).call()
        ]);
      console.log(GSCList);
      console.log(GSCRatio);
      console.log(GSCTimeStamp);
      console.log(GSCAddr);

      return 0;
    }

    console.log(Promise.resolve(getAddress()));

    getAddress().then((address) => {
      this.setState({
        userAddress: address
      })
    });
  }

  createImg = () => {
    const ABI = [{"constant":false,"inputs":[{"name":"picture","type":"string"}],"name":"createPic","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pictures","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_counter","type":"uint256"}],"name":"findPic","outputs":[{"name":"result","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"counter","type":"uint256"}],"name":"createdPic","type":"event"}];
    const contractAddr = "0xccb73cdb056755b7cf9b8d1041268073a8cde83d";
    let web3 = new Web3(Web3.givenProvider);
    let EthPic = new web3.eth.Contract(ABI, contractAddr);

    EthPic.methods.createPic(document.getElementById('result').value).send(         // TO-DO : need to be refactored! - Dummy data.
      {
        from: this.state.userAddress,
        to: contractAddr,
        value: 0
      }).then((result) => {
        console.log("Sent done!");
        console.log(result);
        document.getElementById('txresult').innerHTML = result.transactionHash;
        document.getElementById('txresult').href = "https://ropsten.etherscan.io/tx/" + result.transactionHash;
      }, (reason) => {
        console.log("Error!");
        console.log(reason);
        document.getElementById('txresult').value = reason;
      });
  }

  loadImg = () => {
    const ABI = [{"constant":false,"inputs":[{"name":"picture","type":"string"}],"name":"createPic","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pictures","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_counter","type":"uint256"}],"name":"findPic","outputs":[{"name":"result","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"counter","type":"uint256"}],"name":"createdPic","type":"event"}];
    const contractAddr = "0xccb73cdb056755b7cf9b8d1041268073a8cde83d";
    let web3 = new Web3(Web3.givenProvider);
    let EthPic = new web3.eth.Contract(ABI, contractAddr);

    EthPic.methods.findPic(document.getElementById('imgID').value).call().then((result) => {
        console.log("Sent done!");
        console.log(result);
        document.getElementById('result').value = result;
      }, (reason) => {
        console.log("Error!");
        console.log(reason);
        document.getElementById('txresult').value = reason;
      });
  }

  render() {
    return (
      <div>
        <h1>EthernalPic Component Works!</h1>
        <h2>Ethereum Wallet Address : {this.state.userAddress} </h2>
        <button onClick={this.loadImg}>Load Pic!</button>
        <input id = 'imgID'></input>
        <br />
        <button onClick={this.createImg}>Upload Pic!</button>
        <h3>Result</h3>
        <a id = 'txresult'></a>
      </div>
    );

  }

}

export default EthernalPic;