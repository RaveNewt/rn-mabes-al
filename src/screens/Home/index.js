import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FlatList, Stack, Text } from "native-base";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import UserCard from "../../components/UserCard";
import { useGetUsersQuery } from "../../services/userApi";

const HomeScreen = ({ navigation }) => {
    const isFocused = useIsFocused();

    const { data, refetch, isLoading } = useGetUsersQuery({
        perPage: 100,
        page: 1,
    });

    useEffect(() => {
        if (isFocused) {
            refetch();
            console.log("dataPers", data?.data);
        }
    }, [isFocused]);

    return (
        <Stack flex={1}>
            <Appbar.Header>
                <Appbar.Content title="Mabes App" />
                <Appbar.Action
                    icon="plus"
                    onPress={() => navigation.navigate("UserFormScreen")}
                />
            </Appbar.Header>
            <FlatList
                data={data?.data || []}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                    <View
                        style={{ flex: 1, padding: 32, alignItems: "center" }}>
                        <Text>Data is Empty</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                        onPress={() => {
                            navigation.navigate("DetailScreen", {
                                id: item.id,
                            });
                            console.log("item", item.id);
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default HomeScreen;
