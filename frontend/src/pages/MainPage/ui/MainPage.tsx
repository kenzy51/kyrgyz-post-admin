import { Tabs, TabsProps } from "antd";
import { Candidates } from "src/widgets/Candidates/Candidates";

export const MainPage = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "СРОЧНЫЕ",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "НЕСРОЧНЫЕ",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "КАНДИДАТЫ",
      children: <Candidates/>,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};
