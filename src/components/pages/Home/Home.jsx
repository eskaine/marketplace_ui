import React, { useContext, useEffect, useState } from 'react';
import NFTDisplay from '../../shared/NFTDisplay';
import { EthersContext } from '../../../utils/EthersProvider';

const loadNFTs = () => {
  const { getNFTList, nfts } = useContext(EthersContext);

  useEffect(() => {
    getNFTList();
  }, []);

  return nfts;
};

const Home = () => {
  const nfts = loadNFTs();

  return (
    <main className="content mt-10">
      <div className="content-title">Home</div>
      <div className="flex justify-center flex-wrap">
        {nfts.map((nft) => (
          <NFTDisplay
            name={nft.name}
            imageUrl={nft.imageUrl}
            owner={nft.currentOwner}
            price={nft.price}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
