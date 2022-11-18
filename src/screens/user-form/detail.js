/* eslint-disable react/prop-types */
import { Button, HStack, ScrollView, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Appbar,
    HelperText,
    TextInput as TextInputRNPaper,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";

import PaperDropdown from "../../components/picker/PaperDropdown";
import validationSchema from "./validationSchema";
import TextInput from "../../components/text-input/TextInput";
import dayjs from "dayjs";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useGetRanksQuery } from "../../services/rankAPI";
import { useGetStatusesQuery } from "../../services/statusAPI";
import { usePostUserMutation } from "../../services/authAPI";

const Detail = () => {
    useGetRanksQuery();
    useGetStatusesQuery();
    const navigation = useNavigation();
    const initialValues = {
        nrp: "",
        name: "",
        born_place: "",
        born_date: null,
        address: "",
        rank_id: "",
        status_id: "",
    };
    const methods = useForm({
        mode: "all",
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const { formState, control, register, setValue, handleSubmit } = methods;

    const bornDateHook = useWatch({
        control,
        name: "born_date",
    });

    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [postUser, { isLoading }] = usePostUserMutation();

    const ranks = useSelector((state) => state.rank.ranks);
    const ranksDropDown = ranks.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const statuses = useSelector((state) => state.status.statuses);
    console.log(statuses);
    const statusesDropDown = statuses.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const handleBornDateSave = () => {
        setValue("born_date", date, { shouldValidate: true });
        setShowDate(false);
    };

    const onSubmit = (values) => {
        const payload = {
            ...values,
            born_date: dayjs(values.born_date).format("DD MMMM YYYY"),
        };
        console.log("payload", payload);
        postUser(payload)
            .unwrap()
            .then((_) => navigation.goBack())
            .catch((err) => {
                console.log("error", err);
                Alert.alert("Error", err.data.error);
            });
    };

    useEffect(() => {
        register("born_date");
    }, [register]);

    return (
        <Stack flex={1}>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title="Add User" />
            </Appbar.Header>
            <ScrollView _contentContainerStyle={{ p: 4 }}>
                <Stack space={4}>
                    <TextInput
                        name="nrp"
                        label="Nomor Personil"
                        mode="outlined"
                        keyboardType="number-pad"
                        control={control}
                    />
                    <TextInput
                        name="name"
                        label="Nama Personil"
                        mode="outlined"
                        control={control}
                    />
                    <TextInput
                        name="born_place"
                        label="Tempat Lahir"
                        mode="outlined"
                        control={control}
                    />

                    <Stack>
                        <TouchableOpacity onPress={() => setShowDate(true)}>
                            <TextInputRNPaper
                                pointerEvents="none"
                                editable={false}
                                label="Tanggal Lahir"
                                mode="outlined"
                                value={
                                    bornDateHook
                                        ? dayjs(bornDateHook).format(
                                              "DD MMMM YYYY"
                                          )
                                        : ""
                                }
                            />
                        </TouchableOpacity>
                        {showDate && (
                            <Stack>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    is24Hour
                                    mode="date"
                                    display="default"
                                    onChange={(_, date) => {
                                        console.log("DateTimePicker", date);
                                        setShowDate(false);
                                        setDate(date);
                                        handleBornDateSave();
                                    }}
                                />
                            </Stack>
                        )}

                        <ErrorMessage
                            errors={formState.errors}
                            name="born_date"
                            render={({ message }) => (
                                <HelperText
                                    type="error"
                                    visible={!!message}
                                    style={{ fontSize: 12 }}>
                                    {message}
                                </HelperText>
                            )}
                        />
                    </Stack>

                    <TextInput
                        multiline
                        name="address"
                        label="Alamat"
                        mode="outlined"
                        control={control}
                    />
                    <PaperDropdown
                        label="Rank"
                        name="rank_id"
                        list={ranksDropDown}
                        control={control}
                        mode="outlined"
                    />
                    <PaperDropdown
                        label="Status"
                        name="status_id"
                        list={statusesDropDown}
                        control={control}
                        mode="outlined"
                    />
                    {isLoading ? (
                        <ActivityIndicator animating />
                    ) : (
                        <Button
                            onPress={handleSubmit(onSubmit)}
                            mode="contained-tonal">
                            Submit
                        </Button>
                    )}
                </Stack>
            </ScrollView>
        </Stack>
    );
};

export default Detail;
