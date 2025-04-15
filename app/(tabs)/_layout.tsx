import TabBar from "@/components/tabs/Tabbar";
import Routes from "@/routes/route_tabs";
import { Tabs } from "expo-router";
import React from "react";
const _LayoutTabs = () => {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            {
                Routes.map(route => (
                    <Tabs.Screen
                        key={route.name}
                        name={route.name}
                        options={{
                            title: route.icon,
                        }}
                    />
                ))
            }
        </Tabs>
    );
};

export default _LayoutTabs;