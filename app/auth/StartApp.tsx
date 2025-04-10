import { StyleSheet, Text, View } from "react-native"
import { Avatar, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import logo from '../../assets/logo1.png';
import routes_path from "@/routes/routes_path";
import { useTranslate } from "@/utils/hooks/useTranslate";
import Languages from "@/components/languages";
const StartApp = () => {
    const router = useRouter()
    const textConfig = useTranslate();
    const nextPage = () => {
        // router.push(routes_path.LOGIN)
        router.push("(tabs)")
    }
    
    return (
        <View style={style.container}>
            <Avatar.Image 
            source={logo} 
            size={200}
            style={{ backgroundColor: "transparent"}}
            ></Avatar.Image>
            <Text>{textConfig("00003")}</Text>
            <View style={style.button}>
                <Button
                    onPress={nextPage}
                    contentStyle={{ flexDirection: "row-reverse" }}
                    labelStyle={{ fontSize: 18, padding: 4 }}
                    icon='account-arrow-right-outline'
                    mode={"outlined"}
                >{textConfig("00005")}</Button>
            </View>
        </View>
    )
}

export default StartApp;
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        position: "absolute",
        bottom: 40,
        width: 300
    }
})