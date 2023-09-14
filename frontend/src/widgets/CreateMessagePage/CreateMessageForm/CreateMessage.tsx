import React, { useState } from "react";
import { Form, Input, Button, AutoComplete, Card, Select } from "antd";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import { debounce } from "lodash";
import styled from "styled-components";
import { regionOptions } from "src/widgets/MessagesTable/consts";

interface CourierType {
  id: number;
  fullName: string;
  phoneNumber: string;
}
const CreateMessageForm = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");
  const [courierOptions, setCourierOptions] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState<CourierType | null>(
    null
  );
  const handleSubmit = (values) => {
    console.log(values);
  };

  const fetchCouriers = debounce(async (inputValue) => {
    try {
      const response = await CandidatesApi.getCandidates();
      const couriers = response.data;

      const filteredCouriers = couriers.filter((courier) =>
        courier.fullName.toLowerCase().includes(inputValue.toLowerCase())
      );

      const options = filteredCouriers.map((courier) => ({
        value: courier.id.toString(),
        label: courier.fullName,
      }));

      setCourierOptions(options);
    } catch (error) {
      console.error("Error fetching couriers:", error);
    }
  }, 300);

  const handleSearch = (value) => {
    setSearchValue(value);
    fetchCouriers(value);
  };
  //
  //
  const handleCourierSelect = async (value) => {
    try {
      const response = await CandidatesApi.getCourierById(parseInt(value));
      setSelectedCourier(response.data);
    } catch (error) {
      console.error("Error fetching courier by ID:", error);
    }
  };
  return (
    <div>
      <h2>Создать сообщение</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        
      >
        <Form.Item
          label="Кому"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
          wrapperCol={{
            
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Номер телефона"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter a phone number" },
            {
              pattern: /^(\+\d{12})$/,
              message: "Phone number should be in the format: +996XXXXXXXXX",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Населенный пункт"
          name="address_puntk"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Адрес"
          name="address"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Доп информация"
          name="message"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Курьер"
          name="courier"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="region" label="Выберите область">
          <Select options={regionOptions} style={{ width: "130px" }} />
        </Form.Item>
        <Form.Item name="courierId" label="Курьер">
          <AutoComplete
            style={{ width: 200 }}
            options={courierOptions}
            onSearch={handleSearch}
            value={searchValue}
            onSelect={handleCourierSelect}
            placeholder="Найти курьера"
          />
        </Form.Item>
        {selectedCourier && (
          <Card title="Выбранный курьер"
          //  style={{width:'500px'}}
           >
            <WrapperCard>
              <DescriptionCard>
                <p>ID: {selectedCourier.id}</p>
                <p>ФИО: {selectedCourier.fullName}</p>
                <p>НОМЕР ТЕЛЕФОНА: {selectedCourier.phoneNumber}</p>
              </DescriptionCard>
              <img src="https://i.ibb.co/W68x5JS/1.png" alt="" height={200} />
            </WrapperCard>
          </Card>
        )}

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateMessageForm;

const WrapperCard = styled.div`
  display: flex;
  column-gap: 100px;
`;
const DescriptionCard = styled.div``;
