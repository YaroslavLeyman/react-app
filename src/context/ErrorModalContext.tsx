import React, { createContext, useState, ReactNode, useCallback, FC } from 'react';
import { Modal } from 'antd';

interface IErrorModalContext {
  showError: (message: string) => void;
}

export const ErrorModalContext = createContext<IErrorModalContext>({
  showError: () => {},
});

interface ErrorModalProviderProps {
  children: ReactNode;
}

export const ErrorModalProvider: FC<ErrorModalProviderProps> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    setErrorMessage('');
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <Modal
        title="Ошибка"
        open={isModalVisible}
        footer={null}
        okText="Закрыть"
        onCancel={handleOk}

      >
        {errorMessage}
      </Modal>
    </ErrorModalContext.Provider>
  );
};
