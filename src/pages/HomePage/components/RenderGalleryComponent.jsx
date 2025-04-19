import { useEffect, useRef, useState } from "react";
import PlaceholderImg from "../../../assets/image-placeholder.png";
import Select from "../../../components/Select";

// GalleryProperties Component
const GalleryProperties = ({
  onImageChange,
  autoplay,
  onAutoplayChange,
  handleShowImageProperties,
}) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    onImageChange(imageUrls); // Call the function passed from the parent to update selected images
  };

  return (
    <div className="fixed top-20 right-0 z-20 bg-white w-[317px] rounded-lg shadow-lg gallery-properties-container">
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

// Parent Component (RenderGalleryComponent)
function RenderGalleryComponent() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState("Yes");

  const [showImageProperties, setShowImageProperties] = useState(true);

  const handleShowImageProperties = (e, open) => {
    e.stopPropagation();
    setShowImageProperties(open);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".gallery-properties-container")) return;
      setShowImageProperties(false);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay === "Yes" && selectedImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Change the image every 3 seconds
    } else if (autoplay === "No" && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [autoplay, selectedImages]); // Trigger autoplay when autoplay or images change

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
            L
          </button>
          <button
            onClick={handleNextClick}
            className="bg-black text-white p-2 rounded-full"
          >
            R
          </button>
        </div>
      )}

      {showImageProperties && (
        <GalleryProperties
          onImageChange={handleImageChange}
          autoplay={autoplay}
          onAutoplayChange={setAutoplay}
          handleShowImageProperties={handleShowImageProperties}
        />
      )}
    </div>
  );
}

export default RenderGalleryComponent;
