import './Card.scss';
import { useService } from '@/Api/ApiServiceContext';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Checkbox, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Draggable } from '@hello-pangea/dnd';

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id: string;
};

interface Props {
  task: tasksType;
  index?: number;
  disabled?: boolean;
}

const Card: React.FC<Props> = ({ task, index, disabled }) => {
  const { deleteTask, updateTask } = useService();
  const navigate = useNavigate();
  return (
    <Draggable isDragDisabled={disabled} index={index} draggableId={task?.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card ${!disabled && 'move'}`}
        >
          <Row wrap={false} align={'middle'} gutter={[16, 20]}>
            <Col>
              <Checkbox
                checked={task?.completed ? true : false}
                onChange={() => {
                  updateTask(task?.id, {
                    ...task,
                    completed: task?.completed ? false : true,
                  }).then(() => {
                    window.location.reload();
                  });
                }}
              />
            </Col>
            <Col className={`${task?.completed && 'completed'}`} flex={'auto'}>
              {task?.title}
            </Col>
            <Col>
              <Button
                disabled={task?.completed}
                onClick={() => {
                  navigate(`/form/${task?.id}`);
                }}
                icon={<EditFilled />}
                type="link"
              />
            </Col>
            <Col>
              <Button
                disabled={task?.completed}
                onClick={() => {
                  window.location.reload();
                  deleteTask(task?.id);
                }}
                icon={<DeleteFilled />}
                type="link"
              />
            </Col>
          </Row>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
