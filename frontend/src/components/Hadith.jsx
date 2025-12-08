import {useEffect, useState} from "react";
import fetchHadith from '../api/hadith.js';
import '../assets/css/Hadith.css'
import CustomSkeleton from "./CustomSkeleton.jsx";


const Hadith = () => {
    const [showComponent, setShowComponent] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [hadith, setHadith] = useState(null);

    const loadHadith = async () => {
        setIsLoading(true);
        const { success, hadith } = await fetchHadith();
        if (success) {
            setHadith(hadith);
        } else {
            console.error("Hadith api is not available the section will be invisible");
            setShowComponent(null);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadHadith();
    }, []);

    return showComponent && (
        <div className="ms_advr_wrapper">
            <div className="ms_heading w-100 text-center">
                <h1 className="">حدیث روز</h1>
                <span className="ms_heading_underline" aria-hidden="true"></span>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="hadith-image-container">
                            <img
                                src="/images/hadith.jpg"
                                alt="Hadith Background"
                                className="img-fluid hadith-background-image"
                            />
                            <div className="hadith-overlay">
                                <div className="hadith-content px-2 px-md-3 px-lg-4">
                                    <div className="hadith-date">
                                    <span className="gregorian-date d-block fs-6 fs-md-5">
                                        {hadith?.title || (<CustomSkeleton width="150px" height="20px" />)}
                                    </span>
                                        <span className="hijri-date d-block fs-5 fs-md-4 fw-semibold">
                                        {hadith?.narrator || (<CustomSkeleton width="125px" height="20px" />)}
                                    </span>
                                    </div>

                                    <div className="hadith-text my-2 my-md-3">
                                        <p className="hadith-arabic fs-3 fs-md-2 fs-lg-1 lh-base">
                                            {hadith?.arabic_text || <CustomSkeleton width="300px" height="40px" />}
                                        </p>
                                        <p className="hadith-translation fs-6 fs-md-5 lh-sm">
                                            {hadith?.translation || <CustomSkeleton width="200px" height="20px" />}
                                        </p>
                                    </div>

                                    <div className="hadith-reference">
                                        <span className="source fs-6 fs-md-5">{hadith?.source || <CustomSkeleton width="100px" height="20px" />}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hadith
