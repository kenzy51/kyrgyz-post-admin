  import React, { useState } from "react";
  import {
    Modal,
    Form,
    Button,
    Select,
    AutoComplete,
    Card,
  } from "antd";
  import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
  import debounce from "lodash/debounce";
  import { styled } from "styled-components";
  import axios from "axios";
import { regionOptions } from "src/widgets/MessagesTable/consts";
import { MessageApi } from "src/shared/store/messages/api/messagesApi";

  interface CourierType {
    id: number;
    fullName: string;
    phoneNumber: string;
  }

  export const ModalComponent = ({ visible, onCancel, selectedItemId }) => {
    const [form] = Form.useForm();
    const [courierOptions, setCourierOptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedCourier, setSelectedCourier] = useState<CourierType | null>(
      null
    );
    const onFinish = async (values) => {
      try {
        const reqData = {
          ...values,
          region: values.region,
        };
        await MessageApi.updateMessage(selectedItemId, reqData); // Replace with your API endpoint and data
      } catch (error) {
        console.error("Error processing message:", error);
      }
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
            <Select
              options={regionOptions}
              style={{ width: "130px" }}
            />
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
            <Card title="Выбранный курьер">
              <WrapperCard>
                <DescriptionCard>
                  <p>ID: {selectedCourier.id}</p>
                  <p>ФИО: {selectedCourier.fullName}</p>
                  <p>НОМЕР ТЕЛЕФОНА: {selectedCourier.phoneNumber}</p>
                </DescriptionCard>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Wylde.cropped.png"
                  alt=""
                  height={200}
                />
              </WrapperCard>
            </Card>
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
