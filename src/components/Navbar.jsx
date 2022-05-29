import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './shared/Button';
import { EthersContext } from '../utils/EthersProvider';

function Navbar() {
  const { connectWallet, userAccount } = useContext(EthersContext);
  const navigate = useNavigate();

  return (
    <div className="my-5 flex justify-between">
      <span className="font-bold text-white"><a onClick={() => navigate('/')}>NFT MARKETPLACE</a></span>
      {!userAccount && <Button bgColor="primary-color" name="Login with Metamask" onClick={connectWallet} />}
      {userAccount && (
        <div className="user-nav">
          <a onClick={() => navigate('/user')}>My List</a>
          <Button bgColor="primary-color" name="Add NFT" onClick={() => navigate('/createnft')} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
