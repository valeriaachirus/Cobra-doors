import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DoorMapping } from '../constants/Constants';


const PopUp1 = (props) => {

  const [selectedButton, setSelectedButton] = useState('fiberglass');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [showSelectedImage, setShowSelectedImage] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChildElementClick = (button) => {
    setSelectedButton(button);
    // setShowSelectedImage(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image.id);
    props.onDoorModelClick({
      doorShape: image.id
    });
    // setShowSelectedImage(true);
  };

  const renderImages = () => {
    if (selectedButton === 'fiberglass') {
      // const images = [
      //   '../public/fiberglass/1.jpeg',
      //   '/fiberglass/2.jpeg',
      //   '/fiberglass/3.jpeg',
      //   '/fiberglass/4.jpeg',
      //   '/fiberglass/5.jpeg',
      //   '/fiberglass/6.jpeg',
      // ];

      const images = DoorMapping.filter(door => door.category === "fiberglass");

      return (
        <div className="flex flex-wrap ml-[22px] mt-8 gap-x-16 gap-y-10 grid-start-2 grid-end-3 grid-span-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-[130px] h-[300px] object-cover cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      );
    } else if (selectedButton === 'steel') {
      // const images = [
      //   '/steel/1.jpeg',
      //   '/steel/2.jpeg',
      //   '/steel/3.jpeg',
      //   '/steel/4.jpeg',
      //   '/steel/5.jpeg',
      // ];
      const images = DoorMapping.filter(door => door.category === "steel");
      console.log(images);

      return (
        <div className="flex flex-wrap gap-x-5 gap-y-10 mt-8">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-[130px] h-[300px] object-cover cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const handleDoorModelClick = (doorModel) => {
    setSelectedButton(doorModel); // Modificăm selectedButton pentru a seta modelul de ușă selectat
    // setShowSelectedImage(false); // Închidem imaginea din primul pop-up
    // props.onDoorModelClick(doorModel); // Tratăm evenimentul de selectare a modelului de ușă
  };

  return (
    <>
      <div className="fixed flex flex-col">
      <div  className="bg-[#CC313D] w-[415px] h-[70px] text-[25px] flex items-center justify-center text-white font-bold text-center">
  MODEL
</div>
        <div className="bg-[#D9D9D9] flex-grow w-[415px] max-h-[854px] overflow-y-auto p-4">
          <div className="flex justify-center mb-4">
            <button
              className={`py-2 px-4 text-[20px]  rounded-full text-white font-bold ${
                selectedButton === 'fiberglass' ? 'bg-[#CC313D]' : 'bg-[#606060]'
              } mx-2 w-[150px]`}
              onClick={() => handleDoorModelClick('fiberglass')} // Modificăm funcția de tratare pentru a trata evenimentul de selectare a modelului de ușă
            >
              Fiberglass
            </button>
            <button
              className={`py-2 px-4 text-[20px] ml-[50px]  rounded-full text-white font-bold ${
                selectedButton === 'steel' ? 'bg-[#CC313D]' : 'bg-[#606060]'
              } mx-2 w-[150px]`}
              onClick={() => handleDoorModelClick('steel')} // Modificăm funcția de tratare pentru a trata evenimentul de selectare a modelului de ușă
            >
              Steel
            </button>
          </div>
          <div className="flex flex-col image-container">{renderImages()}</div>
        </div>
      </div>
      <div onClick={() => props.closePopUp()}></div>

      {/* {selectedImage && showSelectedImage && (
        <div className="fixed top-[25%] left-[63%] transform[-translate(-50%, -50%)] max-w-[calc(100% - 60px)] max-h-[calc(100% - 60px)] flex items-center justify-center bg-black bg-opacity-80">
          <img src={selectedImage} alt="Selected Image" className="max-w-full max-h-full" />
        </div>
      )} */}
    </>
  );
};

export default PopUp1;
