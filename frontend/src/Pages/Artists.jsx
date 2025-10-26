import React, {useEffect, useState} from 'react'
import getArtists from '../api/artists.js';
import CustomSkeleton from '../components/CustomSkeleton.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const [pageContent, setPageContent] = useState(null);
    const loadPageContent = async () => {
        setIsLoading(true);
        const { success, msg, artists } = await getArtists();
        setPageContent(artists);
        const messanger = success ? toast.success : toast.error
        msg.forEach(message => messanger(message));
        setIsLoading(false);
    }

    useEffect(() => {
        loadPageContent();
    }, []);

    return (
        <div className="ms_top_artist">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ms_heading">
                            <h1>هنرمندان</h1>
                        </div>
                    </div>
                    {
                        !isLoading && pageContent && pageContent?.length > 0 ?
                            pageContent.map((artist, index) => (
                                <div className="col-lg-2 col-md-6" key={index}
                                     onClick={() => {
                                         navigate(`/posts/?artists=${artist?.id}`, { replace: true });
                                     }}
                                >
                                    <div className="ms_rcnt_box marger_bottom30">
                                        <div className="ms_rcnt_box_img">
                                            <img src={artist?.profile_picture} alt={artist?.name} className="img-fluid"/>
                                            <div className="ms_main_overlay">
                                                <div className="ms_box_overlay"/>
                                                <div className="ms_play_icon">
                                                    <img src="/images/svg/play.svg" alt="Play Icon"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ms_rcnt_box_text">
                                            <h3>
                                                <a href="#">{artist?.name}</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="ms_rcnt_box marger_bottom30 text-right">
                                        <CustomSkeleton width={310} height={310}/>
                                        <div className="ms_rcnt_box_text">
                                            <CustomSkeleton width={150} height={30}/>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
export default Artists
