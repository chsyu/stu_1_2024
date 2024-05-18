import React from "react";
import Navigation from "../navigation";
import { Image, Center, Text } from "@gluestack-ui/themed";

import { useWeatherInfo } from '../tanstack-query';
import iconImg from "../../midterm_img/icon-new.png"

const LoadingWeather = () => {
    const { isLoading, isSuccess } = useWeatherInfo();
    const icon = iconImg;

    return (
        <>
            {console.log("進入天氣載入畫面")}
            {
                isLoading && !isSuccess ?
                    <Center flex={1} h={"100%"} bg="#ebad00">
                        <Image source={icon} alt="loading-icon" />
                        <Text mt={10} color="#fff">
                            正在加載天氣資料...
                        </Text>
                    </Center>
                    : <Navigation />
            }
        </>
    )
};


export default LoadingWeather;
