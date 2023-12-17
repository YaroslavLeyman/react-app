/* eslint-disable react-hooks/exhaustive-deps */
import { InputNumber, Select } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import styles from "./CurrencyConverter.module.css";

import React, { FC, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyPairs } from "../../constants/currencyPairs";

import {
  setAmount,
  setFromCurrency,
  setResult,
  setToCurrency,
} from "../../redux/slices/currencySlice";
import { RootState } from "../../redux/store";
import { fetchConversionRate } from "../../services/api/fetchConversionRate";
import { ErrorModalContext } from "../../context/ErrorModalContext";

const CurrencyConverter: FC = () => {
  const { showError } = useContext(ErrorModalContext);
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, result } = useSelector(
    (state: RootState) => state.currency
  );

  const pairKey = `${fromCurrency}-${toCurrency}`;
  const pairID = currencyPairs[pairKey];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversionRate = await fetchConversionRate(pairID);
        if (conversionRate) {
          dispatch(setResult(amount * conversionRate));
        }
      } catch (error) {
        showError("Не удалось получить курс валют:");
      }
    };

    if (fromCurrency !== toCurrency) {
      fetchData();
    } else {
      dispatch(setResult(0));
    }
  }, [fromCurrency, toCurrency, amount, dispatch]);

  return (
    <div className={styles.container}>
      <InputNumber
        type="number"
        value={amount}
        min={0}
        onChange={(value) => {
          const numericValue =
            value !== null && value !== undefined
              ? Math.max(1, Number(value))
              : 1;
          dispatch(setAmount(numericValue));
        }}
      />
      <Select
        value={fromCurrency}
        onChange={(value) => dispatch(setFromCurrency(value))}
      >
        <Select.Option value="EUR">EUR</Select.Option>
        <Select.Option value="USD">USD</Select.Option>
        <Select.Option value="JPY">JPY</Select.Option>
        <Select.Option value="RUB">RUB</Select.Option>
        <Select.Option value="GBP">GBP</Select.Option>
      </Select>
      <RetweetOutlined />
      <Select
        value={toCurrency}
        onChange={(value) => dispatch(setToCurrency(value))}
      >
        <Select.Option value="EUR">EUR</Select.Option>
        <Select.Option value="USD">USD</Select.Option>
        <Select.Option value="JPY">JPY</Select.Option>
        <Select.Option value="RUB">RUB</Select.Option>
        <Select.Option value="GBP">GBP</Select.Option>
      </Select>
      <div className={styles.resultDisplay}>
        = {result ? result.toFixed(2) + " " + toCurrency : "N/A"}
      </div>
    </div>
  );
};

export default CurrencyConverter;
