import React from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
    const {film} = props;
    return (
        <div> 
            <img src={`${IMAGE_BASE_URL}${film.poster_path}`} 
                onClick={handleOnClick}
                height='100px' width='100px' />
            <h5>{film.title}</h5>
        </div> 
    )
    function handleOnClick() {
        props.callback(film);
    }
}

export default VideoListItem;