
import '../navbar.css'

function Navbar() {
    return (
        <nav>
            <div className="nav-bar">
                <i className='bx bx-menu sidebarOpen'></i>
                <span className="logo navLogo"><a href="">Gomoku</a></span>

                <div className="menu">
                    <div className="logo-toggle">
                        <span className="logo"><a href="">Gomoku</a></span>
                        <i className='bx bx-x siderbarClose'></i>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
