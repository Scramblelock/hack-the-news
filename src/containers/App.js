import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation'; 
import TopCommenters from '../components/TopCommenters/TopCommenters'; 
import TopStories from '../components/TopStories/TopStories'; 

import axios from 'axios';

import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      topStoryIds: [],
      topStoriesData:[],
      stories: [],
      isStories: false,
      commenters: [], 
      topCommenters: [], 
      isTopCommenters: false
    };
  }

  componentDidMount() {
    this.getTopStoryIds().then(() => {
      this.getTopStoriesData().then(() => {
        this.getCommenters().then(() => {
          this.getTopCommenters();
        });
      });
    });  
  }

  getTopStoryIds = () => {
    return new Promise((resolve, reject) => {
      axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then((response) => {
        const topStoryIds = response.data.slice(0, 30);
        return this.setState({ topStoryIds }, () => { resolve(); })
       })
    })
  }

  getTopStoriesData = () => {
    return new Promise((resolve, reject) => {
      const topStoriesData = [];
      this.state.topStoryIds.forEach((id) => {
        topStoriesData.push(
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        )
      });
      axios.all(topStoriesData)
        .then((response) => {
          const data = response.map(response => response.data);
          const stories = response.map(response => response.data.title);
          return this.setState({ 
            topStoriesData: data, 
            stories, 
            isStories: true
          }, () => { resolve(); });
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
            reject();
        });
    });
  }

  getCommenters = () => {
    return new Promise((resolve, reject) => {  
      const commenterIds = [];
      const commenterData = [];
      const commenters = [];
      this.state.topStoriesData.forEach((data) => {
        if (data.kids) {
          data.kids.forEach((commentId) => {
            commenterIds.push(commentId);
          });
        }
      });
      commenterIds.forEach((id) => {
        commenterData.push(
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );  
      });
      axios.all(commenterData)
        .then((comments) => {
          comments.forEach((comment) => {
            if (comment.data.by) {
              if (!commenters[comment.data.by]) {
                commenters[comment.data.by] = 0;
              }
              commenters[comment.data.by] += 1;
            }
          });
          return this.setState({ commenters }, () => { resolve(); });
        })
        .catch((error) => {
          console.log('Error fetching and parsing data', error);
          reject();
        })
    })
  }

  getTopCommenters = () => {
    const commenters = this.state.commenters;
    const sortedCommenters = [];
    for (let key in commenters) {
      sortedCommenters.push([key, commenters[key]]);
    }
    sortedCommenters.sort((a, b) => {
      a = a[1];
      b = b[1];
      return a > b ? -1 : (a < b ? 1 : 0);
    });
    const topCommenters = sortedCommenters.slice(0, 10);
    return this.setState({ topCommenters, isTopCommenters: true });
  }

  reloadPage = () => {
  return window.location.reload()
  }
  
  render() {
    const { isStories, stories, isTopCommenters, topCommenters } = this.state;
    return (
      <div className="App">
        <Navigation reloadPage={this.reloadPage}/>
        <h1 className="headerTitle">Welcome to Hack The News.</h1> 
        <p>Here we list the Top 30 news stories from Hacker News and the Top 10 commenters from those stories.</p>
        <TopStories 
          isStories={isStories}
          stories={stories}          
        />
        <TopCommenters 
          isTopCommenters={isTopCommenters}
          topCommenters={topCommenters}   
        />
      </div>
    );
  }
}

export default App;
