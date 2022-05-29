import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfsId = process.env.REACT_APP_IPFS_ID;
const ipfsSecret = process.env.REACT_APP_IPFS_SECRET;
const auth = `Basic ${Buffer.from(`${ipfsId}:${ipfsSecret}`).toString('base64')}`;

export default create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
