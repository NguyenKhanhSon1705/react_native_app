import env from "@/constant/envConstant";
import { ILoginRequestData } from "@/interfaces/auth/LoginType";
import routes_path from "@/routes/routes_path";
import authService from "@/services/authService";
import { COLORS } from "@/themes/ThemeGlobal";
import accessToken from "@/utils/functions/accessToken";
import { useTranslate } from "@/utils/hooks/useTranslate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native"
import { Button, Checkbox, TextInput } from "react-native-paper"
import Toast from "react-native-toast-message";
import styled from "styled-components";
import * as Yup from "yup";

const CustomFogotPassowrd = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
`
const CustomCheckbox = styled(View)`
    border: 1px solid #e3ebf2;
    border-radius: 8px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items:center;
    justify-content:center;
`

const FormLogin: React.FC = () => {
    const textConfig = useTranslate();
    const schema = Yup.object().shape({
        email: Yup.string().email(textConfig("00013")).required(textConfig("00014")),
        password: Yup.string().min(3, textConfig("00016")).required(textConfig("00015")),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false)

    const onSubmit = async (data: ILoginRequestData) => {
        setLoading(true);
        const result = await authService.login(data)
        if(result.data.isSuccess){
            Toast.show({
                text1: textConfig("00018"),
                text2: result.data.message,
                type: "success",
            });
            await accessToken.setAccessToken(result.data.data.accessToken)
            router.push(routes_path.CHOOSESHOP)
            setLoading(false);
        }else{
            Toast.show({
                text1: textConfig("00018"),
                text2: result.data.message,
                type: "error",
            });
            setLoading(false);
        }
    };
    return (
        <View>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        theme={{
                            roundness: 10,
                        }}
                        textColor='#4c4e57'
                        label="Email"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        error={!!errors.email}
                        outlineColor='#fff'
                        activeOutlineColor="#857979"
                        style={{
                            marginTop: 15,
                        }}
                    />
                )}
            />
            {errors.email && <Text style={{ color: COLORS.danger }}>{errors.email.message}</Text>}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        theme={{
                            roundness: 10, // Bo góc input
                        }}
                        textColor='#4c4e57'
                        label={textConfig("00011")}
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        error={!!errors.password}
                        outlineColor='#fff'
                        activeOutlineColor="#857979"
                        secureTextEntry
                        style={{
                            marginTop: 15
                        }}
                    />
                )}
            />
            {errors.email && <Text style={{ color: COLORS.danger }}>{errors.password?.message}</Text>}
            <CustomFogotPassowrd>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>

                    <CustomCheckbox >
                        <Checkbox
                            onPress={() => setChecked(!checked)}
                            status={checked ? "checked" : "unchecked"}
                            color="#cccc"
                        ></Checkbox>
                    </CustomCheckbox>
                    <Text style={{ marginLeft: 5 }}>{textConfig("00007")}</Text>
                </View>
                <Text>{textConfig("00008")}</Text>
            </CustomFogotPassowrd>
            <View style={{ marginTop: 10 }}>
                <Button
                    loading={loading}
                    disabled={loading}
                    mode="outlined"
                    onPress={handleSubmit(onSubmit)}
                    textColor="white"
                    style={{
                        borderRadius: 10,
                        padding: 4,
                        backgroundColor: "#ff7622",
                        borderColor: 'transparent',

                    }}
                >{textConfig("00001")}</Button>
            </View>
        </View>

    )
}
export default FormLogin