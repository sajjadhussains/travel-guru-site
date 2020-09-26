import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import MapContainer from '../MapContainer';

import fakeData2 from '../../../fakeData2';

const BookingInfo = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    return (
        <div style={{backgroundColor:'white'}}className="row">
           <div className="col-sm-6">
           {
                fakeData2.map(pd=>{
                    return <div className="row">
                         <div className="col-sm-4">
                         <img style={{width:'100%'}} src={pd.picture} alt=""/>
                         </div>
                         <div className="col-sm-2">
                        <h3>{pd.name}</h3>
                        <p style={{textColor:'dimgrey'}}>{pd.description}</p>
                         </div>
                        </div>
                })
            }
           </div>
           <div className="col-sm-6 google-map">
           <MapContainer></MapContainer>
           </div>
        </div>
    );
};

export default BookingInfo;