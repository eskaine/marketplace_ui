import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import contractAbi from './MarketPlace.json';
// import ipfsClient from './ipfsClient';
import data from './seedData';

const EthersContext = React.createContext();

function EthersProvider({ children }) {
  const [contractAddress] = useState('0x5FbDB2315678afecb367f032d93F642f64180aa3');
  const [userAccount, setUserAccount] = useState(null);
  const [sampleImageUrl] = useState('https://ipfs.infura.io/ipfs/Qmf6isejKuRVLxWyY1NpMudrGp97xo5NCtamynbKrssjBi');
  const [contract, setContract] = useState(null);

  async function connectWallet() {
    try {
      if (window.ethereum) {
        const user = await window.ethereum.request(
          { method: 'eth_requestAccounts' },
        );

        setUserAccount(user[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getContract() {
    console.log('get contract');
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const newContract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

      setContract(newContract);
    }
  }

  async function addNFT({name, price, isListed, image}) {
    let imageUrl = '';

    if (image) {
      // const imgObj = await ipfsClient.add(image, {
      //   progress: (prog) => console.log(`received: ${prog}`),
      // });
      // newNFT.imageUrl = `https://ipfs.infura.io/ipfs/${imgObj.path}`;
      imageUrl = sampleImageUrl;
    }

    if(contract) {
      let tx = await contract.addNFT(name, price, imageUrl, isListed,  {
        value: ethers.utils.parseEther("0.1"),
      });
      const receipt = await tx.wait();
      
      return receipt;
    }    
    
    return;
  }

  async function editNFT({
    id, name, price, isListed, currentImageUrl, image,
  }) {
    const NFT = {
      id, name, price, isListed, imageUrl: '',
    };

    if (currentImageUrl === '') {
      // const imageUrl = await ipfsClient.add(image);
      // NFT.imageUrl = imageUrl;
      NFT.imageUrl = sampleImageUrl;
    } else {
      NFT.imageUrl = currentImageUrl;
    }

    const contract = getContract();
    contract.editNFT(...NFT);
  }

  async function getNFTList() {
    console.log('get contract 2');
    let seedData = data.map((d) => {
      d.imageUrl = sampleImageUrl;
      return d;
    });
    console.log({contract});

    if(contract) {
    console.log('get contract 2a');
      const list = await contract.getAllListedNFT();
      console.log('get contract 2b');

      for(let i in list) {
        seedData.push({
          name: list[i].name,
          imageUrl: list[i].imageUrl,
          currentOwner: list[i].currentOwner,
          price: list[i].price.toNumber(),
        });
      }
    }

    return seedData;
  }

  const memoizedState = useMemo(() => ({
    addNFT, editNFT, getNFTList, connectWallet, getContract, userAccount,
  }));

  return (
    <EthersContext.Provider value={memoizedState}>
      {children}
    </EthersContext.Provider>
  );
}

EthersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { EthersProvider, EthersContext };
