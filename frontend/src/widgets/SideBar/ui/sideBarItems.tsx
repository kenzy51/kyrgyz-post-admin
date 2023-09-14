import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode, 
  key: React.Key, 
  icon?: React.ReactNode, 
  children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
export const items: MenuItem[] = [
  getItem(<Link to="/">Главная</Link>, "1", <HomeOutlined />),
  getItem(<Link to="/messages">Непрочитанные</Link>, "2",<ReadOutlined />),
  getItem(<Link to="/processed">Обработанные сообщения</Link>, "3",<ReadOutlined />),
  getItem(<Link to="/createMessage">Создать сообщение</Link>, "4",<ReadOutlined />),
];
