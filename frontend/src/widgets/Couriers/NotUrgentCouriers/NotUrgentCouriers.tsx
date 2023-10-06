import { Button, Popconfirm, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { CandidatesApi } from 'src/shared/store/candidates/api/candidatesApi';
import { candidateStore } from 'src/shared/store/candidates/service/candidateStore';
import AboutCourierModal from '../AboutCourier/AboutCourierModal';

export const NotUrgentCouriers = observer(() => {
  const { candidates, updateCourier } = candidateStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourierId, setSelectedCourierId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CandidatesApi.getCandidates();
        candidateStore.candidates = response.data;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 200000000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const filteredCandidates = candidates.filter(
    (candidate: any) => candidate.isAccepted && !candidate.isUrgent
  );

  const handleClick = async (id: number) => {
    try {
      await updateCourier(id, { isUrgent: true });
      window.location.reload()
    } catch (e) {
      console.log(e, 'error ');
    }
  };

  const openModal = (id) => {
    // Set the selected courier ID and open the modal
    setSelectedCourierId(id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    // Clear the selected courier ID and close the modal
    setSelectedCourierId(null);
    setIsModalVisible(false);
  };

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
      title: '',
      dataIndex: '',
      key: '',
      render: (record) => {
        return (
          <Button onClick={() => openModal(record.id)}>
            Подробнее о курьере
          </Button>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (record) => {
        if (record?.isUrgent === false) {
          return (
            <Popconfirm
              title="Вы уверены, что хотите перевести курьера в срочный порядок?"
              onConfirm={() => handleClick(record.id)}
              cancelText="Отмена"
              okText="Да"
            >
              <Button type="primary">Перевести в срочного курьера</Button>
            </Popconfirm>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Table dataSource={filteredCandidates} columns={columns} />
      {/* Pass courierId and isModalVisible to the modal */}
      <AboutCourierModal
        courierId={selectedCourierId}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
    </div>
  );
});
