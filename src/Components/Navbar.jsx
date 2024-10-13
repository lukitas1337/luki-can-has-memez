import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const handleToggle = (e) => {
    if (e.target.checked) {
      changeTheme('synthwave'); // Switch to dark theme when checked
    } else {
      changeTheme('acid'); // Switch to acid theme when unchecked
    }
  };

  return (
    <>
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ma-mema-needs-memez">Gallery</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">lukiCanHasMemez</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ma-mema-needs-memez">Gallery</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
      <label className="label cursor-pointer">
          <span className="label-text">Theme: {theme === 'synthwave' ? 'Synthwave' : 'Acid'}</span>
          <input
            type="checkbox"
            className="toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
            onChange={handleToggle}
            checked={theme === 'synthwave'} // Make sure the toggle reflects the current theme
          />
        </label>
      </div>
    </div>
            <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="flex w-full flex-col">
  <div className="divider"></div>
</div>
          </>
  );
};

export default Navbar;
