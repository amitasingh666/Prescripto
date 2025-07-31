import React, { useState, useRef, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true);(it was for temp use before api)
  const { token, setToken, userData } = useContext(AppContext)

  // to logout
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  const dropdownRef = useRef(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  return (
    <div
      className="flex items-center justify-between py-4 px-6 shadow-sm border-b border-gray-200 h-18"
      style={{ marginLeft: 60, marginRight: 60 }}
    >
      {/* Logo */}
      <img
        className="cursor-pointer"
        style={{ width: 168 }}
        src={assets.logo}
        alt="Site logo"
        onClick={() => navigate('/')}
      />

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-black">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'relative after:content-[""] after:block after:w-3/5 after:h-[2px] after:bg-gray-700 after:mx-auto'
                : ''
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? 'relative after:content-[""] after:block after:w-3/5 after:h-[2px] after:bg-gray-700 after:mx-auto'
                : ''
            }
          >
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'relative after:content-[""] after:block after:w-3/5 after:h-[2px] after:bg-gray-700 after:mx-auto'
                : ''
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'relative after:content-[""] after:block after:w-3/5 after:h-[2px] after:bg-gray-700 after:mx-auto'
                : ''
            }
          >
            CONTACT
          </NavLink>
        </li>
        <li className="w-[140px] h-[35px]">
  <a
    href="http://localhost:5174/admin"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full h-full border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
  >
    Admin Panel
  </a>
</li>


      </ul>

      {/* Auth & Profile */}
      <div className="flex items-center gap-4">
        {
          token && userData
            ? (
              <div ref={dropdownRef} className="relative">
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={showMenu}
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <img
                    className="w-8 rounded-full"
                    src={userData.image}
                    alt="Profile"
                  />
                  <img className="w-2.5" src={assets.dropdown_icon} alt="Menu" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 pt-2 text-base font-medium text-gray-600 z-20">
                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                      <button
                        onClick={() => {
                          navigate('/my-profile');
                          setShowMenu(false);
                        }}
                        className="text-left hover:text-black"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/my-appointments');
                          setShowMenu(false);
                        }}
                        className="text-left hover:text-black"
                      >
                        My Appointments
                      </button>
                      <button
                        onClick={logout}
                        className="text-left hover:text-black"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-[#6366F1] text-white h-10 w-40 rounded-full text-sm font-normal hidden md:block hover:bg-blue-600 transition"
              >
                Create account
              </button>
            )}
        {/* <img onClick={() => setShowMenu(true)} className='md-hidden' src={assets.menu_icon} alt="" /> */}
        {/* Mobile menu
        <div className={`&{showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={() => setShowMenu(false)} to='/'><p>HOME</p></NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={() => setShowMenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={() => setShowMenu(false)} to='/about'><p>ABOUT</p></NavLink>
            <NavLink className='px-4 py-2 rounded inline-block' onClick={() => setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar