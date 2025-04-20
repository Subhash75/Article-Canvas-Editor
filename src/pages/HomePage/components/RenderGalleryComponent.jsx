import { useEffect, useRef, useState } from "react";
import { AiOutlineDrag } from "react-icons/ai";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaChevronUp,
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PlaceholderImg from "../../../assets/image-placeholder.png";
import Select from "../../../components/Select";

const GalleryProperties = ({
  onImageChange,
  autoplay,
  galleryPropertiesRef,
  onAutoplayChange,
  handleShowImageProperties,
}) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    onImageChange(imageUrls);
  };

  return (
    <div
      ref={galleryPropertiesRef}
      className="fixed top-20 right-0 z-20 bg-white w-[317px] rounded-lg shadow-lg gallery-properties-container"
    >
      <div className="flex justify-between px-3 py-5 bg-[#F6F6F6] rounded-tl-lg rounded-tr-lg">
        <h3 className="text-[15px] font-semibold">Gallery Properties</h3>
        <p
          className="cursor-pointer"
          onClick={(e) => handleShowImageProperties(e, false)}
        >
          X
        </p>
      </div>

      <div className="mt-3">
        <div className="flex justify-between p-2 border-b">
          <p>Slides</p>
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-primary w-[102px] h-[28px] rounded-md text-[13px] font-semibold text-white"
          >
            Add Images
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            hidden
            multiple
          />
        </div>

        <div className="flex justify-between items-center gap-2 px-3 py-2">
          <label className="text-[13px] font-medium">Role</label>
          <Select options={["Gallery"]} className="w-[148px] h-[33px]" />
        </div>

        <div className="flex justify-between items-center px-3 py-2">
          <p className="text-[13px] font-medium">Autoplay</p>
          <Select
            options={["Yes", "No"]}
            className="w-[148px] h-[33px]"
            value={autoplay}
            onChange={onAutoplayChange}
          />
        </div>
      </div>
    </div>
  );
};

function RenderGalleryComponent({
  id,
  index,
  handleLayoutRearrange,
  handleLayoutDelete,
}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState("Yes");
  const [showImageProperties, setShowImageProperties] = useState(true);

  const galleryPropertiesRef = useRef();

  const handleShowImageProperties = (e, open) => {
    e.stopPropagation();
    setShowImageProperties(open);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        galleryPropertiesRef.current &&
        galleryPropertiesRef.current.contains(e.target)
      ) {
        return;
      }

      setShowImageProperties(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay === "Yes" && selectedImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
    } else if (autoplay === "No" && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [autoplay, selectedImages]);

  const handleImageChange = (imageUrls) => {
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="relative h-full"
      onClick={(e) => handleShowImageProperties(e, true)}
    >
      {showImageProperties && (
        <>
          <div className="bg-white absolute top-0 left-0">
            <FaChevronUp
              size={14}
              className="cursor-pointer ml-[2px]"
              onClick={() => handleLayoutRearrange({ index, type: "move-up" })}
            />
            <FaAngleDown
              size={18}
              className="cursor-pointer"
              onClick={() =>
                handleLayoutRearrange({ index, type: "move-down" })
              }
            />
            <RiDeleteBin6Line
              size={18}
              className="cursor-pointer"
              onClick={() => handleLayoutDelete({ id })}
            />
          </div>

          <div className="bg-white absolute top-0 right-0 flex gap-x-2">
            <AiOutlineDrag size={22} className="cursor-pointer" />

            <RiDeleteBin6Line
              size={18}
              className="cursor-pointer"
              onClick={() => handleLayoutDelete({ id })}
            />
          </div>
        </>
      )}

      <div className="bg-[#F6F6F6] flex justify-center items-center h-full">
        {selectedImages.length > 0 ? (
          <div
            style={{
              backgroundImage: `url(${selectedImages[currentImageIndex]})`,
            }}
            className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
          ></div>
        ) : (
          <div
            style={{ backgroundImage: `url(${PlaceholderImg})` }}
            className="w-full h-full bg-cover bg-center"
          ></div>
        )}
      </div>

      {selectedImages.length > 1 && (
        <div className="absolute top-1/2 z-10 left-5 right-5 flex justify-between items-center">
          <button
            onClick={handlePrevClick}
            className="bg-black text-white p-2 rounded-full"
          >
            <FaAngleLeft size={20} />
          </button>
          <button
            onClick={handleNextClick}
            className="bg-black text-white p-2 rounded-full"
          >
            <FaAngleRight size={20} />
          </button>
        </div>
      )}

      {showImageProperties && (
        <GalleryProperties
          onImageChange={handleImageChange}
          autoplay={autoplay}
          galleryPropertiesRef={galleryPropertiesRef}
          onAutoplayChange={setAutoplay}
          handleShowImageProperties={handleShowImageProperties}
        />
      )}
    </div>
  );
}

export default RenderGalleryComponent;
