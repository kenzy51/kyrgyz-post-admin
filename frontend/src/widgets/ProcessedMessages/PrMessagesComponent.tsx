/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "src/shared/store/messages/service/messageStore";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";

export const ProcessedMessagesComponent = observer(() => {
  const { messages } = messageStore;
  const [setCurrentData]: any = useState([]);
  const [searchText, setSearchText] = useState(""); 


  const handleSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MessageApi.getMessages();
        messageStore.messages = response.data;
        setCurrentData(response.data);
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
  const filteredMessages = messages.filter((m) => {
    // Check if the message is read
    if (!m.read) return false;
  
    // Check if 'id' and 'fullname' properties exist and include the searchText
    const idIncludesSearchText = m.id && m.id.toString().includes(searchText);
    const fullnameIncludesSearchText = m.fullname && m.fullname.includes(searchText);
  
    // Include the message in the filtered list if either condition is true
    return idIncludesSearchText || fullnameIncludesSearchText;
  });
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
      title: "Область",
      dataIndex: "region",
      key: "region",
      render: (region) => {
        let color;
        switch (region) {
          case "issyk":
            color = "blue";
            break;
          case "naryn":
            color = "green";
            break;
          case "batken":
            color = "red";
            break;
          case "chui":
            color = "gold";
            break;
          case "osh":
            color = "purple";
            break;
          case "talas":
            color = "cyan";
            break;
          case "djalal":
            color = "magenta";
            break;
          default:
            color = "default";
            break;
        }

        return (
          <Tag color={color} key={region}>
            {region === "issyk"
              ? "Иссык-куль"
              : region === "naryn"
              ? "Нарын"
              : region === "batken"
              ? "Баткен"
              : region === "chui"
              ? "Чуй"
              : region === "osh"
              ? "Ош"
              : region === "talas"
              ? "Талас"
              : region === "djalal"
              ? "Джалал-абад"
              : ""}
          </Tag>
        );
      },
    },
    {
      title: "КУРЬЕР",
      dataIndex: "courier",
      key: "courier",
      render: (courier) => (
        <div className="">
          {courier ? <h4>{courier?.fullName}</h4> : "Отсутствует курьер"}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>ОБРАБОТАННЫЕ СООБЩЕНИЯ</h1>
      <Input
        placeholder="Введите ID или Кому"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredMessages} rowKey="id" />
    </div>
  );
});
