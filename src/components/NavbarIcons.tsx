import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaCartShopping, FaPerson } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const NavbarIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = false;

  if (isLoggedIn) {
    navigate("/");
  }

  const handleProfile = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  return (
    <div className='flex items-center gap-4 xl:gap-6 relative'>
      <FaUser className="text-xl cursor-pointer"/>
      {isProfileOpen && (
        <div className='absolute p-4 rounded-md top-12 left-0 text-sm custom-shadow bg-white z-20'>
          <Link to='/'>Profile</Link>
          <div className='mt-2 cursor-pointer'>Logout</div>
        </div>
      )}

      <div className='relative cursor-pointer'>
        <FaCartShopping className="text-xl"/>
        <div className='absolute -top-4 -right-4 w-5 h-5 bg-orange-400 rounded-full text-white text-sm flex justify-center items-center '>
          1
        </div>
      </div>
    </div>
  );
};

export default NavbarIcons;
