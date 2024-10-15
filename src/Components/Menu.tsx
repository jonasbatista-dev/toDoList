import {
  BarChartOutlined,
  ClearOutlined,
  CloseOutlined,
  FileAddOutlined,
  MenuOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import './Menu.scss';

import { useTheme } from '@/Layout/ThemeContext';

import { Button, Menu as MenuAntd } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const items = [
  {
    key: '/',
    icon: <FileAddOutlined />,
    label: 'Nova Tarefa',
  },
  {
    key: '/list',
    icon: <UnorderedListOutlined />,
    label: 'Lista de Tarefas',
  },
  {
    key: '/report',
    icon: <BarChartOutlined />,
    label: 'Relatórios',
  },
];

const Menu: React.FC = () => {
  const { theme, open, setOpen } = useTheme();
  const [openKeys, setOpenKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const filter = (pathname: string, steps: number) =>
    pathname
      .split('/')
      .filter((_, i) => i <= steps)
      .join('/');

  const setKeys = (pathname: string) => {
    const keys = [
      filter(pathname, 1),
      filter(pathname, 2),
      filter(pathname, 3),
    ];
    setOpenKeys(keys);
    setSelectedKeys(keys);
  };

  useEffect(() => setKeys(pathname), [pathname]);
  console.log(open);

  return (
    <>
      <Sider width={open ? '100dvw' : 200} className={`Menu ${open && 'open'}`}>
        <div className="titleMenu">To Do List</div>

        <MenuAntd
          theme={theme === 'light' ? 'light' : 'dark'}
          mode="inline"
          items={items}
          onClick={(value) => {
            setKeys(value?.key);
            navigate(value?.key);
            setOpen(false);
          }}
          onOpenChange={(keys: string[]) =>
            setOpenKeys([keys[keys.length - 1]])
          }
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        ></MenuAntd>
        {open && (
          <Button
            className="close"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            type="link"
          />
        )}
      </Sider>
    </>
  );
};

export default Menu;
