import React, { useContext } from 'react';
import { Button} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import fakeData from '../../../fakeData';

const TravelInfo = () => {
    const {placeId} = useParams();
    const placeDetails = fakeData.find(place => place.id == placeId);
    const {name, id, description} = placeDetails;
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleBlur = (e) => {
        const newUser = {...loggedInUser};
        newUser[e.target.name] = e.target.value;
        setLoggedInUser(newUser);
    }
    const handleTravel = () => {
        console.log(loggedInUser);
    }
    return (
        <div className = 'row'>
            <div className = 'col-sm-5 p-4 m-4'>
                <div key = {id} className = 'text-white w-75'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>                  
            </div>
            <div>
                <form className = 'travel-form'>
                    <label htmlFor="origin">Origin: </label>
                    <input type="text" name="origin" placeholder = 'Your Origin' onChange = {handleBlur} required/>
                    <label htmlFor="destination">Destination: </label>
                    <input type="text" name="destination" onChange = {handleBlur} placeholder = 'your destination' required/>
                    <br/>
                    <div className="row">
                        <div className="col-5">
                            <label htmlFor="origin">From: </label>
                            <input type="date" name="starting" onChange = {handleBlur} placeholder = 'date' required/>
                        </div>
                        <div className="col-5">
                            <label htmlFor="origin">To: </label>
                            <input type="date" name="ending" onChange = {handleBlur} placeholder = 'date' required/>
                        </div>        
                    </div>
                    {
                        !loggedInUser.starting || !loggedInUser.ending || !loggedInUser.origin || !loggedInUser.destination ? 
                        <p className = 'text-center text-danger'>Please fill out all the field</p> : <p></p>
                    }
                    <Link to="/booking-info">
                        <Button style={{textAlign:'center'}}disabled = {!loggedInUser.starting || !loggedInUser.ending || !loggedInUser.origin || !loggedInUser.destination} onClick = {handleTravel} type = 'submit' variant = 'warning' >Start Booking</Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default TravelInfo;