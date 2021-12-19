import React from 'react';
import VideoListItem from '../components/video-list-item';

const VideoList = (props) => {
    const {movieLi} = props;

    return (
        <div>
            <ul>
                {
                    movieLi.map((movie) => {
                        return <VideoListItem
                            key={movie.id}
                            film={movie}
                            callback={receiveCallback} />
                    })
                }
            </ul>
        </div>
    )
    function receiveCallback(movie){
        props.callback(movie)
    }
}

export default VideoList; 