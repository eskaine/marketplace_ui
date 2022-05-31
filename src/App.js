import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/core/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import Collection from './components/pages/Collection/Collection';
import UserHome from './components/pages/UserHome';
import Footer from './components/Footer';
import NFTDetail from './components/pages/NFTDetail';
import CreateNFT from './components/pages/CreateNFT';
import { EthersContext } from './utils/EthersProvider';

import './index.css';
import './styles/base.css';

function App() {
  const { getContract, userAccount } = useContext(EthersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAccount) {
      return navigate('/');
    }
  }, [userAccount]);

  useEffect(() => {
    getContract();
  }, []);

  return (
    <div className="App">
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Collection />} />
          <Route path="nftdetail" element={<NFTDetail />} />
          <Route path="createnft" element={<CreateNFT />} />
          <Route path="user" element={<UserHome header="My NFT List" />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
