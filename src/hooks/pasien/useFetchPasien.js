const { useEffect, useState } = require("react");
import { axiosInstance } from "@/lib/axios";

export const usePasien = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/pasien");

      console.log(res.data);
      setData(res.data);
    };
    getData();
  }, []);

  return {
    pasien: data,
  };
};
