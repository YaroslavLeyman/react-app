import { Layout, Modal, Button } from "antd";
import styles from "./HeaderComponent.module.css";

import React, { FC, useState } from "react";
import AuthComponent from "../AuthComponent/AuthComponent";

const { Header } = Layout;

interface AuthComponentProps {
  setIsAuth: (isAuth: boolean) => void;
  isAuth: boolean;
}

const HeaderComponent: FC<AuthComponentProps> = ({ isAuth, setIsAuth }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleLogout = (): void => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <>
      <Header className={styles.headerStyle}>
        <div />
        {!isAuth ? (
          <Button type="primary" onClick={showModal}>
            Войти
          </Button>
        ) : (
          <Button onClick={handleLogout}>Выйти</Button>
        )}
      </Header>

      <Modal
        title="Авторизация"
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <AuthComponent
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
};

export default HeaderComponent;
