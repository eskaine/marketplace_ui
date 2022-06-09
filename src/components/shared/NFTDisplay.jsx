import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EthersContext } from '../../utils/EthersProvider';
import CubedImage from './CubedImage';

const NFTDisplay = ({
  name, imageUrl, owner, price,
}) => {
  const { userAccount } = useContext(EthersContext);
  return (
    <div className="rounded-full px-4 py-2">

      <CubedImage src={imageUrl} alt={name.toLowerCase()} />
      <p className="py-3 px-3 font-bold text-center">{name}</p>
      <hr className="mx-3" />
      <div className="flex justify-around items-center">

        <div className="py-3 px-3 text-sm italic text-gray-400">
          Listed by&nbsp;
          {owner.length <= 12 ? owner : owner.substring(0, 12)}
        </div>
        <div className="py-3">
          {/* <p className="text-sm text-gray-400">
            {userAccount && (<Link to={{pathname: '/nftdetail', state: {label, imageUrl, owner, price}}}>View NFT</Link>
            )}
          </p> */}
          <p>
            {price}
            &nbsp;
            ETH
          </p>
        </div>
      </div>
    </div>
  );
};

NFTDisplay.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  owner: PropTypes.string,
  price: PropTypes.number,
};

export default NFTDisplay;
