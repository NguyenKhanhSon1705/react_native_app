import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text } from "react-native";

interface ITabBarBottonProps extends PressableProps{
    label: string,
    routename: string,
    color: string,
    icon?: any 
}

const TabbarBottonEven: React.FC<ITabBarBottonProps> = ({
    label,
    color,
    routename,
    icon,
    ...props
}) => {
    return (
        <Pressable 
        {...props}
        style={{
            flex: 1,
            justifyContent:"center",
            alignItems:"center",
        }}
        >
             <MaterialIcons name={icon ?? "grid-view"} size={26} color={color}/> 
        </Pressable>
    )
}

export default TabbarBottonEven;