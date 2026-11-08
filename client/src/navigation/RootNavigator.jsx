import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import HomeScreen from "../screens/HomeScreen";

export default function RootNavigator() {
    const Tabs = createNativeBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={HomeScreen} />
        </Tabs.Navigator>
    );
}