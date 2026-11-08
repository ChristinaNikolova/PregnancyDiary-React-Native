import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import DiariesScreen from "../screens/DiariesScreen";
import AddScreen from "../screens/AddSreen";
import BlogScreen from "../screens/BlogScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function RootNavigator() {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen name="HomeTab" component={HomeNavigator} options={{ headerShown: false }} />
            <Tabs.Screen name="Diaries" component={DiariesScreen} />
            <Tabs.Screen name="Add" component={AddScreen} />
            <Tabs.Screen name="Blog" component={BlogScreen} />
            <Tabs.Screen name="Profile" component={ProfileScreen} />
        </Tabs.Navigator>
    );
}