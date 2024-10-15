import { useTheme } from '@/Layout/ThemeContext';
import './PageHeader.scss';
import { PageHeader as Header, PageHeaderProps } from '@ant-design/pro-layout';
import { Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const PageHeader: React.FC<PageHeaderProps> = ({ ...props }) => {
  const { toggleTheme } = useTheme();
  return (
    <>
      <Header className="custom-page-header" {...props}>
        <Switch
          unCheckedChildren={<SunOutlined />}
          checkedChildren={<MoonOutlined />}
          onClick={toggleTheme}
        />
      </Header>
    </>
  );
};

export default PageHeader;
