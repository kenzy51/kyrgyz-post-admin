import { Table, Button } from "antd";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite"; // Import MobX observer
import { messageStore } from "src/shared/store/messages/service/messageStore";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";

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
    const intervalId = setInterval(fetchData, 200000);
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
        // if (message.id === messageId) {
        //   return { ...message, read: true };
        // }
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
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Прочитано",
      dataIndex: "read",
      key: "read",
      render: (read, record) => (
        <span>
          {read ? "Yes" : "Нет"}
          {!read && (
            <Button onClick={() => makeRead(record.id)}>Сделать прочитанным</Button>
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
