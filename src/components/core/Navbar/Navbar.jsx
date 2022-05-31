import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/Button';
import { EthersContext } from '../../../utils/EthersProvider';
import './Navbar.css';

function Navbar() {
  const { connectWallet, userAccount } = useContext(EthersContext);
  const navigate = useNavigate();

  return (
    <div className="my-5 flex justify-between">
      <span className="font-bold text-white"><button onClick={() => navigate('/')}>NFT MARKETPLACE</button></span>
      <div>
        <button className='nav-link' onClick={() => navigate('explore')}>Explore</button>
        {!userAccount && <Button bgColor="primary-color" name="Login with Metamask" onClick={connectWallet} />}
        {userAccount && (
          <div className="user-nav">
            <a onClick={() => navigate('/user')}>My List</a>
            <Button bgColor="primary-color" name="Add NFT" onClick={() => navigate('/createnft')} />
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Navbar;
