import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavbarIcons from "./NavbarIcons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-white shadow-md h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 z-50'>
      {/* mobile */}
      <div className='h-full flex items-center justify-between md:hidden'>
        <Menu />
      </div>

      {/* bigger screens */}
      <div className='hidden md:flex items-center justify-between gap-8 h-full'>
        {/* left */}
        <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
          <div className='hidden xl:flex gap-4'>
            <Link to='/'>Home</Link>
            <Link to='/form'>Login</Link>
          
          </div>
        </div>

        {/* right */}
        <div className='w-2/3 xl:w-1/2 flex items-center justify-between gap-8'>
          <SearchBar />
          <NavbarIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
