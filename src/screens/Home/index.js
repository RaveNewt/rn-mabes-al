import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Heading, HStack, Image, Stack } from "native-base";
import { btn_add } from "../../assets";

const Home = ({ navigation }) => {
    return (
        <Stack>
            <HStack p={4} shadow={2} justifyContent="center">
                <Heading
                    fontSize="2xl"
                    alignItems={"center"}
                    textAlign="center"
                    flex={1}
                >
                    Cart App
                </Heading>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NewTodo")}
                >
                    <Image source={btn_add} size={8} borderColor="black" />
                </TouchableOpacity>
            </HStack>
        </Stack>
    );
};

export default Home;

const styles = StyleSheet.create({});
