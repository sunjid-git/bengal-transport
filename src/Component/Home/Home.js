import React, { useEffect, useState } from 'react';
import rideData from '../FakeData/data.json';
import Ride from '../Ride/Ride.js';
import bg from '../Images/Bg.png';

const Home = () => {

    const [rides, setRides] = useState([]);
    useEffect(()=>{
        setRides(rideData);
        console.log(rides);
     
    },[rides])

    return (
        <div className="container p-5" style={{backgroundImage:`url(${bg})`, height:'600px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className="row mt-5">
                {
                    rides.map(ride => <Ride ride={ride} ></Ride> )
                }
            </div>
        </div>
    );
};
export default Home;