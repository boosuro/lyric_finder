import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../../context'

class Search extends Component {

    state = {
        trackTitle : ''
    }
    onChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }

    findTrack = (dispatch,e) => {
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=10&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            const  track_list  = res.data.message.body.track_list;
            const action = {payload:track_list,type:'SEARCH_TRACK',search_item:this.state.trackTitle};
            if (Object.keys(action.payload).length!==0){
                dispatch(action)
            }

            this.setState({trackTitle:''});
        })
        .catch(err => console.log(err))
    }

  render() {

    return (
      <Consumer>
          {
              value =>{
                  const { dispatch  } = value;
                  return(
                      <div className="card card-body mb-4 p-4">
                        <h1 className="display-4 text-center">
                            <i className="fas fa-music"></i> Search for a song
                        </h1>
                        <p className="lead text-center">
                            Get the Lyrics for any song
                        </p>
                        <form onSubmit={this.findTrack.bind(this,dispatch)}>
                            <div className="form-group">
                                <input type="text"
                                name="trackTitle" 
                                className="form-control form-control-lg" 
                                placeholder="song title..." 
                                value={this.state.trackTitle}
                                onChange={this.onChange}
                                />
                            </div>
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Search Track Lyrics</button>
                        </form>
                      </div>
                  );
              }
          }
      </Consumer>
    )
  }
}

export default  Search;