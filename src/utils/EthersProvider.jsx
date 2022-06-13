import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import axios from 'axios';
import marketPlaceAbi from './contracts/MarketPlace.json';
import nftAbi from './contracts/NFT.json';

// import ipfsClient from './ipfsClient';
import data from './seedData';
import contractAddresses from './config';

const EthersContext = React.createContext();

const EthersProvider = ({ children }) => {
  const [addresses] = useState(contractAddresses);
  const [abis] = useState({
    marketPlace: marketPlaceAbi
  });

  const [nfts, setNfts] = useState([]);

  const [userAccount, setUserAccount] = useState(null);
  const [sampleImageUrl] = useState('https://ipfs.infura.io/ipfs/Qmf6isejKuRVLxWyY1NpMudrGp97xo5NCtamynbKrssjBi');
  const [contracts, setContracts] = useState({
    marketPlace: null,
    nft: null
  });

  async function connectWallet() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    return signer;
  }

  function getUnsignedContract(contractName) {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(addresses[contractName], abis[contractName], provider);

    return contract;
  }

  async function getSignedContract(contractName) {
    const signer = await connectWallet();
    const contract = new ethers.Contract(addresses[contractName], abis[contractName], signer);

    return contract;
  }

  async function buyNft(nft) {
    const contract = getSignedContract('marketPlace');
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.itemSale(addresses.nft, nft.tokenId, {
      value: price
    });

    await transaction.wait();
    getNFTList();
  }

  async function getNFTList() {
    const marketPlaceContract = getUnsignedContract('marketPlace');
    const list = await marketPlaceContract.getAllItems();

    const items = await Promise.all(list.map(async i => {
      const tokenUri = await contracts.nft.tokenUri(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price, 
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.ownder,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      };

      return item;
    }));

    setNfts(items);
  }

  async function addNFT({
    name, price, isListed, image,
  }) {
    let imageUrl = '';

    if (image) {
      // const imgObj = await ipfsClient.add(image, {
      //   progress: (prog) => console.log(`received: ${prog}`),
      // });
      // newNFT.imageUrl = `https://ipfs.infura.io/ipfs/${imgObj.path}`;
      imageUrl = sampleImageUrl;
    }

    if (contract) {
      const tx = await contract.addNFT(name, price, imageUrl, isListed, {
        value: ethers.utils.parseEther('0.1'),
      });
      const receipt = await tx.wait();

      return receipt;
    }
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

    const currentContract = getContract();
    currentContract.editNFT(...NFT);
  }

  const memoizedState = useMemo(() => ({
    buyNft, getNFTList,
  }));

  return (
    <EthersContext.Provider value={memoizedState}>
      {children}
    </EthersContext.Provider>
  );
};

EthersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { EthersProvider, EthersContext };
