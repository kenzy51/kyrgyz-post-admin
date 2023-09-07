import { Table, Button, Tag, Popconfirm } from "antd";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "src/shared/store/messages/service/messageStore";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";
import { ReadOutlined } from "@ant-design/icons";

const MessagesComponent = observer(() => {
  const { messages } = messageStore;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MessageApi.getMessages();
        messageStore.messages = response.data;
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

  const makeRead = async (messageId) => {
    try {
      const payload = {
        messageId: messageId,
      };

      await MessageApi.makeMessageRead(payload);
      const updatedMessages = messages.map((message) => {
        if (message.id === messageId) {
          return { ...message, read: true };
        }
        return message;
      });
      messageStore.messages = updatedMessages;
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Сообщение",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "ОБРАБОТАНО",
      dataIndex: "read",
      key: "read",
      render: (read, record) => (
        <span>
          {read ? <Tag color="green">Да</Tag> : <Tag color="red">Нет</Tag>}
          {!read && (
            <Popconfirm title="ВЫ УВЕРЕНЫ ЧТО ХОТИТЕ ОБРАБОТАТЬ?" onConfirm={() => makeRead(record.id)} cancelText='ОТМЕНА' okText='ДА'  >
              <Button type="primary">
                <ReadOutlined />
              </Button>
            </Popconfirm>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={messages} rowKey="id" />
    </div>
  );
});

export default MessagesComponent;
