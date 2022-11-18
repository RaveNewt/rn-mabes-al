import { useNavigation } from "@react-navigation/native";
import { FlatList, Stack, Text } from "native-base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import UserCard from "../../components/UserCard";
import { useGetUsersQuery } from "../../services/userAPI";

const HomeScreen = () => {
    useGetUsersQuery();
    const users = useSelector((state) => state.user.users);
    const navigation = useNavigation();
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
                data={users || []}
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
                        onPress={() => {}}
                        name={item.name}
                        rank={item.rank}
                    />
                )}
            />
        </Stack>
    );
};

export default HomeScreen;
