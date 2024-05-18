import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { Center, Box, VStack, HStack, Text } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useUbikeInfo } from '../tanstack-query';

import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/slice";

import lightMap from "../mapStyle_json/lightMode.json"
import darkMap from "../mapStyle_json/darkMode.json"

import { Dimensions } from 'react-native';

import WeatherSection from "../components/WeatherSection";

const HomeScreen = () => {
  const { navigate } = useNavigation();

  const height = (Dimensions.get('window').height);

  const { data, isSuccess } = useUbikeInfo();
  const [nearpot, setNearpot] = useState([]);

  const [msg, setMsg] = useState("Waiting...");
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  const [ubike, setUbike] = useState([]);
  const [zoomRatio, setZoomRatio] = useState(1);

  const [screenSites, setScreenSites] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getLocation();
    setRefreshing(false);
  }, []);


  //setToggleMap = () => toggleMap = !toggleMap;


  const [region, setRegion] = useState({
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.0015,
    latitudeDelta: 0.0015,
  })

  const [marker, setMarker] = useState({
    coord: {
      longitude: 121.544637,
      latitude: 25.024624,
    }
  });


  const setRegionAndMarker = (location) => {
    setRegion({
      ...region,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setMarker({
      ...marker,
      coord: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });
    setScreenSites(screenSite);
  };

  const onRegionChangeComplete = (rgn) => {
    setOnCurrentLocation(false);
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0004 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0004
    ) {
      setRegion(rgn);
    }
    if (rgn.longitudeDelta > 0.02)
      setZoomRatio(0.02 / rgn.longitudeDelta);
    else
      setZoomRatio(1);
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMsg('Permission to access location was denied');
      return;
    }
    // let location = await Location.getCurrentPositionAsync({});
    // setRegionAndMarker(location);

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 2000,
        timeInterval: 1000,
      },
      (loc) => setRegionAndMarker(loc)
    );
    setOnCurrentLocation(true);
  }

  if (data) {
    useEffect(() => {
      setNearpot(distanceMinSite);
    }, [marker]);

    useEffect(() => {
      getLocation();
      console.log(height);
    }, []);
  }

  const distanceMinSite = isSuccess && data.filter((site) => {
    if (Math.abs(site.latitude - region.latitude) < 0.0005 &&
      Math.abs(site.longitude - region.longitude) < 0.0005) {
      return site;
    }
  })

  const screenSite = isSuccess && data.filter((site) => {
    if (Math.abs(site.latitude - region.latitude) < 0.0025 &&
      Math.abs(site.longitude - region.longitude) < 0.0025) {
      return site;
    }
  })

  const colorMode = useSelector(selectColorMode);
  const textMode = colorMode == "light" ? "#000" : "#E2DDDD";
  const blockMode = colorMode == "light" ? "#FAFAFA" : "#474747";

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentHeight} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
      <Center flex={1} bg={colorMode == "light" ? "#FFE27B" : "#2E251B"}>
        <VStack>
          <HStack>
            <Center w={"100%"}>
              <Box bg={blockMode} h={240} w={"90%"} borderRadius={17}>
                <Center h={"85%"}>
                  <VStack mt={20}>
                    <HStack mb={10} mt={-20} h={90} justifyContent="center" alignItems="center">
                      <Text paddingHorizontal={15} fontSize={18} color={textMode} textAlign="center">
                        離您最近的站點：<Text fontWeight="bold" fontSize={20} color={textMode}>{isSuccess && nearpot.length == 0 ? "周遭50公尺內暫無站點" : nearpot.map((site) => {
                          return site.sna
                        })}</Text>
                      </Text>
                    </HStack>
                    <HStack h={50} justifyContent="center" alignItems="center" mt={22}>
                      <Box mt={5} bg="#D9D9D9" h={110} w={157}>
                        <Box flex={1}>
                          <MapView
                            initialRegion={region}
                            region={region}
                            style={{ height: "100%", width: "100%" }}
                            onRegionChangeComplete={onRegionChangeComplete}
                            customMapStyle={colorMode == "light" ? lightMap : darkMap}
                          >
                            <Marker
                              coordinate={marker.coord}
                            >
                              <Icon name={"map-marker"} size={60} color="#B12A5B" />
                            </Marker>
                            {(zoomRatio > 0.14) && isSuccess && screenSites.map((site) => (
                              <Marker
                                coordinate={{
                                  latitude: site.latitude,
                                  longitude: site.longitude,
                                }}
                                key={site.sno}
                                title={`${site.sna} ${site.available_rent_bikes}/${site.available_return_bikes}`}
                                description={site.ar}
                              >
                                <Center
                                  bg="white"
                                  borderRadius={60}
                                  p={3 * zoomRatio}
                                  borderWidth={2 * zoomRatio}
                                  borderColor="#F29D38"
                                >
                                  <Icon name={"bicycle"} size={30 * zoomRatio} color="#F29D38" />
                                </Center>
                              </Marker>
                            ))}
                          </MapView>
                        </Box>
                      </Box>
                      <VStack ml={20}>
                        <Text color={textMode}>
                          空柱：{isSuccess && nearpot.length == 0 ? "---" : nearpot.map((site) => {
                            return site.available_return_bikes
                          })}
                        </Text>
                        <Text color={textMode}>
                          可借車輛：{isSuccess && nearpot.length == 0 ? "---" : nearpot.map((site) => {
                            return site.available_rent_bikes
                          })}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>

                </Center>
              </Box>
            </Center>
          </HStack>

          <WeatherSection/>

          <HStack w={"100%"} h={125} space="lg" justifyContent="center" marginVertical={22}>
            <Box w={"36%"} h={"100%"} bg={blockMode} borderRadius={20} style={styles.shadow}>
              <TouchableOpacity onPress={() => navigate("Near")}>
                <VStack h={"100%"} justifyContent="center" alignItems="center">
                  <MaterialCommunityIcons name="map-marker" size={55} color={"#5686E1"} />
                  <Text color={"#5686E1"}>
                    附近站點
                  </Text>
                </VStack>
              </TouchableOpacity>
            </Box>
            <Box w={"36%"} h={"100%"} bg={blockMode} borderRadius={20} style={styles.shadow}>
              <TouchableOpacity onPress={() => navigate("Favorite")}>
                <VStack h={"100%"} justifyContent="center" alignItems="center">
                  <MaterialCommunityIcons name="heart" size={55} color={"#EB3223"} />
                  <Text color={"#EB3223"}>
                    最愛站點
                  </Text>
                </VStack>
              </TouchableOpacity>
            </Box>
          </HStack>
          <HStack w={"100%"} h={125} space="lg" justifyContent="center" marginBottom={10}>
            <Box w={"36%"} h={"100%"} bg={blockMode} borderRadius={20} style={styles.shadow}>
              <TouchableOpacity onPress={() => navigate("Map")}>
                <VStack h={"100%"} justifyContent="center" alignItems="center">
                  <MaterialCommunityIcons name="map" size={55} color={"#56D665"} />
                  <Text color={"#56D665"}>
                    站點地圖
                  </Text>
                </VStack>
              </TouchableOpacity>
            </Box>
            <Box w={"36%"} h={"100%"} bg={blockMode} borderRadius={20} style={styles.shadow}>
              <TouchableOpacity onPress={() => navigate("Route")}>
                <VStack h={"100%"} justifyContent="center" alignItems="center">
                  <MaterialCommunityIcons name="bicycle" size={55} color={"#F29D38"} />
                  <Text color={"#F29D38"}>
                    騎乘路線
                  </Text>
                </VStack>
              </TouchableOpacity>
            </Box>
          </HStack>
        </VStack>
      </Center>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2,
    shadowRadius: 1.5,
    elevation: 4,
  },
  contentHeight: {
    flex: 1,
    height: "100%"
  }
})

export default HomeScreen;
