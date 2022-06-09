import React, { useContext } from 'react';
import { EthersContext } from '../../utils/EthersProvider';

const NFTDetail = ({
  label, imageUrl, owner, price,
}) => {
  const { getNFTList } = useContext(EthersContext);
  return (
    <div className="flex justify-center flex-wrap">
      {/* {getNFTList().map((nft) => (
        <div className="flex justify-center flex-wrap">
          <img
            src={nft.imageUrl}
            alt=""
            className="w-100 single__nft-img"
          />
          <div className="single__nft__content">
            <h2>{nft.label}</h2>

            <div className="nft__creator d-flex gap-3 align-items-center">
              <div className="creator__img">
                <img src={nft.imageUrl} alt="" className="w-100" />
              </div>

              <div className="creator__detail">
                <p>Created By</p>
                <h6>{nft.owner}</h6>
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default NFTDetail;
