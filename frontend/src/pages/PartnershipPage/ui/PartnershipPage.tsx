import React from "react";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { partnerStore } from "src/shared/store/partnership/service/partnershipStore";
import { PartnerApi } from "src/shared/store/partnership/api/partnershipApi";

export const PartnershipPage = observer(() => {
  // const { partners, fetchPartners } = partnerStore;
  const [partners, setPartners] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PartnerApi.getPartners();
        setPartners(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Director Full Name",
      dataIndex: "directorFullName",
      key: "directorFullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Connection Reason",
      dataIndex: "connectReason",
      key: "connectReason",
    },
  ];

  return (
    <div>
      <h1>Заявки на партнерство</h1>
      <Table dataSource={partners} columns={columns} />
    </div>
  );
});
