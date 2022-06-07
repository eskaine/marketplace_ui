import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/Button';
import { EthersContext } from '../../../utils/EthersProvider';

import NavButton from '../../shared/NavButton';

function Navbar() {
  const { connectWallet, userAccount } = useContext(EthersContext);
  const navigate = useNavigate();

  const nav = {
    home: {
      name: 'NFT MARKETPLACE',
      url: '/',
      class: ''
    },
    explore: {
      name: 'Explore',
      url: 'explore',
      class: 'nav-link'
    },
    createNft: {
      name: 'Create NFT',
      url: 'createnft',
      class: 'rounded-full px-4 py-2 text-white primary-color'
    }
  }

  return (
    <div className="my-5 flex justify-between">
      <span className="font-bold text-white"><NavButton {...nav.home} /></span>
      <div>
        <NavButton {...nav.explore} />
        {!userAccount && <Button bgColor="primary-color" name="Login with Metamask" onClick={connectWallet} />}
        {userAccount && (
          <div className="user-nav">
            <a onClick={() => navigate('/user')}>My List</a>
            <NavButton {...nav.createNft} />
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Navbar;
