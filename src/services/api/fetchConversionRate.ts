import axios from "axios";

export const fetchConversionRate = async (
  pairID: number
): Promise<number | null> => {
  try {
    const response = await axios.get(
      `https://api.investing.com/api/financialdata/${pairID}/historical/chart/`,
      {
        params: {
          interval: "PT1M",
          pointscount: 60,
        },
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    );

    const latestQuote = response.data.data[response.data.data.length - 1][4];
    return latestQuote as number;
  } catch (error) {
    throw error;
  }
};
