import axios from "axios";

export const getUbikeInfo = async () => {
  const { data } = await axios.get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  );
  return data;
};

export const getWeatherInfo = async () => {
  const key = "CWA-A453F47E-8E1C-404D-A354-D4F4F7B1A7FE";
  const { data } = await axios.get(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=${key}&format=JSON&elementName=WeatherDescription&sort=time`
  );
  return data;
};
