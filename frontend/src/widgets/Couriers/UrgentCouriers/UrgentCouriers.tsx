import {  Button, Table } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect,useState } from "react";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import { candidateStore } from "src/shared/store/candidates/service/candidateStore";
import AboutCourierModal from "../AboutCourier/AboutCourierModal";

export const UrgentCouriers = observer(() => {
  const { candidates } = candidateStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourierId, setSelectedCourierId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CandidatesApi.getCandidates();
        candidateStore.candidates = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 200000000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const filteredCandidates = candidates.filter(
    (candidate: any) => candidate.isUrgent
  );
  const openModal = (id) => {
    setSelectedCourierId(id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCourierId(null);
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (record) => {
        return (
          <Button onClick={() => openModal(record.id)}>
            Подробнее о курьере
          </Button>
        );
      },
    },
  ];

  return (
    <div>
        <h3>Список срочных курьеров</h3>
      <Table dataSource={filteredCandidates} columns={columns} />
      <AboutCourierModal
        courierId={selectedCourierId}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
    </div>
  );
});
