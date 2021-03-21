import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <nav className="navbar container navbar-expand-lg navbar-light bg-light p-3">

            <p className="navbar-brand font-weight-bold" href="#">Bengal Transport</p>

            <div className="collapse navbar-collapse justify-content-end" >
                <div className="navbar-nav">
                    <p className="nav-link active"><Link to={`/home`}>Home </Link></p>
                    <p className="nav-link active"><Link to={`/destination`}>Destination </Link></p>
                    <p className="nav-link active"><Link to={`/blog`}>Blog</Link></p>
                    <p className="nav-link active"><Link to={`/contact`}>Contact</Link></p>
                    <p className="nav-link active" ><Link to={`/login`}>
                        <button className="bg-success"> Login {loggedInUser.name} </button>
                        </Link></p>
                </div>    
            </div>
        </nav>
    );
};

export default Header;