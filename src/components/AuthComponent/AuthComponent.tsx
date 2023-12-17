import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Switch } from "antd";
import styles from './AuthComponent.module.css';

import React, { FC } from "react";

interface AuthComponentProps {
  setIsAuth: (isAuth: boolean) => void;
  isAuth: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const AuthComponent: FC<AuthComponentProps> = ({
  isAuth,
  setIsAuth,
  setIsModalVisible,
}) => {
  const auth = () => {
    console.log("isAuth", isAuth);

    const newAuthState = localStorage.getItem("isAuth") !== "true";
    localStorage.setItem("isAuth", newAuthState.toString());
    setIsAuth(newAuthState);
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    if (values.login === "admin" && values.password === "admin") {
      auth();
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Введите логин",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Укажите пароль",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
      <Alert
        message="Данные для авторизации"
        description="Логин: admin, Пароль: admin или переключите switch ниже"
        type="info"
        showIcon
      />

      <div className={styles.switchContainer}>
        {!isAuth ? "Войти" : "Выйти"}{" "}
        <Switch size="small" checked={isAuth} onChange={auth} />
      </div>
    </div>
  );
};

export default AuthComponent;