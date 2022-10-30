import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import Router from "./src/router";
import ToDoProvider from "./src/context/ToDoContext";

// extend the theme
export const theme = extendTheme({
    colors: {
        // Add new color
        customPurple: "#47A9DA",
    },
});

// const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ToDoProvider>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <Router />
                </NavigationContainer>
            </NativeBaseProvider>
        </ToDoProvider>
    );
}
