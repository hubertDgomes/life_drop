import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const isAuthenticated = Boolean(user)
    const navigate = useNavigate()
    const logoutBtn = async () => {
        try {
            await handleLogout()
            navigate("/")
        }
        catch (err) {
            console.log(err);
        }
    }

    // console.log(data);




    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li><a>Find Donors</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                    <Link to={"/"} className="btn btn-ghost text-xl">Life Drop</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={"/profile"}>About Me</Link></li>
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    {isAuthenticated ?
                        <>
                            <button onClick={logoutBtn} className="btn">Logout</button>
                        </>
                        :
                        <>
                            <Link to={"/signup"} className="btn">Sign Up</Link>
                            <Link to={"/login"} className="btn">Login</Link>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
