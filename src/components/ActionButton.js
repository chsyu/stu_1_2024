import React from "react";
import {
  Center,
  Pressable,
  Actionsheet,
} from "@gluestack-ui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionScreen from "../screens/ActionScreen";

import { Callout } from "react-native-maps";

export default ({ zoomRatio, site }) => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const handleClose = () => {
    setShowActionsheet(!showActionsheet);
    console.log("123456")
    // console.log(site);
  }

  //if (showActionsheet) console.log("123456");

  return (
    <>
      <Center
        bg="white"
        borderRadius={60}
        p={3 * zoomRatio}
        borderWidth={2 * zoomRatio}
        borderColor="#F29D38"
      >
        <Icon name={"bicycle"} size={30 * zoomRatio} color="#F29D38" />
      </Center>
    </>
  );
};