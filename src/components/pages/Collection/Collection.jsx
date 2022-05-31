import React, { useContext, useEffect, useState } from 'react';
import NFTDisplay from '../../shared/NFTDisplay';
import { EthersContext } from '../../../utils/EthersProvider';

function Collection() {
  const { getNFTList } = useContext(EthersContext);
  const [displayList, setDisplayList] = useState(null);

  async function getList() {
    const list = await getNFTList();
    console.log({list});
    setDisplayList(list); 
  }

  useEffect(() => {
      getList();
  }, []);

  return (
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
}

export default Collection;
