import React, {useEffect, useState} from 'react'
import fetchSettings from '../api/settings.js';

const Advertisements = ({ adID }) => {
    const [advertisement, setAdvertisement] = useState(null);
    useEffect(() => {
        const getAdImage = async () => {
            const { success, msg, config } = await fetchSettings(["ad"]);
            if(success) {
                setAdvertisement(config[`ad${adID}_image`]);
            } else {
                console.error("Failed to fetch advertisement: ", msg);
            }
        }
        getAdImage();
    }, []);


    return advertisement ? (
        <div className="ms_advr_wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <a href="#">
                            <img src={advertisement} alt="Advertisement Image" className="img-fluid" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
export default Advertisements
