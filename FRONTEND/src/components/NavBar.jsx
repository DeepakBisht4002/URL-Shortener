import { Link, useNavigate } from "@tanstack/react-router";
import { logoutUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();  // call API to logout
      dispatch(logout());  // update Redux state
      navigate({to : "/"});       // redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <nav className="bg-white border border-b-black">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.user?.name || "User"}
                </span>
                <button
                  onClick={() => handleLogout()}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
