import PlaceholderImg from "../../../assets/image-placeholder.png";

const ImagePicker = () => {
  return (
    <div className="fixed top-20 right-0 bg-white w-[317px]">
      <div className="flex justify-between px-3 py-5 bg-[##F6F6F6]">
        <h3 className="text-[15px] font-semibold">ImagePicker</h3>
        <p>X</p>
      </div>
    </div>
  );
};

function RenderImageComponent() {
  return (
    <>
      <div className="bg-[#F6F6F6] flex justify-center items-center h-full">
        <img
          src={"../../../../assets/image-placeholder.png"}
          alt="image"
          onError={(e) => {
            e.target.src = PlaceholderImg;
          }}
        />
      </div>
      <ImagePicker />
    </>
  );
}

export default RenderImageComponent;
