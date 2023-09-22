import { Modal } from "antd";
import React from "react";

export const SenderModal = ({ visible, onCancel,sender }) => {
  console.log(sender)
  return (
    <Modal
      open={visible}
      title="Информация отправителя"
      footer={null}
      onCancel={onCancel}
    >
    <h3>Фио:{sender?.who}</h3>
    <h3>Номер телефона:{sender?.phoneNumber}</h3>
    <h3>Адрес: {sender?.address}</h3>
    <h3>Дполнительная информация : {sender?.message}</h3>

    </Modal>
  );
};
