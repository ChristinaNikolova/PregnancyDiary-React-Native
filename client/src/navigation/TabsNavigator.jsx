import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import BlogNavigator from "./BlogNavigator";
import DiariesScreen from "../screens/DiariesScreen";
import AddScreen from "../screens/AddScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomIcon from "../components/shared/CustomIcon";

const Tabs = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) =>
                        <CustomIcon
                            iconName="home-outline"
                            iconSize={size}
                            iconColor={color}
                        />,
                }}
            />
            <Tabs.Screen
                name="Diaries"
                component={DiariesScreen}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <CustomIcon
                            iconName="calendar-outline"
                            iconSize={size}
                            iconColor={color}
                        />,
                }} />
            <Tabs.Screen
                name="Add"
                component={AddScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) =>
                        <CustomIcon
                            iconName="add-outline"
                            iconSize={size}
                            iconColor={color}
                        />,
                }}
            />
            <Tabs.Screen
                name="BlogTab"
                component={BlogNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) =>
                        <CustomIcon
                            iconName="newspaper-outline"
                            iconSize={size}
                            iconColor={color}
                        />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <CustomIcon
                            iconName="person-outline"
                            iconSize={size}
                            iconColor={color}
                        />,
                }}
            />
        </Tabs.Navigator>
    );
}