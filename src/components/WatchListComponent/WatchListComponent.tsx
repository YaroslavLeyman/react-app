import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Card from "antd/es/card/Card";
import styles from "./WatchListComponent.module.css";

import React, { FC } from "react";
import { CurrencyNotification } from "../../redux/slices/interface.CurrencyNotification";

interface WatchListProps {
  watchList: CurrencyNotification[];
  setWatchList: React.Dispatch<React.SetStateAction<CurrencyNotification[]>>;
}

const WatchListComponent: FC<WatchListProps> = ({
  watchList,
  setWatchList,
}) => {
  const toggleAlert = (id: string) => {
    setWatchList(
      watchList.map((item) =>
        item.id === id
          ? { ...item, isAlertEnabled: !item.isAlertEnabled }
          : item
      )
    );
  };

  const deleteNotification = (id: string) => {
    setWatchList(watchList.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      {watchList.map((item) => (
        <div key={`${item.id}__watchlist`} className={styles.watchListItem}>
          <Card
            size="small"
            title={`Отслеживание `}
            extra={
              <>
                <Button
                  size="small"
                  onClick={() => deleteNotification(item.id)}
                  type={"text"}
                  danger
                >
                  Удалить
                </Button>
                <Button
                  size="small"
                  onClick={() => toggleAlert(item.id)}
                  type={"text"}
                  style={{
                    color: item.isAlertEnabled ? "red" : "green",
                  }}
                >
                  {!item.isNotified ? (
                    item.isAlertEnabled ? (
                      <>
                        Остановить <CloseCircleOutlined />
                      </>
                    ) : (
                      <>
                        Начать <CheckCircleOutlined />
                      </>
                    )
                  ) : null}
                </Button>
              </>
            }
          >
            <div>
              {" "}
              {item.direction === "up" ? (
                <RiseOutlined />
              ) : (
                <FallOutlined />
              )}{" "}
            </div>

            {item.isNotified ? (
              <div
                style={{
                  color: item.direction === "up" ? "green" : "red",
                }}
              >
                <div>Исходная сумма: {item.result}</div>
                <div>
                  Цель достигнута!{" "}
                  {item.direction === "up"
                    ? item.threshold + item.result
                    : item.threshold - item.result}
                </div>
                <div>
                  Пара: {item.fromCurrency}/{item.toCurrency}
                </div>
              </div>
            ) : (
              <div>
                <div>Исходная сумма: {item.result} </div>
                <div>
                  Цель:{" "}
                  {item.direction === "up"
                    ? item.threshold + item.result
                    : item.result - item.threshold}
                </div>
                <div>
                  Пара: {item.fromCurrency}/{item.toCurrency}
                </div>
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default WatchListComponent;
