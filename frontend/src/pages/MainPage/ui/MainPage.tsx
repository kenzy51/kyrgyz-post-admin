import { Tabs, TabsProps } from "antd";
import { Candidates } from "src/widgets/Couriers/Candidates/Candidates";
import { NotUrgentCouriers } from "src/widgets/Couriers/NotUrgentCouriers/NotUrgentCouriers";
import { UrgentCouriers } from "src/widgets/Couriers/UrgentCouriers/UrgentCouriers";

export const MainPage = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "СРОЧНЫЕ",
      children: <UrgentCouriers/>,
    },
    {
      key: "2",
      label: "НЕСРОЧНЫЕ",
      children: <NotUrgentCouriers/>,
    },
    {
      key: "3",
      label: "КАНДИДАТЫ",
      children: <Candidates/>,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};
