import React from 'react';
import { Link } from 'react-router-dom';
import './Ride.css';

const Ride = (props) => {
    const {vehicleName,img} = props.ride;

    return (
        <div className="col-md-3 ">
            <div class="card m-2 rounded">
                <img className="p-4 imgSize" src={img} alt=""/>
                    <div class="card-body">
                        <h5 className="card-title text-center">
                            <Link to={`/login`}>{vehicleName} </Link>
                        </h5>
                    </div>
            </div>
        </div>
    );
};
export default Ride;