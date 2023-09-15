import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { api } from "src/shared/configs/axios/axiosConfig";
import { COURIERS } from "src/shared/consts/endpoints";
import { CandidateModal } from "./CandidateModal";

export const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(COURIERS);
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 20000000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const filteredCandidates = candidates.filter(
    (candidate: any) => !candidate?.isAccepted
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const openMessagingApp = (phoneNumber) => {
    const whatsappUri = `whatsapp://send?phone=${phoneNumber}`;

    window.location.href = whatsappUri;
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Дата поступления",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <p>{formatDate(date)}</p>,
    },
    //  {
    //   title: 'Время',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    //   render:(date)=> (<p>{date.slice(10,16)}</p>)
    // },
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) => (
        <div className="">
          {phoneNumber}
          <br />
          <Button type="primary" onClick={() => openMessagingApp(phoneNumber)}>
            Отправить SMS
          </Button>
        </div>
      ),
    },
    {
      title: "Принят на работу?",
      dataIndex: "isAccepted",
      key: "isAccepted",
      render: (isAccepted) => (isAccepted ? "ДА" : "нет"),
    },
    {
      title: "Оформить на работу",
      dataIndex: "",
      key: "",
      render: (id: any) => (
        <div className="">
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              setSelectedItemId(id);
            }}
          >
            Оформить кандитата
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Список непринятых на работу курьеров(кандидаты)</h2>
      <Table dataSource={filteredCandidates} columns={columns} />
      <CandidateModal
        onCancel={() => setVisible(false)}
        visible={visible}
        selectedId={selectedItemId}
      />
    </div>
  );
};
