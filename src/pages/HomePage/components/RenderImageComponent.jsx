import { useEffect, useRef, useState } from "react";
import { AiOutlineDrag } from "react-icons/ai";
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoDownloadOutline } from "react-icons/io5";
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
  imagePropertiesRef,
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
    <div
      ref={imagePropertiesRef}
      className="fixed top-20 right-0 z-20 bg-white w-[317px] rounded-lg shadow-lg image-properties-container"
    >
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
          <IoDownloadOutline size={26} className="cursor-pointer" />
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

function RenderImageComponent({
  id,
  index,
  handleLayoutRearrange,
  handleLayoutDelete,
}) {
  const [imageSrc, setImageSrc] = useState("");
  const [clipPathName, setClipPathName] = useState("None");
  const [showImageProperties, setShowImageProperties] = useState(true);
  const imagePropertiesRef = useRef();

  const isRealImage = imageSrc && imageSrc !== PlaceholderImg;

  const handleShowImageProperties = (e, open) => {
    e.stopPropagation();
    setShowImageProperties(open);
  };

  console.log("first");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      console.log({ e: e.target, imagePropertiesRef });
      if (
        imagePropertiesRef.current &&
        imagePropertiesRef.current.contains(e.target)
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

  return (
    <>
      <div
        className="bg-[#F6F6F6] relative flex justify-center items-center h-full"
        onClick={(e) => handleShowImageProperties(e, true)}
      >
        {showImageProperties && (
          <>
            <div className="bg-white absolute top-0 left-0">
              <FaChevronUp
                size={14}
                className="cursor-pointer ml-[2px]"
                onClick={() =>
                  handleLayoutRearrange({ index, type: "move-up" })
                }
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
          imagePropertiesRef={imagePropertiesRef}
          clipPathName={clipPathName}
          onClipPathChange={setClipPathName}
          handleShowImageProperties={handleShowImageProperties}
        />
      )}
    </>
  );
}

export default RenderImageComponent;
