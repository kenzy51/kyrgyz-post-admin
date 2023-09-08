import { Modal } from "antd";
import React from "react";

export const SenderModal = ({ visible, onCancel }) => {
  return (
    <Modal
      open={visible}
      title="Информация отправителя"
      footer={null}
      onCancel={onCancel}
    >
    <h3>ФИО :Канат Петр</h3>
    <h3>Номер телефона:+99650040030</h3>
    <h3></h3>

    </Modal>
  );
};
