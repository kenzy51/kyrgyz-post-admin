import React, { useEffect } from "react";
import { Modal, Form, Button, Input, Select, DatePicker } from "antd"; // Import DatePicker from Ant Design
import { observer } from "mobx-react-lite";
import { candidateStore } from "src/shared/store/candidates/service/candidateStore";

const fieldLabels = {
  passportData: "Паспортные данные",
  dateOfBirth: "Дата рождения",
  addressOfLiving: "Адрес проживания",
  addressByPropise: "Адрес по прописке",
  inn: "ИНН",
  numberOfPassport: "Номер паспорта",
  whoPassport: "Кем выдан паспорт",
  dateOfGivenPassport: "Дата выдачи паспорта",
  citizenShip: "Гражданство",
  lastWork: "Последнее место работы",
  regionOfService: "Какие районы вы можете обслуживать(Город/район)",
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
        onCancel();
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
            "addressOfLiving",
            "addressByPropise",
            "inn",
            "numberOfPassport",
            "whoPassport",
            "citizenShip",
            "lastWork",
          ].map((field) => (
            <Form.Item key={field} name={field} label={fieldLabels[field]}>
              <Input />
            </Form.Item>
          ))}

          <Form.Item name="dateOfBirth" label={fieldLabels.dateOfBirth}>
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="dateOfGivenPassport"
            label={fieldLabels.dateOfGivenPassport}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item name="placeOfService" label={fieldLabels.regionOfService}>
            {/* <Select>
              {regionOptions.map((region) => (
                <Select.Option key={region} value={region}>
                  {region}
                </Select.Option>
              ))}
            </Select> */}
            <Input/>
          </Form.Item>
          <Button htmlType="submit">Сохранить</Button>
        </Form>
      </Modal>
    );
  }
);
