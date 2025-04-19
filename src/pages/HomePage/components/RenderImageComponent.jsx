import { useEffect, useRef, useState } from "react";
import PlaceholderImg from "../../../assets/image-placeholder.png";
import Select from "../../../components/Select";

// https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d -> image link url

const clipPathOptions = {
  None: "none",
  Circle: "circle(50% at 50% 50%)",
  Ellipse: "ellipse(60% 40% at 50% 50%)",
  Polygon: "polygon(0% 0%, 100% 0%, 100% 70%, 0% 100%)",
};

const ImageProperties = ({
  imageSrc,
  onImageSelect,
  link,
  clipPathName,
  onClipPathChange,
  handleShowImageProperties,
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  const handleImageUrlChange = (e) => {
    onImageSelect(e.target.value.trim());
  };

  return (
    <div className="fixed top-20 right-0 bg-white w-[317px] rounded-lg shadow-lg image-properties-container">
      <div className="flex justify-between px-3 py-5 bg-[#F6F6F6] rounded-tl-lg rounded-tr-lg">
        <h3 className="text-[15px] font-semibold">Image Properties</h3>
        <p
          className="cursor-pointer"
          onClick={(e) => handleShowImageProperties(e, false)}
        >
          X
        </p>
      </div>

      <div className="mt-3">
        <img
          src={imageSrc || PlaceholderImg}
          alt="image"
          onError={(e) => {
            e.target.src = PlaceholderImg;
          }}
          className="w-full h-[162px] object-cover"
          style={{
            clipPath:
              imageSrc && imageSrc !== PlaceholderImg
                ? clipPathOptions[clipPathName]
                : "none",
          }}
        />

        <div className="flex justify-between p-2 border-b">
          <p>D</p>
          <button
            onClick={handleButtonClick}
            className="bg-primary w-[102px] h-[28px] rounded-md text-[13px] font-semibold text-white"
          >
            Select Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </div>

        <div className="flex justify-between items-center gap-2 px-3 py-2">
          <label className="text-[13px] font-medium">Link</label>
          <input
            type="text"
            placeholder="https://example.com"
            value={link}
            onChange={handleImageUrlChange}
            className="border rounded-md w-[148px] h-[33px] px-2 text-sm"
          />
        </div>

        <div className="flex justify-between items-center px-3 py-2">
          <p className="text-[13px] font-medium">Clip Path</p>
          <Select
            options={Object.keys(clipPathOptions)}
            className="w-[148px] h-[33px]"
            value={clipPathName}
            onChange={onClipPathChange}
          />
        </div>
      </div>
    </div>
  );
};

function RenderImageComponent() {
  const [imageSrc, setImageSrc] = useState("");
  const [clipPathName, setClipPathName] = useState("None");
  const [showImageProperties, setShowImageProperties] = useState(true);

  const isRealImage = imageSrc && imageSrc !== PlaceholderImg;

  const handleShowImageProperties = (e, open) => {
    e.stopPropagation();
    setShowImageProperties(open);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".image-properties-container")) return;
      setShowImageProperties(false);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className="bg-[#F6F6F6] flex justify-center items-center h-full"
        onClick={(e) => handleShowImageProperties(e, true)}
      >
        <img
          src={imageSrc || PlaceholderImg}
          alt="image"
          onError={(e) => {
            e.target.src = PlaceholderImg;
          }}
          className="object-cover w-full h-full"
          style={{
            clipPath: isRealImage ? clipPathOptions[clipPathName] : "none",
          }}
        />
      </div>

      {showImageProperties && (
        <ImageProperties
          imageSrc={imageSrc}
          onImageSelect={setImageSrc}
          clipPathName={clipPathName}
          onClipPathChange={setClipPathName}
          handleShowImageProperties={handleShowImageProperties}
        />
      )}
    </>
  );
}

export default RenderImageComponent;
