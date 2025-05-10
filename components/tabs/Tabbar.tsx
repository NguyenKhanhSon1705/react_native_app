import { View, Dimensions, Animated } from "react-native";
import TabbarBottonEven from "./TabbarBottomEven";
import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";

const Container = styled.View`
    position: absolute;
    bottom: 0;
    flex-direction: row;
    background-color: #fff;
    padding: 25px 0 10px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
`;

const screenWidth = Dimensions.get("window").width;

const TabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
    const tabWidth = screenWidth / state.routes.length;
    const translateX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = tabWidth - 50;
    const offset = (tabWidth - indicatorWidth) / 2;
    useEffect(() => {
        Animated.spring(translateX, {
            toValue: state.index * tabWidth,
            useNativeDriver: true,
        }).start();
    }, [state.index]);

    return (
        <Container
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
            }}
        >
            {state.routes.map((route: any, index: number) => {
                const isFocus = state.index === index;
                const { options } = descriptors[route.key];

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocus && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <TabbarBottonEven
                        routename={route.name}
                        key={route.key}
                        icon={options.title}
                        color={isFocus ? "#ff7f30" : "#c6c6c6"}
                        label={route.name}
                        onPress={onPress}
                    />
                );
            })}

            {/* Indicator dưới tab */}
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 3,
                    width: indicatorWidth,
                    backgroundColor: "#ff7f30",
                    borderRadius: 1,
                    transform: [{ translateX: Animated.add(translateX, new Animated.Value(offset)) }],
                }}
            />
        </Container>
    );
};

export default TabBar;
