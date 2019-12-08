import React from 'react';

import {
  Row,
  Col,
  Typography,
} from 'antd';

const { Text } = Typography;

const ListItem = (props) => {
  const {
    userData,
    dataResult,
  } = props;

  return (
    <Row>
      <Col span={12}>
        <Text strong>{userData}</Text>
      </Col>
      <Col span={12}>
        {dataResult}
      </Col>
    </Row>
  )
};

export default ListItem;
