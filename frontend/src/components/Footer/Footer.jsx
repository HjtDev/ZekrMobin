import React, {useEffect, useState} from 'react'
import fetchSettings  from '../../api/settings.js'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import addClubUser from "../../api/club.js";

const Footer = () => {
    const [settings, setSettings] = useState(null);

    const [clubName, setClubName] = useState('');
    const [clubEmail, setClubEmail] = useState('');
    const [clubChanged, setClubChanged] = useState(false);

    const handleClub = async () => {
        if(!clubChanged) {
            toast.warn('لطفا نام و ایمیل خود را وارد کنید.');
            return
        }
        const {success, msg} = await addClubUser(clubName, clubEmail);
        if(success) {
            msg.forEach((element) => {
                toast.success(element);
            });
            setClubName('');
            setClubEmail('');
        } else {
            msg.forEach((element) => {
                toast.error(element);
            });
        }
    }

    const getSettings = async (sections) => {
        const {success, msg, config} = await fetchSettings(sections);
        if(success) {
            setSettings(config);
        } else {
            console.error('Failed to load settings:', msg);
        }
    }
    useEffect(() => {
        getSettings(['logo,footer_content, club, contact', 'social', 'rights']);
    }, []);

    useEffect(() => {
        setClubChanged(clubName.trim() && clubEmail.trim());
    }, [clubName, clubEmail]);

    return (
        <div className="ms_footer_wrapper" style={{marginBottom: 0}}>
            <div className="ms_footer_logo">
                <Link to="/">
                    <img src={settings?.open_logo} alt="Footer Logo"/>
                </Link>
            </div>
            <div className="ms_footer_inner">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box">
                            <h1 className="footer_title">{settings?.footer_title1}</h1>
                            <p>{settings?.footer_text1}</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box footer_app">
                            <h1 className="footer_title">{settings?.footer_title2}</h1>
                            <p>{settings?.footer_text2}</p>
                            {
                                settings?.footer_img1 ?
                                <a href="#" className="foo_app_btn">
                                    <img
                                        src={settings?.footer_img1}
                                        alt="Footer image"
                                        className="img-fluid"
                                    />
                                </a> : null
                            }
                            {
                                settings?.footer_img2 ?
                                    <a href="#" className="foo_app_btn">
                                        <img
                                            src={settings?.footer_img2}
                                            alt="Footer image"
                                            className="img-fluid"
                                        />
                                    </a> : null
                            }
                            {
                                settings?.footer_img3 ?
                                    <a href="#" className="foo_app_btn">
                                        <img
                                            src={settings?.footer_img3}
                                            alt="Footer image"
                                            className="img-fluid"
                                        />
                                    </a> : null
                            }
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box footer_subscribe">
                            <h1 className="footer_title">{settings?.club_title}</h1>
                            <p>{settings?.club_text}</p>
                            <form autoComplete="off">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="نام ..."
                                        autoComplete="off"
                                        name="name"
                                        value={clubName}
                                        onChange={(event) => {
                                            setClubName(event.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="ایمیل ..."
                                        autoComplete="off"
                                        aria-autocomplete="hope"
                                        name="email"
                                        value={clubEmail}
                                        onChange={(event) => {
                                            setClubEmail(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <a type="submit" onClick={handleClub} className="ms_btn text-white" style={{cursor: "pointer"}}>
                                        عضویت در خبرنامه
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box footer_contacts">
                            <h1 className="footer_title">{settings?.contact_us_title}</h1>
                            <ul className="foo_con_info">
                                <li>
                                    <div className="foo_con_icon">
                                        <img src="/images/svg/phone.svg" alt="telephone svg"/>
                                    </div>
                                    <div className="foo_con_data">
                                        <span className="con-title">تلفن های تماس :</span>
                                        <span>{settings?.contact_us_phone}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="foo_con_icon">
                                        <img src="/images/svg/message.svg" alt="Message Us SVG"/>
                                    </div>
                                    <div className="foo_con_data">
                                        <span className="con-title">ایمیل ما :</span>
                                        <span>{settings?.contact_us_email}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="foo_con_icon">
                                        <img src="/images/svg/add.svg" alt="Address SVG"/>
                                    </div>
                                    <div className="foo_con_data">
                                        <span className="con-title">آدرس :</span>
                                        <span>{settings?.contact_us_address}</span>
                                    </div>
                                </li>
                            </ul>
                            <div className="foo_sharing">
                                <div className="share_title"/>
                                <ul>
                                    <li>
                                        <a href={settings?.telegram_link}>
                                            <i className="fa fa-telegram" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={settings?.whatsapp_link}>
                                            <i className="fa fa-whatsapp" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={settings?.facebook_link}>
                                            <i className="fa fa-facebook" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={settings?.linkedin_link}>
                                            <i className="fa fa-linkedin" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={settings?.twitter_link}>
                                            <i className="fa fa-twitter" aria-hidden="true"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*--Copyright--*/}
            <div className="col-lg-12">
                <div className="ms_copyright">
                    <div className="footer_border"/>
                    <p>{settings?.rights_text}</p>
                </div>
            </div>
        </div>
    )
}
export default Footer
