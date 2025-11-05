import { toast } from 'react-toastify';
import likePost from '../../api/like.js';
import downloadPost from '../../api/download.js';
import getPost from '../../api/post.js';
import { useAuth } from '../../contexts/AuthContext.jsx';


const quickAction = async (postID, action, isLoggedIn) => {
    if(!postID) {
        toast.error("مشکلی پیش آمد لطفا بعدا تلاش کنید.");
        console.error("Send a valid postID before trying to like");
        return
    }
    if(!["like", "download", "share"].includes(action)) {
        toast.error("مشکلی پیش آمد لطفا بعدا تلاش کنید.");
        console.error("Use a valid action [like, download, share]: ", action);
        return
    }

    if(action === "like") {
        if(!isLoggedIn) {
            toast.warning("ابتدا یک حساب کاربری بسازید.");
            return
        }
        const { success, msg } = await likePost(postID);
        msg.forEach((message) => {
            if(success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
        return
    }

    if (action === "download") {
        const { success, msg, links } = await downloadPost(postID);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        if (success) {
            msg.forEach((message) => {
                toast.success(message);
            });

            await delay(1000);

            for (const link of links) {
                const a = document.createElement("a");
                a.href = link;
                a.download = "";
                a.target = "_blank";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                await delay(200);
            }
        } else {
            msg.forEach((message) => {
                toast.error(message);
            });
        }
        return
    }

    if(action === "share") {
        const { success, post } = await getPost(postID, true);
        if(!success) {
            toast.error("اشتراک گزاری امکاتن پذیر نمی باشد.");
            return
        }
        const url = `${window.location.origin}/?play=${post.id}`;
        const title = post.title;
        const text = post.title;

        const copyLink = async () => {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('لینک کپی شد.');
            } catch (err) {
                console.error("Copy to clipboard failed:", err);
            }
        };

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobile && navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch {
                await copyLink();
            }
        } else {
            await copyLink();
        }
    }
}


const LikeButton = ({ postID, callAfterAction }) => {
    const { isLoggedIn } = useAuth();
    return (
        <li>
            <a
                href="#"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    quickAction(postID, "like", isLoggedIn);
                    if(callAfterAction) {
                        callAfterAction(postID);
                    }
                }}
            >
                <span className="opt_icon">
                    <span className="icon icon_fav" />
                </span>
                علاقه مندی ها
            </a>
        </li>
    );
};

const DownloadButton = ({ postID }) => {
    const { isLoggedIn } = useAuth();
    return (
        <li>
            <a
                href="#"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    quickAction(postID, "download", isLoggedIn);
                }}
            >
                <span className="opt_icon">
                    <span className="icon icon_dwn" />
                </span>
                دانلود
            </a>
        </li>
    );
};

const ShareButton = ({ postID }) => {
    const { isLoggedIn } = useAuth();
    return (
        <li>
            <a
                href="#"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    quickAction(postID, "share", isLoggedIn);
                }}
            >
                <span className="opt_icon">
                    <span className="icon icon_share" />
                </span>
                اشتراک
            </a>
        </li>
    );
};


export { quickAction, LikeButton, DownloadButton, ShareButton };
