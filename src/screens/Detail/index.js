import { HStack, Image, Stack, Text } from "native-base";
import React, { useEffect } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ActivityIndicator,
    Appbar,
    Avatar,
    useTheme,
} from "react-native-paper";
import { IcBackBlack } from "../../assets";
import RowText from "../../components/RowText";
import { useGetUserByIdQuery } from "../../services/userApi";

const DetailScreen = ({ route, navigation }) => {
    const theme = useTheme();
    const id = route.params.id;
    const { data, isLoading } = useGetUserByIdQuery(id);
    console.log("detailUser", data);
    console.log("Id:", id);
    console.log("image", data?.data.image);

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header
                style={{
                    backgroundColor: "white",
                    justifyContent: "space-between",
                }}
                mode={"center-aligned"}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={data?.name || "Detail User"} />
                <Appbar.Action icon="delete" onPress={() => {}} />
            </Appbar.Header>
            <Stack paddingX={24} bg="white">
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Stack alignItems="center">
                        <ImageBackground
                            style={styles.cover}
                            source={{
                                uri:
                                    "https://mabesal.indi.network/" +
                                    data?.data.image,
                            }}
                        />
                    </Stack>
                )}
            </Stack>
            <View style={styles.content}>
                <View style={styles.mainContent}>
                    <View style={styles.productContainer}>
                        <Stack alignItems={"center"}>
                            <Text
                                textAlign={"center"}
                                alignItems={"center"}
                                fontSize="xl"
                                bold>
                                {data?.data.name}
                            </Text>
                        </Stack>
                        <RowText title={"NRP"} subtitle={data?.data.nrp} />
                        <RowText title={"Rank"} subtitle={data?.data.rank_id} />
                        <RowText
                            title={"Status"}
                            subtitle={data?.data.status_id}
                        />
                        <RowText
                            title={"Address"}
                            subtitle={data?.data.address}
                        />
                        <RowText
                            title={"Born Date"}
                            subtitle={data?.data.born_date}
                        />
                        <RowText
                            title={"Born Place"}
                            subtitle={data?.data.born_place}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    appbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 30,
        backgroundColor: "white",
    },
    cover: {
        height: 330,
        width: 400,
        maxWidth: 600,
        paddingLeft: 16,
    },
    mainContent: {
        flex: 1,
    },
    productContainer: {},
    content: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -40,
        paddingHorizontal: 16,
        paddingTop: 26,
        flex: 1,
    },
});

export default DetailScreen;
