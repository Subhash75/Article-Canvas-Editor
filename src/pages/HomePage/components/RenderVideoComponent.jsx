import { useEffect, useRef, useState } from "react";
import Select from "../../../components/Select";
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineDrag } from "react-icons/ai";

const VideoProperties = ({
  tempURL,
  setTempURL,
  videoPropertiesRef,
  onApply,
  handleShowVideoProperties,
}) => {
  const [isValidURL, setIsValidURL] = useState(true);

  const handleURLChange = (e) => {
    const url = e.target.value;
    setTempURL(url);

    // Check if it's a valid YouTube URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube|youtu|youtube-nocookie)\.(?:com|be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    setIsValidURL(!!match);
  };

  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube|youtu|youtube-nocookie)\.(?:com|be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const preview = (
    <div className="h-[162px] bg-black flex items-center justify-center">
      {isValidURL ? (
        <iframe
          className="w-full h-full pointer-events-none"
          src={`https://www.youtube.com/embed/${getVideoId(tempURL)}`}
          title="YouTube Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <p className="text-white text-sm">Invalid YouTube URL</p>
      )}
    </div>
  );

  return (
    <div
      ref={videoPropertiesRef}
      className="fixed top-20 right-0 z-20 bg-white w-[317px] rounded-lg shadow-lg video-properties-container"
    >
      <div className="flex justify-between px-3 py-5 bg-[rgb(246,246,246)] rounded-tl-lg rounded-tr-lg">
        <h3 className="text-[15px] font-semibold">Video Properties</h3>
        <p
          className="cursor-pointer"
          onClick={(e) => handleShowVideoProperties(e, false)}
        >
          X
        </p>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center px-3 py-2">
          <p className="text-[13px] font-medium">Type</p>
          <Select
            options={["Web", "MP4", "Hosted"]}
            className="w-[148px] h-[33px]"
          />
        </div>

        {tempURL && isValidURL ? (
          preview
        ) : (
          <div className="h-[162px] bg-[#F6F6F6]"></div>
        )}

        <input
          type="text"
          className="w-full border rounded-md p-1 text-sm my-3"
          placeholder="Paste YouTube URL"
          value={tempURL}
          onChange={handleURLChange}
        />

        {!isValidURL && (
          <p className="text-red-500 text-xs mb-1">
            Please enter a valid YouTube URL
          </p>
        )}

        <button
          onClick={() => isValidURL && onApply(tempURL)}
          className="bg-primary w-full h-[28px] rounded-md text-[13px] font-semibold text-white"
          disabled={!isValidURL}
        >
          Apply
        </button>

        <div className="flex justify-between items-center px-3 py-2">
          <p className="text-[13px] font-medium">Link</p>
          <Select
            options={["None", "External URL", "Internal Page"]}
            className="w-[148px] h-[33px]"
          />
        </div>
      </div>
    </div>
  );
};

function RenderVideoComponent({
  id,
  index,
  handleLayoutRearrange,
  handleLayoutDelete,
}) {
  const [videoURL, setVideoURL] = useState("");
  const [tempURL, setTempURL] = useState("");
  const [showVideoProperties, setShowVideoProperties] = useState(true);

  const videoPropertiesRef = useRef();

  const handleShowVideoProperties = (e, open) => {
    e.stopPropagation();
    setShowVideoProperties(open);
  };

  const handleApply = (url) => {
    setVideoURL(url);
  };

  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube|youtu|youtube-nocookie)\.(?:com|be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        videoPropertiesRef.current &&
        videoPropertiesRef.current.contains(e.target)
      ) {
        return;
      }

      setShowVideoProperties(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          videoURL ? "bg-white" : "bg-[#F6F6F6]"
        } flex justify-center items-center h-full relative`}
        onClick={(e) => handleShowVideoProperties(e, true)}
      >
        {showVideoProperties && (
          <>
            <div className="bg-white absolute top-0 left-0  z-20">
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

            <div className="bg-white absolute top-0 right-0 z-20 flex gap-x-2">
              <AiOutlineDrag size={22} className="cursor-pointer" />

              <RiDeleteBin6Line
                size={18}
                className="cursor-pointer"
                onClick={() => handleLayoutDelete({ id })}
              />
            </div>
          </>
        )}
        {videoURL ? (
          <iframe
            src={`https://www.youtube.com/embed/${getVideoId(
              videoURL
            )}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerpolicy="no-referrer-when-downgrade"
            className="w-[95%] ml-auto h-full"
          ></iframe>
        ) : (
          <div className="w-full h-full bg-[#F6F6F6] flex justify-center items-center"></div>
        )}
      </div>

      {showVideoProperties && (
        <VideoProperties
          tempURL={tempURL}
          setTempURL={setTempURL}
          videoPropertiesRef={videoPropertiesRef}
          onApply={handleApply}
          handleShowVideoProperties={handleShowVideoProperties}
        />
      )}
    </>
  );
}

export default RenderVideoComponent;
