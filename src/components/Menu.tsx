import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className=''
        onClick={toggleMenu}>
        <FaBars className='cursor-pointer text-xl' />
      </button>
      {open && (
        <div className='absolute bg-black text-white left-0 top-20 w-full custom-height flex flex-col items-center justify-center gap-8 text-xl z-10'>
          <Link to='/'>Home</Link>
          <Link to='/form'>Login</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
