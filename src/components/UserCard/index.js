import React from "react";
import { Avatar, Card } from "react-native-paper";

const UserCard = ({ user, onPress, name, rank }) => {
    return (
        <Card
            mode="elevated"
            onPress={onPress}
            style={{
                borderRadius: 16,
                margin: 12,
            }}>
            <Card.Title
                title={name ?? ""}
                titleStyle={{
                    fontWeight: "bold",
                    fontSize: 18,
                }}
                subtitle={rank ?? ""}
                subtitleVariant="bodyMedium"
                left={(props) => (
                    <Avatar.Image
                        {...props}
                        size={46}
                        source={{ uri: user.image }}
                    />
                )}
            />
        </Card>
    );
};

export default UserCard;
