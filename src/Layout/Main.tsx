import React from 'react';

import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import Menu from '@/Components/Menu';
import RoutesMain from '@/Routes';
import { MainProvider } from './MainContext';
import { MenuOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const { theme, setOpen, open } = useTheme();

  return (
    <MainProvider>
      <Layout className={`app ${theme}`}>
        <Button
          className={`openMenu ${open && 'none'}`}
          icon={<MenuOutlined size={33} />}
          onClick={() => setOpen(true)}
          type="link"
        />
        <Menu />
        <Layout>
          <RoutesMain />
        </Layout>
      </Layout>
    </MainProvider>
  );
};

export default App;
