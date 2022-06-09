import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EthersContext } from './utils/EthersProvider';
import AppContainer from './components/core/AppContainer';

const App = () => {
  const { getContract, userAccount } = useContext(EthersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAccount) {
      return navigate('/');
    }

    return undefined;
  }, [userAccount]);

  useEffect(() => {
    getContract();
  }, []);

  return <AppContainer />;
};

export default App;
