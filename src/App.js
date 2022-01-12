import React, { useDebugValue } from 'react';
import axios from 'axios';
import User from './components/User';
import FollowersList from './components/FollowerList';


class App extends React.Component {
  state = {
    currentUser : 'shahwahidy',
    gitUser : {},
    followers: [],
  }
  componentDidMount(){
    axios.get(`https://api.github.com/users/${this.state.currentUser}`)
    .then((res) => {
      this.setState({
        ...this.state,
        gitUser: res.data
      })
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.gitUser != prevState.gitUser){
      axios.get(`https://api.github.com/users/${this.state.currentUser}/followers`)
      .then((res) => {
        this.setState({
          ...this.state,
          followers: res.data
        })
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      currentUser: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked')
    axios.get(`https://api.github.com/users/${this.state.currentUser}`)
    .then((res) => {
      this.setState({
        ...this.state,
        gitUser: res.data
      })
    })
  }
  render() {
    return(<div>
      <h1>GITHUB INFO</h1>
      <form onSubmit={this.handleSubmit}>
        <input placeholder='Github Handle' onChange={this.handleChange}/>
        <button>Search</button>
      </form>
      <User user={this.state.gitUser}/>
      <FollowersList followers={this.state.followers}/>
    </div>);
  }
}

export default App;
