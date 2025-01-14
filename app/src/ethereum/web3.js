import Web3 from 'web3';

let web3;

if ( typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ) {
  //We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
 //we are not on the browser OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'http://206.189.231.104:8545'
  );
  web3 = new Web3(provider);
}

export default web3;
