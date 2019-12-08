import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';

import {
  List,
  Spin,
  Card,
} from 'antd';

class UsernameList extends Component {
  state = { data: {}, loading: true };

  // trying to set a conditional so component updates on prop change
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.url === nextProps.url;
  // }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    const { url } = this.props;
    // request to get users details
    axios.get(url)
    .then(res => {
      // response lags, so request again until data is returned
      if (res.status === 200) {
        this.setState({
          loading: false,
          data: res.data,
        });
      } else {
        this.getUserInfo();
      }
    })
    .catch(err => console.log({ err }));
  }

  render() {
    const {
      data: newData,
      loading,
    } = this.state;

    let values = Object.values(newData);
    if (loading) {
      return (
        <div className="loading">
          <Spin />
        </div>
      )
    }

    return (
     <Card style={{ padding: '30px 200px 30px 200px' }}>
      <List
        style={{ padding: '24px'}}
        size="small"
        header={<p>Results</p>}
        bordered
        dataSource={values}
        renderItem={item =>  {
          let output = item.output;
          let formatedEntries = Object.entries(output).reduce((acc, curr) => {
              let key = curr[0];
              let val = curr[1];
              acc.push([key, val ]);
              return acc;
            }, []);

            return formatedEntries.map((entry, idx) => {
              const userData = entry[0];
              const dataResult = entry[1];
              return (
                <ListItem key={`${idx} - ${dataResult}`}userData={userData} dataResult={dataResult}/>
              )
            })
        }}
      />
    </Card>
    );
  }
};

export default UsernameList;