import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, Descriptions, Divider } from 'antd';
import { CandidatesApi } from 'src/shared/store/candidates/api/candidatesApi';

const AboutCourierModal = ({ courierId, closeModal, isModalVisible }) => {
  const [courierDetails, setCourierDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourierDetails = async () => {
      try {
        const response = await CandidatesApi.getCourierById(courierId); // Replace with your API call
        setCourierDetails(response.data);
      } catch (error) {
        console.error('Error fetching courier details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courierId) {
      fetchCourierDetails();
    }
  }, [courierId]);

  return (
    <Modal
    open={isModalVisible}
    onCancel={closeModal}
    footer={[
      <Button key="close" onClick={closeModal}>
        Закрыть
      </Button>,
    ]}
  >
    {loading ? (
      <Spin size="large" />
    ) : (
      <Descriptions
        title="Информация о курьере"
        bordered
        layout="vertical"
        column={1}
      >
        <Descriptions.Item label="ФИО">{courierDetails?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Номер телефона">{courierDetails?.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Telegram">{courierDetails?.telegram}</Descriptions.Item>
        <Descriptions.Item label="Паспортные данные">{courierDetails?.passportData}</Descriptions.Item>
        <Descriptions.Item label="Дата рождения">{courierDetails?.dateOfBirth.slice(0,10)}</Descriptions.Item>
        <Descriptions.Item label="Адрес проживания">{courierDetails?.addressOfLiving}</Descriptions.Item>
        <Descriptions.Item label="Адрес по прописке">{courierDetails?.addressByPropise}</Descriptions.Item>
        <Descriptions.Item label="ИНН">{courierDetails?.inn}</Descriptions.Item>
        <Descriptions.Item label="Номер паспорта">{courierDetails?.numberOfPassport}</Descriptions.Item>
        <Descriptions.Item label="Кем выдан паспорт">{courierDetails?.whoPassport}</Descriptions.Item>
        <Descriptions.Item label="Дата выдачи паспорта">{courierDetails?.dateOfGivenPassport.slice(0,10)}</Descriptions.Item>
        <Descriptions.Item label="Гражданство">{courierDetails?.citizenShip}</Descriptions.Item>
        <Descriptions.Item label="Последнее место работы">{courierDetails?.lastWork}</Descriptions.Item>
        <Descriptions.Item label="Регион обслуживания">{courierDetails?.regionOfService}</Descriptions.Item>
        <Descriptions.Item label="Дата создания">{courierDetails?.createdAt.slice(0,10)}</Descriptions.Item>
        <Descriptions.Item label="Дата обновления">{courierDetails?.updatedAt.slice(0,10)}</Descriptions.Item>
      </Descriptions>
    )}
  </Modal>
  );
};

export default AboutCourierModal;
