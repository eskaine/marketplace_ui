import React, { useContext, useEffect, useState } from 'react';
import NFTDisplay from '../../shared/NFTDisplay';
import { EthersContext } from '../../../utils/EthersProvider';

const Collection = ({ displayList }) => (
  <main className="content mt-10">
    <div className="content-title text-center">Explore Collection</div>
    <div className="flex justify-center flex-wrap">
      {displayList && displayList.map((nft) => (
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

const NFTList = () => {
  const { getNFTList } = useContext(EthersContext);
  const [displayList, setDisplayList] = useState(null);

  async function getList() {
    const list = await getNFTList();
    setDisplayList(list);
  }

  useEffect(() => {
    getList();
  }, []);

  return <Collection {...displayList} />;
};

export default NFTList;
