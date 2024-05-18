import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { Center, Box, VStack, HStack, Text } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useWeatherInfo } from '../tanstack-query';

import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/slice";



export default ({ site }) => {

    const colorMode = useSelector(selectColorMode);
    const textMode = colorMode == "light" ? "#000" : "#E2DDDD";
    const blockMode = colorMode == "light" ? "#FAFAFA" : "#474747";

    const { isLoading } = useWeatherInfo();


    return (
        <>
            {
                isLoading ?
                    <Center>
                        <Text>
                            天氣資訊載入中...
                        </Text>
                    </Center> :
                    <HStack>
                        <Center w={"100%"} mt={10}>
                            <Box bg={blockMode} h={150} w={"90%"} borderRadius={17}>
                                <HStack h={"100%"} justifyContent="center" alignItems="center">
                                    <HStack mr={25} h={70} justifyContent="center" alignItems="center">
                                        <MaterialCommunityIcons name="weather-partly-cloudy" size={70} color={"#F29D38"} />
                                    </HStack>
                                    <VStack>
                                        <Text fontWeight="bold" fontSize={20} pb={5} color={textMode}>
                                            大安區
                                        </Text>
                                        <Text pb={2} color={textMode}>
                                            晴時有雲
                                        </Text>
                                        <Text pb={10} color={textMode}>
                                            30°C
                                        </Text>
                                        <HStack>
                                            <MaterialCommunityIcons name="weather-pouring" size={22} color={"#F29D38"} />
                                            <Text pl={3} pb={5} color={textMode}>
                                                降雨機率：5%
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </Box>
                        </Center>
                    </HStack>
            }
        </>
    );
};