import { FaAngleDown, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-3 h-[60px] border border-[#E2E2E2]">
      <h1 className="text-xl text-primary">Online Editor</h1>
      <div className="flex gap-x-3 items-center">
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary">
          <FaUser size={20} color="#fff" />
        </div>
        <p>Subhash Ghosh</p>
        <FaAngleDown size={24} />
      </div>
    </nav>
  );
}

export default Navbar;
