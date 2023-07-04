import React, { useRef ,useState,useEffect } from "react";

function DisplayVideo(props) {
    let [play_video,set_play_video] = useState({})
    useEffect(() => {
        set_play_video(props.video.video)
    },[props])
    return (  
        <div className="" key={props.video.id}>
            <div className="fs-2  ms-lg-5 ms-md-3 mb-3 mt-2">{props?.video?.title}</div>
            {play_video && (
                <div className="ms-lg-5 me-lg-5 ms-md-3 mb-4">
                    <video width="100%" className="rounded text-center" controls >
                        <source src={play_video} type="video/mp4" controls="controls" controlsList="nofullscreen nodownload" />
                    </video>
                </div> 
            )}
        </div>
    );
}

export default DisplayVideo;