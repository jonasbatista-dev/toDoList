import Chart from '@/Components/Chart';
import Content from '@/Components/Content';
import PageHeader from '@/Components/PageHeader';
import { useMain } from '@/Layout/MainContext';

import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id: string;
};

const Report: React.FC = () => {
  const [data, setData] = useState<tasksType[]>([]);
  const { getTasks } = useMain();

  const handleData = () => {
    getTasks().then((resp: tasksType[]) => {
      return setData(resp);
    });
  };

  useEffect(() => {
    handleData();
    console.log(data);
  }, []);
  return (
    <>
      <PageHeader title="Relatórios" />
      <Content type="chart">
        <Row align={'middle'} gutter={[16, 20]}>
          <Col span={24}>
            <Chart tasks={data} />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Report;
