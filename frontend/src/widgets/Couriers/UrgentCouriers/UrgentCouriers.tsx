import {  Table } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import { candidateStore } from "src/shared/store/candidates/service/candidateStore";

export const UrgentCouriers = observer(() => {
  const { candidates } = candidateStore;
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
  ];

  return (
    <div>
        <h3>Список срочных курьеров</h3>
      <Table dataSource={filteredCandidates} columns={columns} />
    </div>
  );
});
