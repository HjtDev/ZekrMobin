import React, {useEffect, useState} from 'react'
import CustomSkeleton from './CustomSkeleton.jsx'
import fetchSettings from '../api/settings.js';


const Banner = () => {
    const [landingData, setLandingData] = useState(null);

    const loadData = async () => {
        const {success, msg, config} = await fetchSettings(['landing']);
        if(success) {
            setLandingData(config);
        } else {
            console.error('Failed to load settings:', msg);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="ms-banner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="ms_banner_img">
                            {
                                landingData ?
                                <img src={landingData?.landing_image} alt="Landing Image" className="img-fluid"/> :
                                <CustomSkeleton width={511} height={539} />
                            }
                        </div>
                        <div className="ms_banner_text">
                            <h1>
                                {
                                    landingData ?
                                    landingData.landing_title :
                                    <CustomSkeleton width={150} />
                                }
                            </h1>
                            <h1 className="ms_color">
                                {
                                    landingData ?
                                    landingData.landing_subtitle :
                                    <CustomSkeleton width={550} />
                                }
                            </h1>
                            <p>
                                {
                                    landingData ?
                                    landingData.landing_text :
                                    <CustomSkeleton width={550} />
                                }
                            </p>
                            <div className="ms_banner_btn">
                                <a href="#" className="ms_btn">
                                    حالا گوش دهید
                                </a>
                                <a href="#" className="ms_btn">
                                    اضافه کردن به لیست
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner
