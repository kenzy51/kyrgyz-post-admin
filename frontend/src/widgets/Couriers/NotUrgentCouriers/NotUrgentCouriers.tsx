import { Button, Popconfirm, Table } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import { candidateStore } from "src/shared/store/candidates/service/candidateStore";

export const NotUrgentCouriers = observer(() => {
  const { candidates, updateCourier } = candidateStore;
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
    (candidate: any) => candidate.isAccepted && !candidate.isUrgent
  );

  const handleClick = async (id: number) => {
    try {
      await updateCourier(id, { isUrgent: true });
    } catch (e) {
      console.log(e, "error ");
    }
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
      title: "",
      dataIndex: "",
      key: "",
      render: (record) => {
        if (record?.isUrgent === false) {
          return (
            <Popconfirm
              title="Вы уверены, что хотите перевести курьера в срочный порядок?"
              onConfirm={() => handleClick(record.id)}
              cancelText="Отмена"
              okText="Да"
            >
              <Button type="primary">Перевести в срочного курьера</Button>
            </Popconfirm>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Table dataSource={filteredCandidates} columns={columns} />
    </div>
  );
});
