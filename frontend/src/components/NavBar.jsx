import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/" onClick={closeMenu}>AMovie</Link>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </div>
                <button 
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
                <Link to="/favorites" className="mobile-nav-link" onClick={closeMenu}>Favorites</Link>
            </div>
        </>
    );
}

export default NavBar