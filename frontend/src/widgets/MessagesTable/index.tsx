/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button, Tag, notification } from "antd";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "src/shared/store/messages/service/messageStore";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";
import { ModalComponent } from "src/shared/ui/ModalMessage/Modal";
import { SenderModal } from "src/shared/ui/SenderInfo/SenderModal";

const MessagesComponent = observer(() => {
  const { messages } = messageStore;
  const [currentData, setCurrentData]: any = useState([]);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // for modal
  const [selectedItemId, setSelectedItemId] = useState(null);
  // FOR SENDER INFORMATION
  const [modalSender, setModalSender] = useState(false);
  const [senderData, setSenderData]: any = useState(null); // Store sender data
  //

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

  useEffect(() => {
    const newData = messageStore.messages;
    const addedItems = newData.filter(
      (item) => !currentData.some((existingItem) => existingItem.id === item.id)
    );

    if (addedItems.length > 0) {
      notification.success({
        message: "НОВОЕ СООБЩЕНИЕ",
        description: "ВЫ ПОЛУЧИЛИ СООБЩЕНИЕ(ПОСЫЛКУ).",
      });
    }

    setCurrentData(newData);
  }, []);

  const handleConfirm = async () => {
    try {
      const selectedMessageIds = selectedRowKeys.map((key) => key);
      const updatedMessages = messages.map((message) => {
        if (selectedMessageIds.includes(message.id)) {
          return { ...message, read: true };
        }
        return message;
      });

      await MessageApi.makeMessageRead(updatedMessages);
      messageStore.messages = updatedMessages;
      setSelectedRowKeys([]);
      notification.success({
        message: "Messages Marked as Read",
        description: "Selected messages have been marked as read.",
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const filteredMessages = messages.filter((m: any) => !m.read);
  const reversedFilteredMessages = [...filteredMessages].reverse();
  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric',  };
    // @ts-ignore
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const columns = [
    {
      title: "ID сообщения",
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
      title: "Габарит",
      dataIndex: "size",
      key: "size",
    },

    {
      title: "Обработать",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <>
            <Button
              onClick={() => {
                setSelectedItemId(id);
                setModalVisible(true);
              }}
            >
              Обработать
            </Button>
          </>
        );
      },
    },
    {
      title: "Обработано?",
      dataIndex: "read",
      key: "read",
      render: (read) => (
        <div className="">
          {read ? <Tag color="green">Да</Tag> : <Tag color="red">Нет</Tag>}
        </div>
      ),
    },
    {
      title: "Отправитель",
      dataIndex: "sender",
      key: "sender",
      render: (sender) => (
        <Button
          onClick={() => {
            setSenderData(sender);
            setModalSender(true);
          }}
        >
          Подробнее
        </Button>
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDate(createdAt), // Format the date
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleConfirm}>
        Подтвердить
      </Button>
      <ModalComponent
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        selectedItemId={selectedItemId}
      />
      <Table columns={columns} dataSource={reversedFilteredMessages} rowKey="id" />
      <SenderModal
        visible={modalSender}
        onCancel={() => setModalSender(false)}
        sender={senderData}
      />
    </div>
  );
});

export default MessagesComponent;