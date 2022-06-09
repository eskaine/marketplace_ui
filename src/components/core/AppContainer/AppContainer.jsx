import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../../pages/Home';
import Collection from '../../pages/Collection';
import UserHome from '../../pages/UserHome';
import Footer from '../../Footer';
import NFTDetail from '../../pages/NFTDetail';
import CreateNFT from '../../pages/CreateNFT';

import './index.css';
import './base.css';

const AppContainer = () => (
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

export default AppContainer;
