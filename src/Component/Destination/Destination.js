import React, { useEffect, useState } from 'react';
import rideData from '../FakeData/data.json';
import mapImg from '../Images/map.png';
import GoogleMap from './GoogleMap';
import './Destination.css';
const Destination = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{
        setData(rideData);
    },[data])

    return (
        <div className="container d-flex">
            
            <div className="col-md-4 ">
                <div class="card">
                    <div class="card-body">
                    
                    {
                    data.map(d => <p>{d.location1}</p> )
                    }
                    <h6><label/>Pick From</h6>
                    <input type="text"/>
                    <h6><label/>Pick To</h6>
                    {
                    data.map(d => <p>{d.locationA}</p> )
                    }
                    <input type="text"/> <br/> <br/>
                    <button className="createBtn">Go Search  </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
             
             {
                  <img className="mapSize" src={mapImg} alt=""/> || <GoogleMap></GoogleMap>
             } 

            </div>
        </div>
    );
};

export default Destination;