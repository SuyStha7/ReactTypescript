import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <img
        src='/menu.png'
        alt=''
        width={28}
        height={28}
        className='cursor-pointer'
        onClick={() => setOpen((prev) => !prev)}
      />
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
