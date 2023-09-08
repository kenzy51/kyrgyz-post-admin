import { Table } from "antd";
import { useEffect, useState } from "react";
import { api } from "src/shared/configs/axios/axiosConfig";
import { COURIERS } from "src/shared/consts/endpoints";

export const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
  
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get(COURIERS);
          setCandidates(response.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
      fetchData();
      const intervalId = setInterval(fetchData, 200000000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };
  
  
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Дата поступления',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => <p>{formatDate(date)}</p>,
      }, 
      //  {
      //   title: 'Время',
      //   dataIndex: 'createdAt',
      //   key: 'createdAt',
      //   render:(date)=> (<p>{date.slice(10,16)}</p>)
      // },
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
        render: (isAccepted) => (isAccepted ? 'ДА' : 'нет'),
      },
    ];
  
    return (
      <div>

        {/* <h2>Кандидаты</h2>   */}
        <Table dataSource={candidates} columns={columns} />
      </div>
    );
  };
  