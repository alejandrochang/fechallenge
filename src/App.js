import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';

import UsernameList from './UsernameList';

import {
  Button,
  Input,
  Typography,
  Checkbox,
} from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

class App extends Component {
  state = { value: '', url: '' };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { value } = this.state;
    let data = {
      username: value,
      // checkbox will be tied to individual: boolean
      // individual: true
    };

    // POST request
    axios
      .post('https://fe-test-zyper-engagement.herokuapp.com/start', data)
      .then(res => {
        let url = `https://fe-test-zyper-engagement.herokuapp.com/results/${res.data}`
        this.setState({ url })
      })
      .catch(err => console.log({ err }));
  }

  render() {
    const {
      value,
      url,
    } = this.state;

    return (
      <div className="app">
        <span className="title">Zyper Frontend Challenge</span>
        <div className="container">
          <p><Text strong>Username(s)</Text></p>
          <p>
          <TextArea
            value={value}
            onChange={this.onChange}
            placeholder="Enter a username"
            rows={4}
          />
          </p>
          {/* Add logic to checkbox and event handler for selecting checkbox */}
          <p>
            <Checkbox
              // checked={this.state.checked}
              // disabled={this.state.disabled}
              // onChange={this.onChange}
            >
              Click to list all accounts individually
            </Checkbox>
          </p>
          <Button
            style={{ color: '#fff', backgroundColor: 'rgb(15, 36, 66)' }}
            onClick={this.onSubmit}
            >
            Submit
          </Button>
          <br />
          <br />
          {
            url && <UsernameList url={url}/>
          }
        </div>
      </div>
    );
  }
}

export default App;

