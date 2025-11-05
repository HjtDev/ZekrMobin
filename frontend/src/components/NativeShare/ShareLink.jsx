import React from 'react';
import { toast } from 'react-toastify';

const ShareLink = ({ url, title, text, children, className, style }) => {
    const handleShare = async (e) => {
        e.preventDefault();

        const copyLink = async () => {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('لینک کپی شد.');
            } catch (err) {
                console.error("Copy to clipboard failed:", err);
            }
        };


        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch {
                await copyLink();
            }
        } else {
            await copyLink();
        }
    };

    return (
        <a
            href={url}
            onClick={handleShare}
            className={className}
            style={style}
        >
            {children}
        </a>
    );
};

export default ShareLink;
