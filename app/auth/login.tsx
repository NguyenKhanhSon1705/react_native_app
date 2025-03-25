
import { Platform, Text, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components";
import FormLogin from "./components/FormLogin";
import { FontAwesome } from "@expo/vector-icons";
import Languages from "@/components/languages";
import { useEffect } from "react";
import { useTranslate } from "@/utils/hooks/useTranslate";
import { COLORS } from "@/themes/ThemeGlobal";
const Container = styled(View)`
    position: relative;
    flex: 1;
    width: 100%;
`
const ContainerHead = styled(View)`
    height: 40%;
    background-color: #121223;
    justify-content: center;
    align-items: center;
`
const ContainerBody = styled(View)`
     position: absolute;
        top: 30%;
        left: 0;
        right: 0;
        padding: 20px;
        height: 100%;
        background-color: #fff;
        border-top-right-radius: 30px;
        border-top-left-radius: 30px;
`
const ContainerBodyFooter = styled(View)`
    margin-top: 30px;
    align-items: center;
    justify-content: center;
`
const ContainerIcon = styled(View)`
    display: flex;
    flex-direction: row;
`
const BoxIcon = styled(View) <{ bgColor?: string }>`
    margin: 12px 12px;
    background-color:${(props) => props.bgColor || "blue"};
    width: 60px;
    height:60px;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
`
const ContainerLanguage = styled(View)`
    position: absolute;
    top: ${Platform.OS === 'ios' ? '40px' : '30px'};
    right: 20px;
    z-index: 1;
`


const Login = () => {
    const textConfig = useTranslate()
    return (
        <TouchableWithoutFeedback >
            <Container>
                <ContainerLanguage>
                    <Languages/>
                </ContainerLanguage>
                <ContainerHead >
                    <Text
                        style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{textConfig("00001")}</Text>
                    <Text style={{ color: 'white', fontSize: 14 }}>{textConfig("00006")}</Text>
                </ContainerHead>
                <ContainerBody>
                    <FormLogin />
                    <ContainerBodyFooter>
                        <Text>
                            {textConfig("00009") }<Text style={{ fontWeight: 'bold', color: '#2196F3' }}>{textConfig("00010")}</Text>
                        </Text>
                        <Text style={{ marginTop: 10 }}>{textConfig("00012")}</Text>
                        <ContainerIcon>
                            <BoxIcon bgColor={COLORS.bg_facebook}>
                                <FontAwesome color={COLORS.white} name="facebook" size={34}></FontAwesome>
                            </BoxIcon>
                            <BoxIcon bgColor={COLORS.bg_twitter}>
                                <FontAwesome color={COLORS.white} name="twitter" size={34}></FontAwesome>
                            </BoxIcon>
                            <BoxIcon bgColor={COLORS.bg_apple}>
                                <FontAwesome color={COLORS.white} name="apple" size={34}></FontAwesome>
                            </BoxIcon>
                        </ContainerIcon>
                    </ContainerBodyFooter>
                </ContainerBody>
            </Container>
        </TouchableWithoutFeedback>
    )
}
export default Login