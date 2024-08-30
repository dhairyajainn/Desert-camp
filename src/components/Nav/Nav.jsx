import { useState } from 'react';
import './Nav.css';
import { IoPerson } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Nav() {
    const [burgar, setBurgar] = useState("hamburgar");
    const [menu, setMenu] = useState("closemenu");
    const [openshop, setOpenshop] = useState("dropdown-menu");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const user = useSelector((state) => state.auth.user); 
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    function makecross() {
        if (burgar === "hamburgar") {
            setBurgar("cross");
            setMenu("openmenu");
        } else {
            setBurgar("hamburgar");
            setMenu("closemenu");
        }
    }

    function openShop() {
        if (openshop === "dropdown-menu") {
            setOpenshop("openshop");
        } else {
            setOpenshop("dropdown-menu");
        }
    }

    return (
        <>
            <nav>
                <div className="left-nav">
                    <div className={burgar} onClick={makecross}>
                        <span></span><span></span><span></span>
                    </div>
                    <ul className={menu}>
                        <li>Home</li>
                        <li className='dropdown'>
                            <li className='dropdown' onClick={openShop}>Shop <FaAngleDown /></li>
                            <ul className={openshop}>
                                <li>Camping Tents</li>
                                <li>Camping Furniture</li>
                                <li>Camping Lights</li>
                                <li>Others</li>
                                <li>Sale</li>
                            </ul>
                        </li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="center-nav-logo">
                    <img src='./logo.png' alt="Logo" />
                </div>
                <div className="right-nav">
                    <ul>
                        <li className='dropdown'>
                            Info Pages <FaAngleDown />
                            <ul className='dropdown-menu'>
                                <li>Privacy Policy</li>
                                <li>Delivery | Shipping</li>
                                <li>Return | Exchange</li>
                                <li>Terms and Conditions</li>
                            </ul>
                        </li>
                        <li className='dropdown'>
                            Other <FaAngleDown />
                            <ul className='dropdown-menu'>
                                <li>My Account</li>
                                <li>Cart</li>
                                <li>Checkout</li>
                                <li>Wishlist</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="user-section">
                        <span><a href="#"><IoCallSharp /></a></span>
                        {user ? (
                            <div 
                                className="user-dropdown" 
                                onMouseEnter={() => setDropdownOpen(true)} 
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <span>Welcome, {user.name} <FaAngleDown /></span>
                                {dropdownOpen && (
                                    <ul className="user-dropdown-menu">
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <span><NavLink to='/login'><IoPerson /></NavLink></span>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
