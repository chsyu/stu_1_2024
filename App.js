import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loading from "./src/screens/Loading";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GluestackUIProvider config={config}>
            <Loading />
          </GluestackUIProvider>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
