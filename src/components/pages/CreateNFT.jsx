import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { EthersContext } from '../../utils/EthersProvider';
import Button from '../shared/Button';
import CubedImage from '../shared/CubedImage';
import ipfsClient from '../../utils/ipfsClient';


function CreateNFT() {
  const navigate = useNavigate();
  const { getNFTList, addNFT } = useContext(EthersContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  const [formInput, updateFormInput] = useState({ price: '', name: '' });

  async function onChange(e) {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer(reader.result);
      setFileUrl(buffer);
      const image = buffer.toString('base64');
      setDisplayImage(image);
    }
    // try {
    //   const added = await ipfsClient.add(
    //     file,
    //     {
    //       // eslint-disable-next-line no-console
    //       progress: (prog) => console.log(`received: ${prog}`),
    //     },
    //   );
    //   console.log('issue');
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   console.log({ url });
    //   setFileUrl(url);
    // } catch (error) {
    //   // eslint-disable-next-line no-console
    //   console.log('Error uploading file: ', error);
    // }
  }

  async function createNft() {
    try {
      const newNft = {
        name: formInput.name,
        price: formInput.price,
        isListed: true,
        image: fileUrl,
      };
      console.log({formInput, newNft});
      const result = await addNFT(newNft);
      if(result) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error uploading file!');
    }
  }

  return (
    <main className="container mx-auto mt-10">
      <section>
        <div className="content-title">Preview Item</div>
        {displayImage ? <CubedImage src={`data:image/png;base64,${displayImage}`} alt='' /> : 
          <CubedImage src='https://via.placeholder.com/180x180.png?text=No+Image' alt='' />}
        
        <div className='form'>
          <div className='form_row'>
            <label className='upload-text' htmlFor="uploadfile">
                Upload File
              </label>
                <input
                  id="uploadfile"
                  type="file"
                  onChange={onChange}
                  className="upload__input text-white"
                />
            </div>
            <div className='form_row'>
              <label htmlFor="price">
                Price
              </label>
              <input
                  id="price"
                  type="number"
                  onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
                  placeholder="Enter price (ETH)"
                />
            </div>
            <div className='form_row'>
              <label htmlFor="title">
                Title
              </label>
              <input
                  id="title"
                  type="text"
                  onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
                  placeholder="Enter title"
                />
            </div>
        </div>
          {/* <div>
              <label htmlFor="listedTick">
                <input id="listedTick" type="checkbox" onChange={createNft}/>
                To be Listed
              </label>
            </div> */}
          <Button bgColor="primary-color" name="Add NFT" onClick={() => createNft()} />
          
      </section>
    </main>
  );
}

export default CreateNFT;
