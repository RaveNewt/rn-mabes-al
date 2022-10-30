import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
    Button,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Text,
} from "native-base";
import { btn_add, ic_back } from "../../assets";
import { useTodoConText } from "../../context/ToDoContext";

const NewToDo = ({ navigation }) => {
    const { getNumberofTodo, addTodo } = useTodoConText();
    const [todoItem, setTodoItem] = useState("");
    const [description, setDescription] = useState("");
    const handleOnSubmit = (e) => {
        e.preventDefault();
        addTodo(todoItem);
        setTodoItem("");

        console.log("todoItem", todoItem);
        console.log("Description", description);
    };
    return (
        <Stack>
            <HStack p={4} shadow={2} justifyContent="space-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={ic_back} size={8} borderColor="black" />
                </TouchableOpacity>
                <Heading
                    fontSize="2xl"
                    alignItems={"center"}
                    textAlign="center"
                    justifyContent={"center"}
                    flex={1}
                >
                    Cart App
                </Heading>
                <Button onPress={handleOnSubmit}>Done</Button>
            </HStack>
            <Stack paddingX={8}>
                <Stack>
                    <Text marginTop={8}>Name</Text>
                    <Input
                        marginTop={2}
                        placeholder="please insert yourname"
                        value={todoItem}
                        onChange={(e) => setTodoItem(e.target.value)}
                    ></Input>
                </Stack>
                <Stack>
                    <Text marginTop={8}>Description</Text>
                    <Input
                        marginTop={2}
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Input>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default NewToDo;

const styles = StyleSheet.create({});
