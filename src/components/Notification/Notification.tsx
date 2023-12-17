import { notification } from "antd";

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    api.open({
      message: message,
      description: description,
      onClose: () => console.log("Закрыть уведомление"),
    });
  };

  return { contextHolder, openNotification };
}

export default Notification;
