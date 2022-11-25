import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack } from "native-base";

const RowText = ({ title, subtitle }) => {
    return (
        <HStack marginBottom={2} space={2}>
            <Text fontSize="md" marginRight={4}>
                {title}:
            </Text>
            <Text fontSize="md">{subtitle}</Text>
        </HStack>
    );
};

export default RowText;

const styles = StyleSheet.create({});
