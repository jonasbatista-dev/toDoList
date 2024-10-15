import Content from '@/Components/Content';
import PageHeader from '@/Components/PageHeader';
import { useMain } from '@/Layout/MainContext';
import { Button, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddTasks: React.FC = () => {
  const { addTask, getTasks, updateTask } = useMain();
  const [form] = useForm();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      getTasks().then((resp) => {
        resp?.map((item) => {
          if (item?.id === id) {
            form.setFieldsValue(item);
          }
        });
      });
    }
  }, [id]);

  const onFinish = async ({ title, order }) => {
    try {
      (await id)
        ? updateTask(id, { title, order: Number(order), completed: false })
        : addTask({ title, order: Number(order), completed: false });
      window.location.href = '/list';
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PageHeader title="Nova tarefa" />
      <Content>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row align={'middle'} justify="center" gutter={[16, 0]}>
            <Col md={16} lg={20} span={24}>
              <Form.Item
                name="title"
                label="Descrição da tarefa"
                required
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col md={8} lg={4} span={24}>
              <Form.Item
                name="order"
                label="Ordem"
                normalize={(value) => value.replace(/\D/g, '')}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col md={8} lg={4} span={24}>
              <Button size="large" htmlType="submit" type="primary">
                Salvar
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>
    </>
  );
};

export default AddTasks;
