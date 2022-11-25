/* eslint-disable react/prop-types */
import { Button, ScrollView, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Appbar,
    HelperText,
    TextInput as TextInputRNPaper,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, View, Image } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";

import PaperDropdown from "../../components/picker/PaperDropdown";
import validationSchema from "./validationSchema";
import TextInput from "../../components/text-input/TextInput";
import dayjs from "dayjs";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

const Detail = ({
    initialValues = {},
    ranks = [],
    statuses = [],
    isLoading,
    images,
    onSubmit,
    onBackPress,
}) => {
    const navigation = useNavigation();
    // const initialValues = {
    //     nrp: "",
    //     name: "",
    //     born_place: "",
    //     born_date: null,
    //     address: "",
    //     rank_id: "",
    //     status_id: "",
    // };
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
    const imageHook = useWatch({
        control,
        name: "image",
    });

    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1,
                allowsEditing: true,
            });
            console.log("result", result);
            if (!result.cancelled) {
                // setValue("image", result.assets[0], { shouldValidate: true });
                setImage(result.uri);
            }
        } catch (e) {
            console.log("err", e);
        }
    };

    const handleBornDateSave = () => {
        setValue("born_date", date, { shouldValidate: true });
        setShowDate(false);
    };

    useEffect(() => {
        register("born_date");
        register("image");
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
                        list={ranks}
                        control={control}
                        mode="outlined"
                        dropdownStyle={{
                            marginBottom: 16,
                        }}
                    />
                    <PaperDropdown
                        label="Status"
                        name="status_id"
                        list={statuses}
                        control={control}
                        mode="outlined"
                        dropdownStyle={{
                            marginBottom: 16,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        {image && (
                            <Image
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                                alt="img-content"
                                borderRadius={8}
                                source={{ uri: image }}
                                resizeMode="cover"
                            />
                        )}
                        <ErrorMessage
                            errors={formState.errors}
                            name="image"
                            render={({ message }) => (
                                <HelperText
                                    type="error"
                                    visible={!!message}
                                    style={{ fontSize: 12 }}>
                                    {message}
                                </HelperText>
                            )}
                        />
                        <Button onPress={pickImage}>Pick Image</Button>
                    </View>
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
