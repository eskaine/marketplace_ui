import React, { useContext } from 'react';
import { EthersContext } from '../../../utils/EthersProvider';
import NavButton from '../../shared/NavButton';
import navConstant from './nav.constant';

const Navbar = () => {
  const { connectWallet, userAccount } = useContext(EthersContext);

  return (
    <div className="my-5 flex justify-between">
      <span className="font-bold text-white"><NavButton {...navConstant.home} /></span>
      <div>
        <NavButton {...navConstant.explore} />
        {!userAccount && (
        <button className="rounded-full px-4 py-2 text-white primary-color" onClick={connectWallet}>
          Login with Metamask
        </button>
        )}
        {userAccount && (
          <div className="user-nav">
            <NavButton {...navConstant.myList} />
            <NavButton {...navConstant.createNft} />
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
