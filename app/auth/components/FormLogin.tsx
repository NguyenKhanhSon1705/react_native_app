import { ILoginRequestData } from "@/interfaces/auth/LoginType";
import { COLORS } from "@/themes/ThemeGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {  Text, View } from "react-native"
import { Button, Checkbox, TextInput } from "react-native-paper"
import styled from "styled-components";
import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: Yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
});

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
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [checked, setChecked] = useState<boolean>(false)

    const onSubmit = (data: ILoginRequestData) => {
        console.log("Dữ liệu hợp lệ:", data);
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
                        label="Mật khẩu"
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
                    <Text style={{ marginLeft: 5 }}>Nhớ tài khoản</Text>
                </View>
                <Text>Quên mật khẩu?</Text>
            </CustomFogotPassowrd>
            <View style={{ marginTop: 10 }}>
                <Button
                    mode="outlined"
                    onPress={handleSubmit(onSubmit)}
                    textColor="white"
                    style={{
                        borderRadius: 10,
                        padding: 4,
                        backgroundColor: "#ff7622",
                        borderColor: 'transparent',

                    }}
                >Đăng nhập</Button>
            </View>
        </View>

    )
}
export default FormLogin