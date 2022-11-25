import React from "react";
import Detail from "./detail";
import { Alert } from "react-native";
import { usePostUserMutation } from "../../services/userApi";
import { useGetRanksQuery } from "../../services/rankAPI";
import { useGetStatusesQuery } from "../../services/statusAPI";
import dayjs from "dayjs";

const UserFormScreen = ({ navigation }) => {
    const initialValues = {
        nrp: "",
        name: "",
        born_place: "",
        born_date: null,
        address: "",
        rank_id: "",
        status_id: "",
    };
    const [postUser, { isLoading }] = usePostUserMutation();

    const ranks = useGetRanksQuery().data?.data.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const statuses = useGetStatusesQuery().data?.data.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const onSubmit = (values) => {
        let formData = new formData();

        const payload = {
            ...values,
            image: {
                url: values.image,
                name: `${new Date().getTime()}.png`,
                type: "image/png",
            },

            born_date: dayjs(values.born_date).format("DD MMMM YYYY"),
        };
        console.log("payload", payload);
        postUser(payload)
            .unwrap()
            .then((_) => navigation.goBack())
            .catch((err) => {
                console.log("error", err);
                Alert.alert("Error", err.error);
            });
    };

    return (
        <Detail
            initialValues={initialValues}
            ranks={ranks}
            statuses={statuses}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onBackPress={() => navigation.goBack()}
        />
    );
};

export default UserFormScreen;
