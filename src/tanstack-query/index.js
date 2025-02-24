import { useQuery } from "@tanstack/react-query";
import { getUbikeInfo, getWeatherInfo } from "../api";

export const useUbikeInfo = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [],
    queryFn: getUbikeInfo,
  });
  return { data, isLoading, isSuccess };
};

export const useWeatherInfo = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [],
    queryFn: getUbikeInfo,
  });
  return { data, isLoading, isSuccess };
};