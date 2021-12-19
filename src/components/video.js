import React from 'react';

const BASE_URL = "https://www.youtube.com/embed/";


const Video = (props) => {
    const {videoId} = props;
    return (
        <div>
            <iframe
                src={`${BASE_URL}${videoId}`} />
        </div>
    )
}

export default Video; 