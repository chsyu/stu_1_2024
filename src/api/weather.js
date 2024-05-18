import axios from "axios";

export const getwUbikeInfo = async () => {
  const { wdata } = await axios.get(
    "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-B5A88387-309D-48B7-910E-0201B33B1FB7&WeatherElement="
  );
  return wdata;
};