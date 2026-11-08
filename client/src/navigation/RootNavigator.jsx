import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";

export default function RootNavigator() {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen name="HomeTab" component={HomeNavigator} options={{ headerShown: false }} />
        </Tabs.Navigator>
    );
}