import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends React.Component {
  state = {
    isLoading: false,
    users: [],
    error: null
  };

  fetchUsers() {
    fetch(`https://kishorkunal-work.github.io/SampleJson/React/namelist.json`)
      .then(response => response.json())
      .then(data => {
        //this.state.users = data //will not trigger dom changes
        this.setState({
          users: data,
          isLoading: false,
        })

        console.log(data);
        console.log(this.state)
      }
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <Hello name="from hello js"/>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map(user => {
            const { username, name, email } = user;
            return (
              <div key={username}>
                <p>Name: {name}</p>
                <p>Email Address: {email}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));