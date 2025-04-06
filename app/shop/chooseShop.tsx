import { FC, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import ChooseShopItem from "./components/chooseShopItem";
import { useRouter } from "expo-router";
import ButtonBack from "@/components/buttonBack";
import { useDispatch, useSelector } from "react-redux";
import shopAction from "@/stores/shopStore/shopThunks";
import { AppDispatch, RootState } from "@/stores";
import { IShopData } from "@/interfaces/shop/shopDTO";

const Container = styled(View)`
    /* margin-top: 20px; */
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

    const handleGotoShop = (id: any) => {
        console.log(id)
    }
    

    return (
        <Container>
            <ContainerHeader>
                <ButtonBack
                    iconName="angle-left"
                    size={36}
                    color="#272b3b"
                    onPress={() => router.back()} />
                <ButtonBack
                    iconName="plus"
                    size={36}
                    color="#272b3b"
                />
            </ContainerHeader>
            {
                shopData.map((item: IShopData) => (
                    <ChooseShopItem
                        key={item.id}
                        propsItem={item}
                        onPressIdShop={handleGotoShop}
                    />
                ))
            }
        </Container>
    );
};

export default ChooseShop