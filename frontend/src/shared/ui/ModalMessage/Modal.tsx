import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Select,
  Input,
  Card,
  Table,
  notification,
  Tag,
} from "antd";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import { styled } from "styled-components";
import { regionOptions } from "src/widgets/MessagesTable/consts";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CourierType {
  id: number;
  fullName: string;
  phoneNumber: string;
  isAccepted?:boolean;
}

export const ModalComponent = ({ visible, onCancel, selectedItemId }) => {
  const [form] = Form.useForm();
  const [couriers, setCouriers] = useState<CourierType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCourier, setSelectedCourier] = useState<CourierType | null>(
    null
  );
  const [hoveredCourier, setHoveredCourier] = useState<
    CourierType | null | any
  >(null);
  const [isCourierSelected, setIsCourierSelected] = useState(false);
  const [selectedCourierId, setSelectedCourierId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const columns = [
    {
      title: "CODE",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title:'Категрия курьера',
      dataIndex:"isUrgent",
      key:"isUrgent",
      render:(isUrgent)=>(
        <div className="">
          {isUrgent ? <Tag color="red">Срочный</Tag> : <Tag color="yellow">Несрочный</Tag>}
        </div>
      )
    }
  ];

  const onFinish = async (values) => {
    try {
      const reqData = {
        ...values,
        region: values.region,
        courierId: selectedCourierId,
      };
      await MessageApi.updateMessage(selectedItemId, reqData);
      notification.success({
        message: "Успешно сохранен",
      });
      // setTimeout(() => {
      //   onCancel();
      //   navigate("/processed");
      // }, 10);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await CandidatesApi.getCandidates();
        const couriersData = response.data;
        const filteredCouriers = couriersData.filter(
          (courier) => courier.isAccepted
        );
        setCouriers(filteredCouriers);
      } catch (error) {
        console.error("Error fetching couriers:", error);
      }
    };

    fetchCouriers();
  }, []);

  const handleCourierSelect = (record) => {
    setSelectedCourier(record);
    setSelectedCourierId(record.id); 
    setIsCourierSelected(true); 
    setHoveredCourier(false);
  };

  const handleDeselectCourier = () => {
    setSelectedCourier(null);
    setSelectedCourierId(null); 
    setIsCourierSelected(false);
  };

  const filteredCouriers = couriers.filter(
    (courier) =>
      courier.fullName.toLowerCase().includes(searchValue.toLowerCase()) &&
      courier.isAccepted === true
  );

  return (
    <Modal
      width={900}
      open={visible}
      title={"Оформить сообщение" + selectedItemId}
      onCancel={onCancel}
      style={{ display: "flex" }}
      footer={null}
    >
      <Form
        form={form}
        name="modal_form"
        onFinish={onFinish}
        initialValues={{}}
        style={{ width: 900 }}
      >
        <Form.Item name="region" label="Выберите область">
          <Select options={regionOptions} style={{ width: "130px" }} />
        </Form.Item>

        <Form.Item name="courierId" label="Курьер">
          <Input
            placeholder="Введите имя курьера"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Form.Item>

        {selectedCourier && (
          <Card title="Выбранный курьер">
            <WrapperCard>
              <DescriptionCard>
                <p>ID: {selectedCourier.id}</p>
                <p>ФИО: {selectedCourier.fullName}</p>
                <p>НОМЕР ТЕЛЕФОНА: {selectedCourier.phoneNumber}</p>
              </DescriptionCard>
              <StyledImage
                src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
                alt=""
                height={200}
              />
              <Button onClick={handleDeselectCourier} type="primary">
                Отменить выбор
              </Button>
            </WrapperCard>
          </Card>
        )}

        {isCourierSelected ? null : filteredCouriers.length > 0 ? (
          <Table
            style={{ width: "500px", cursor: "pointer" }}
            columns={columns}
            dataSource={filteredCouriers}
            onRow={(record) => ({
              onClick: () => handleCourierSelect(record),
              onMouseEnter: () => setHoveredCourier(record),
              onMouseLeave: () => setHoveredCourier(null),
            })}
          />
        ) : (
          <p>Нет доступных курьеров</p>
        )}
        {hoveredCourier && (
          <AbovePicture>
            <Card>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeInUpVariants}
              >
                <p>Дополнительная информация:</p>
                <p>ID: {hoveredCourier.id}</p>
                <p>ФИО: {hoveredCourier.fullName}</p>
                <p>НОМЕР ТЕЛЕФОНА: {hoveredCourier.phoneNumber}</p>
                <StyledImage
                  style={{ borderRadius: "100px" }}
                  src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
                  alt=""
                  height={200}
                />
              </motion.div>
            </Card>
          </AbovePicture>
        )}
        <Button htmlType="submit">Сохранить</Button>
      </Form>
    </Modal>
  );
};

const WrapperCard = styled.div`
  display: flex;
  column-gap: 100px;
`;
const DescriptionCard = styled.div``;

const AbovePicture = styled.div`
  position: absolute;
  top: 165px;
  left: 540px;
  z-index: 99;
`;

const StyledImage = styled.img`
  border-radius: 100px;
  margin-top: 20px;
`;
