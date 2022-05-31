import React, { useContext, useEffect, useState } from 'react';
import NFTDisplay from '../../shared/NFTDisplay';
import { EthersContext } from '../../../utils/EthersProvider';

const useDisplayList = () => {
  const { getNFTList } = useContext(EthersContext);
  const [displayList, setDisplayList] = useState(null);

  async function getList() {
    const list = await getNFTList();
    setDisplayList(list); 
  }

  useEffect(() => {
      getList();
  });

  return displayList;
}

const Home = () => {
 const displayList = useDisplayList();

  return (
    <main className="content mt-10">
      <div className="content-title">Home</div>
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



export default Home;
