import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, Image, Text } from "native-base";
import React, { useContext } from "react";
import { btn_add } from "../../assets";

const Header = ({ navigation }) => {
    return (
        <HStack p={4} shadow={2} justifyContent="center">
            <Heading
                fontSize="2xl"
                alignItems={"center"}
                textAlign="center"
                flex={1}
            >
                Cart App
            </Heading>
            <Image
                source={btn_add}
                size={8}
                borderColor="black"
                onPress={() => navigation.navigate("NewTodo")}
            />
        </HStack>
    );
};

export default Header;
