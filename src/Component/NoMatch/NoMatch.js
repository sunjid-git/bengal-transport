import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import error from '../Images/error.png';
import './NoMatch.css';
const NoMatch = () => {
    return (
        <div className="container text-center">
           
                <img className="errorImg" src={error} alt=""/>
           
            <div className="text-center">
                <Button as={Link} to="/" variant="danger">Go home</Button>
            </div>
        </div>
    );
};

export default NoMatch;