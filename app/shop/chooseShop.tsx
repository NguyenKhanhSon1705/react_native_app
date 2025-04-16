import { FC, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import ChooseShopItem from "./components/chooseShopItem";
import { useRouter } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import shopAction from "@/stores/shopStore/shopThunks";
import { AppDispatch, RootState } from "@/stores";
import { IShopData } from "@/interfaces/shop/shopDTO";
import cookiesIdShop from "@/utils/functions/cookieIdShop";
import routes_path from "@/routes/routes_path";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import BackButton from "@/components/BackButton ";

const Container = styled(SafeAreaView)`
    background-color: #fff;
`
const ContainerHeader = styled(View)`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center; 
`
const ChooseShop: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const shopData = useSelector((state: RootState) => state.shopStore.shops);

    useEffect(() => {
        dispatch(shopAction.getListShopUser());
    }, [])

    const handleGotoShop = async (id: any) => {
        await cookiesIdShop.setCookieIdShop(id);
        router.push(routes_path.TABLEAREA)
    }

    // todo feature add update shop

    return (
        <Container>
            <ContainerHeader>
                <BackButton />
                {/* <ButtonBack
                    iconName="plus"
                    size={36}
                    color="#272b3b"
                /> */}
            </ContainerHeader>
            {
                shopData.map((item: IShopData) => {
                    return (
                        <ChooseShopItem
                        key={item.id}
                        propsItem={item}
                        onPressIdShop={handleGotoShop}
                    />
                    )
                })
            }
        </Container>
    );
};

export default ChooseShop