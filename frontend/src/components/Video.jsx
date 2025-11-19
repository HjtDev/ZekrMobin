import React, {useEffect, useState} from 'react'
import { getSectionData } from '../api/section-data.js';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { PlayIcon, PauseIcon, ReplayIcon } from "@vidstack/react/icons";
import PERSIAN from "../assets/js/player-translation.js";

const Video = () => {
    const [pageData, setPageData] = useState(null);

    const isMobile = window.innerWidth <= 768;

    const fetchVideo = async () => {
        const { success, data } = await getSectionData(8);
        if(success) {
            setPageData(data);
        }
    }

    useEffect(() => {
        fetchVideo();
    }, [])
    return (
        <div className="d-flex justify-content-center align-content-center" style={{ marginTop: "20rem", marginBottom: "40rem" }}>
            <MediaPlayer
                title={pageData?.title}
                autoPlay={false}
                controls={false}
                fullscreenOrientation={false}
                playsInline={true}
                style={{
                    width: isMobile ? '100%' : '50%',
                }}
                onPointerDown={(e) => {
                    const startY = e.clientY;
                    const handleMove = (moveEvent) => {
                        if (Math.abs(MouseEvent.clientY - startY) > 5) {
                            e.preventDefault();
                        }
                        document.removeEventListener('pointermove', handleMove);
                    }
                    document.addEventListener('pointermove', handleMove);
                }}
                src={{
                    src: pageData?.content,
                    type: 'video/mp4',
                    label: pageData?.title
                }}
            >
                <MediaProvider/>
                <PlyrLayout
                    icons={{
                        ...plyrLayoutIcons,
                        Play: PlayIcon,
                        Pause: PauseIcon,
                        Restart: ReplayIcon
                    }}
                    // thumbnails={post?.thumbnail}
                    translations={PERSIAN}
                    clickToFullscreen={true}
                    clickToPlay={true}
                />
            </MediaPlayer>
        </div>
    )
}
export default Video
