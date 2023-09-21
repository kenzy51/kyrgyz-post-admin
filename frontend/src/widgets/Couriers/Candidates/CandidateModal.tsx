import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select } from "antd";
import { CandidatesApi } from "src/shared/store/candidates/api/candidatesApi";
import { observer } from "mobx-react-lite";
import { candidateStore } from "src/shared/store/candidates/service/candidateStore";

const fieldLabels = {
  passportData: "Паспортные данные",
  dateOfBirth: "Дата рождения",
  yearOfBirth: "Год рождения",
  addressOfLiving: "Адрес проживания",
  addressByPropise: "Адрес по прописке",
  inn: "ИНН",
  numberOfPassport: "Номер паспорта",
  whoPassport: "Кем выдан паспорт",
  dateOfGivenPassport: "Дата выдачи паспорта",
  citizenShip: "Гражданство",
  lastWork: "Последнее место работы",
  regionOfService: "Район обслуживания",
};
const regionOptions = [
  "Чуй",
  "Ош",
  "Баткен",
  "Иссык-куль",
  "Нарын",
  "Джалал-абад",
  "Талас",
];
export const CandidateModal = observer(
  ({ visible, onCancel, selectedId }: any) => {
    const [form] = Form.useForm();
    const { selectedCourier } = candidateStore;
    const onFinish = async (values) => {
      try {
        await candidateStore.updateCourier(selectedId?.id, values);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    useEffect(() => {
      const fetchCourier = async () => {
        try {
          await candidateStore.fetchCourierById(selectedId?.id);
        } catch (error) {
          console.error("Error fetching courier:", error);
        }
      };
      if (selectedId) {
        fetchCourier();
      } else {
        candidateStore.setSelectedCourier(null);
      }
    }, [selectedId]);

    return (
      <Modal
        width={900}
        open={visible}
        title="Оформить кандидата"
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
          <div>
            <p>ФИО: {selectedCourier?.fullName}</p>
            <p>Номер телефона: {selectedCourier?.phoneNumber}</p>
          </div>

          {[
            "passportData",
            "dateOfBirth",
            "yearOfBirth",
            "addressOfLiving",
            "addressByPropise",
            "inn",
            "numberOfPassport",
            "whoPassport",
            "dateOfGivenPassport",
            "citizenShip",
            "lastWork",
          ].map((field) => (
            <Form.Item key={field} name={field} label={fieldLabels[field]}>
              <Input />
            </Form.Item>
          ))}

          <Form.Item name="placeOfService" label={fieldLabels.regionOfService}>
            <Select>
              {regionOptions.map((region) => (
                <Select.Option key={region} value={region}>
                  {region}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button htmlType="submit">Сохранить</Button>
        </Form>
      </Modal>
    );
  }
);
