import React from 'react';
import PropTypes from 'prop-types';
import NFTDisplay from '../shared/NFTDisplay';

function UserHome({ header }) {
  return (
    <main className="content mt-10">
      <div className="content-title">{header}</div>
      <div className="flex justify-center flex-wrap">
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
      </div>
    </main>
  );
}

UserHome.propTypes = {
  header: PropTypes.string,
};

export default UserHome;
