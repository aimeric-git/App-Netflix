import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearchBar : '',
            placeHolder : 'tapez votre recherche ici ...',
            lockRequest: false,
            intervalBeforeRequest: 1000
        }
    }

    handleOnKeyUp(e) {
        this.setState({
            textSearchBar : e.target.value,
            lockRequest: true
        });
        setTimeout(function() {
            this.search()
        }.bind(this), this.state.intervalBeforeRequest)
    }
    handleOnClick() {
        this.search();
    }
    search() {
        this.props.callback(this.state.textSearchBar);
        this.setState({
            lockRequest: false
        })
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    onKeyUp={this.handleOnKeyUp.bind(this)}
                    placeholder={this.state.placeHolder} />
                <button 
                    onClick={this.handleOnClick.bind(this)} >Search</button>
                <br />
                <p>{this.state.textSearchBar}</p>
            </div> 
        )
    }
}

export default SearchBar; 