import { Table, Button, Tag, notification, Select, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "src/shared/store/messages/service/messageStore";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";
import { ReadOutlined } from "@ant-design/icons";

export const ProcessedMessagesComponent = observer(() => {
  const { messages } = messageStore;
  const [currentData, setCurrentData]: any = useState([]);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MessageApi.getMessages();
        messageStore.messages = response.data;
        setCurrentData(response.data); // Set current data
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Кому",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Доп информация",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "КУРЬЕР",
      dataIndex: "courier",
      key: "courier",
    },
  ];

  return (
    <div>
        <h1>ОБРАБОТАННЫЕ СООБЩЕНИЯ</h1>
      <Table columns={columns} dataSource={messages} rowKey="id" />
    </div>
  );
});
