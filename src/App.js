import './App.css';
import axios from 'axios';
import React,{Component} from 'react';
import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import Video from './components/video';
import VideoList from './containers/video-list';

const API_KEY = 'api_key=ce76e963bb31ecd99fc6446a5731f2d6';
const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: {},
			currentMovie: {}
		}
	}
	componentDidMount(){
		this.initMovies();
		
	}

	initMovies() {
		axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then((response) => {
			this.setState({
				movieList: response.data.results.slice(1, 6),
				currentMovie: response.data.results[0]
			}, () => {
				this.applyVideoToCurrentMovie();
			})
		})
		console.log(this.state.movieList)
	}

	onClickSearch(searchText) {
		axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then((response) => {
			if(searchText) 
			{
				if(response.data && response.data.results[0])
					{
						if(this.state.currentMovie.id != response.data.results[0].id)
						{
							this.setState({
								currentMovie: response.data.results[0]
							}, () => {
								this.applyVideoToCurrentMovie();
								this.setRecommendation();
							})
						}
					}
			}
		})
	}

	setRecommendation(){
		axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(response){
            this.setState({
                movieList : response.data.results.slice(0, 5)
            });
        }.bind(this));
	}

	applyVideoToCurrentMovie() {
		axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response) {
			let youtubeKey = response.data.videos.results.key;
			let newCurrentMovie = this.state.currentMovie;
			newCurrentMovie.movieId = youtubeKey; 
			this.setState({
				currentMovie: newCurrentMovie
			});
			
		}.bind(this));
	}

	receiveCallbackVideoList(movie) {
		this.setState({
			currentMovie: movie
		}, () => {
			this.applyVideoToCurrentMovie();
			this.setRecommendation()
		})
	}
	render() {
		const renderVideoList = () => {
			if(this.state.movieList.length >= 5)
			{
				return <VideoList 
						movieLi={this.state.movieList}
						callback={this.receiveCallbackVideoList.bind(this)} />
			}
		}
		return (
			<div>
				<h1>Hello World</h1>
				<SearchBar
					callback={this.onClickSearch.bind(this)} />

				<Video
					videoId={this.state.currentMovie.id} />
				<VideoDetail
					title={this.state.currentMovie.title}
					description={this.state.currentMovie.overview} />
				<div>
					{renderVideoList()}
				</div>
			</div>
		)
	}
}
export default App;
