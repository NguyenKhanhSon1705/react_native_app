
import TabBar from "@/components/tabs/Tabbar";
import { Tabs } from "expo-router";
const _LayoutTabs = () => {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="test"
                options={{
                    title: "grid-view",
                }}
            />

            {/* <Tabs.Screen
                name="tables"
                options={{
                    title: "menu",
                }}
            /> */}
        </Tabs>
    );
};

export default _LayoutTabs;