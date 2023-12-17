import { Button, InputNumber, Select } from "antd";
import styles from './NotificationSettings.module.css';

import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface NotificationSettingsProps {
  onAddNotification: (threshold: number, direction: "up" | "down") => void;
}

const NotificationSettings: FC<NotificationSettingsProps> = ({
  onAddNotification,
}) => {
  const { fromCurrency, toCurrency, result } = useSelector(
    (state: RootState) => state.currency
  );

  const [threshold, setThreshold] = useState(1);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const handleAddNotification = () => {
    onAddNotification(threshold, direction);
  };

  return (
    <>
      <h3>Уведомить, если сумма изменится </h3>
      <div className={styles.container}>
        <InputNumber
          min={0}
          type="number"
          value={threshold}
          onChange={(value) => setThreshold(Number(value))}
          placeholder="Изменить на значение"
        />
        <Select
          value={direction}
          onChange={(value) => setDirection(value as "up" | "down")}
        >
          <Select.Option value="up">В большую сторону</Select.Option>
          <Select.Option value="down">В меньшую сторону</Select.Option>
        </Select>
        <Button
          type="primary"
          onClick={handleAddNotification}
          disabled={
            threshold > 0 &&
            fromCurrency !== toCurrency &&
            ((direction === "down" && result - threshold > 0) ||
              direction === "up")
              ? false
              : true
          }
          ghost
        >
          Отслеживать
        </Button>
      </div>
    </>
  );
};

export default NotificationSettings;
