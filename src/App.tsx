/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Divider, Layout, theme } from "antd";
import "antd/dist/reset.css";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Notification from "./components/Notification/Notification";
import NotificationSettings from "./components/NotificationSettings/NotificationSettings";
import WatchListComponent from "./components/WatchListComponent/WatchListComponent";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

import { currencyPairs } from "./constants/currencyPairs";
import { RootState } from "./redux/store";
import { CurrencyNotification } from "./interface/interface.CurrencyNotification";
import { fetchConversionRate } from "./services/api/fetchConversionRate";
import { ErrorModalContext } from "./context/ErrorModalContext";

const { Content } = Layout;

function App() {
  const { showError } = useContext(ErrorModalContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { contextHolder, openNotification } = Notification();
  const { fromCurrency, toCurrency, amount, result } = useSelector(
    (state: RootState) => state.currency
  );

  const [watchList, setWatchList] = useState<CurrencyNotification[]>([]);

  const addNotification = (threshold: number, direction: "up" | "down") => {
    if (isAuth) {
      const newNotification: CurrencyNotification = {
        id: generateUniqueId(),
        threshold,
        direction,
        time: new Date().toISOString(),
        fromCurrency,
        toCurrency,
        amount,
        result,
        isAlertEnabled: true,
        isNotified: false,
        date: null,
      };

      setWatchList([...watchList, newNotification]);
    }
  };

  // авторизация ----------------
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth") === "true");
  }, []);
  // авторизация ----------------

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const updateNotification = (
    id: string,
    updates: Partial<CurrencyNotification>
  ) => {
    setWatchList(
      watchList.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (watchList.some((notification) => notification.isAlertEnabled)) {
      interval = setInterval(() => {
        Promise.all(
          watchList.map((notification) => {
            if (notification.isAlertEnabled && !notification.isNotified) {
              const pairKey = `${notification.fromCurrency}-${notification.toCurrency}`;
              const pairID = currencyPairs[pairKey];

              return fetchConversionRate(pairID).then((conversionRate) => {
                if (conversionRate && notification.result !== null) {
                  if (
                    notification.direction === "up" &&
                    conversionRate * notification.amount >=
                      notification.threshold + notification.result
                  ) {
                    updateNotification(notification.id, {
                      isAlertEnabled: false,
                      isNotified: true,
                      date: new Date().toLocaleString(),
                    });
                    openNotification(
                      "Цель достигнута",
                      `Пара ${notification.fromCurrency}/${
                        notification.toCurrency
                      } достигла цели ${
                        notification.threshold + notification.result
                      } время: ${new Date().toLocaleString()}`
                    );
                  }
                }
              });
            }
          })
        ).catch((error) => {
          console.log(error);
          watchList.forEach((notification) => {
            updateNotification(notification.id, {
              isNotified: false,
              isAlertEnabled: false,
            });
          });
          showError("Отслеживание курса валют завершилось с ошибкой");
        });
      }, 600);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [watchList]);
  return (
    <Layout style={{ height: "100vh" }}>
      <HeaderComponent isAuth={isAuth} setIsAuth={setIsAuth} />
      {contextHolder}

      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <h1>Конвертер валют</h1>
          <div>
            <CurrencyConverter />
            <Divider />

            {isAuth && (
              <>
                <NotificationSettings onAddNotification={addNotification} />
                <Divider />

                <WatchListComponent
                  watchList={watchList}
                  setWatchList={setWatchList}
                />
              </>
            )}
          </div>
        </Content>
      </Layout>

      <FooterComponent />
    </Layout>
  );
}

export default App;
