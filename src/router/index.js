import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import NewToDo from "../screens/NewToDo";

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="NewTodo" component={NewToDo} />
        </Stack.Navigator>
    );
};

export default Router;

const styles = StyleSheet.create({});
