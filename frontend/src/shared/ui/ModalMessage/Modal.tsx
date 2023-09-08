import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Calendar,
  DatePicker,
  AutoComplete,
  Card,
} from "antd";
import { regioOptions } from "src/widgets/MessagesTable/consts";
import { Candidates } from "src/widgets/Candidates/Candidates";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import debounce from "lodash/debounce";
import { styled } from "styled-components";

interface CourierType {
  id:number;
  fullName:string;
  phoneNumber:string;
}

export const ModalComponent = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [courierOptions, setCourierOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCourier, setSelectedCourier]  = useState<CourierType | null>(null);

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

  const onFinish = (values) => {
    console.log("Received values:", values);
    onCancel();
  };
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
    <Modal
      width={900}
      open={visible}
      title="Офрмить сообщение"
      footer={null}
      onCancel={onCancel}
      style={{ display: "flex" }}
    >
      <Form
        form={form}
        name="modal_form"
        onFinish={onFinish}
        initialValues={{}}
        style={{ width: 900 }}
      >
        <Form.Item
          name="field1"
          label="Выберите область"
          rules={[
            {
              required: true,
              message: "Please input Field 1!",
            },
          ]}
        >
          <Select
            defaultValue={"chui"}
            options={regioOptions}
            style={{ width: "130px" }}
          />{" "}
        </Form.Item>

        <Form.Item
          name="field2"
          label="Дата обработки"
          rules={[
            {
              required: true,
              message: "Please input Field 2!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item name="courier" label="Курьер">
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
          <Card title="Выбранный курьер">
          <WrapperCard>
          <DescriptionCard>
          <p>ID: {selectedCourier.id}</p>
            <p>ФИО: {selectedCourier.fullName}</p>
            <p>НОМЕР ТЕЛЕФОНА: {selectedCourier.phoneNumber}</p>
          </DescriptionCard>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Wylde.cropped.png" alt="" height={200} />
          </WrapperCard>
          </Card>
        )}
        <Button onClick={onCancel}>Сохранить</Button>
      </Form>
    </Modal>
  );
};

const WrapperCard = styled.div`

display: flex;
column-gap: 100px;
`
const DescriptionCard = styled.div`
  

`