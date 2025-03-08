import { StyleSheet, Text, View } from "react-native"
import { Avatar, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import logo from '../../assets/logo1.png';
import routes_path from "@/routes/routes_path";
import { useEffect } from "react";
import languagesCookies from "@/utils/functions/languageCookies";
import env from "@/constant/envConstant";
const StartApp = () => {
    const router = useRouter()
    const ToastTest = () => {
        // router.push(routes_path.LOGIN)
        console.log(languagesCookies.getLanguageCookie());
    }

    useEffect(()=>{
        console.log('render');
        
        languagesCookies.setLanguageCookie('vi')
    },[])

    return (
        <View style={style.container}>
            <Avatar.Image 
            source={logo} 
            size={200}
            style={{ backgroundColor: "transparent"}}
            ></Avatar.Image>
            <Text>Chào mừng bạn đến với ứng dụng quản lý cửa hàng</Text>
            {/* <Languages/> */}

            <View style={style.button}>
                <Button
                    onPress={ToastTest}
                    contentStyle={{ flexDirection: "row-reverse" }}
                    labelStyle={{ fontSize: 18, padding: 4 }}
                    icon='account-arrow-right-outline'
                    mode={"outlined"}
                >Bắt đầu</Button>
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
        bottom: 0,
        width: 300
    }
})