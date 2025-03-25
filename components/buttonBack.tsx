import { FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const ContainerButtonBack = styled(TouchableOpacity)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 12px;
    text-align: center;
    background-color: #ecf0f4;
    border-radius: 50%;
    color: white;
`

 interface ButtonBackProps {
    iconName?: string | undefined ,
    size?: number,
    color?: string;
    onPress?: () => void;
}
const ButtonCustom: FC<ButtonBackProps> = ({onPress , iconName , size , color}) => {
    return (
        <ContainerButtonBack
        onPress={onPress}
        >
            <FontAwesome name={iconName ?? "question"} size={size} color={color} />
        </ContainerButtonBack>
    )
}

export default ButtonCustom;