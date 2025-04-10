import { Text, View } from "react-native"
import TabbarBottonEven from "./TabbarBottomEven"
import styled from "styled-components"
// import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Container = styled(View)`
    position: absolute;
    bottom: 0;
    flex-direction: row;
    background-color: #fff;
    padding: 30px 0;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
`;

const TabBar: React.FC<any> = ({ state , descriptors , navigation}) => {

    
    return (
        <Container
        style = {{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
        }}
        >
            {
                state.routes.map((route: any , index: number) => {
                    const isFocus = state.index === index
                    const { options } = descriptors[route.key]
                    const onPress = () =>{
                        const even = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        })
                        if(!isFocus && !even.defaultPrevented)
                        navigation.navigate(route.name , route.params)
                    }
                    return (
                        <TabbarBottonEven
                            routename={route.name}
                            key={route.key}
                            icon= {options.title}
                            color={isFocus ? "#ff7f30" : "#c6c6c6"} 
                            label={route.name}
                            onPress = {onPress} 
                            />
                    )
                })
            }
        </Container>
    )
}

export default TabBar;