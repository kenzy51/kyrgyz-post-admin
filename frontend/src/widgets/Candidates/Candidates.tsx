import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "src/shared/configs/axios/axiosConfig";
import { COURIERS } from "src/shared/consts/endpoints";

export const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
  
    useEffect(() => {
      api.get(COURIERS)
        .then((response) => {
          setCandidates(response.data);
        })
        .catch((error) => {
          console.error('Error fetching candidates:', error);
        });
    }, []);
  
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'ФИО',
        dataIndex: 'fullName',
        key: 'fullName',
      },
      {
        title: 'Номер телефона',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Принят на работу?',
        dataIndex: 'isAccepted',
        key: 'isAccepted',
        render: (isAccepted) => (isAccepted ? 'Yes' : 'No'),
      },
    ];
  
    return (
      <div>
        <h2>Кандидаты</h2>
        <Table dataSource={candidates} columns={columns} />
      </div>
    );
  };
  