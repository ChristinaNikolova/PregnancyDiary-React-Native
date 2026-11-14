import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import BlogNavigator from "./BlogNavigator";
import DiariesScreen from "../screens/DiariesScreen";
import AddScreen from "../screens/AddScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "../components/shared/Icon";
import { COLORS } from "../theme";

const Tabs = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tabs.Navigator screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textSecondary,
            tabBarStyle: {
                backgroundColor: COLORS.surface,
            },
        }}>
            <Tabs.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) =>
                        <Icon
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
                        <Icon
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
                    tabBarIconStyle: {
                        backgroundColor: COLORS.secondary,
                        width: 40,
                        height: 40,
                        borderRadius: 26,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    tabBarIcon: ({ color, size }) =>
                        <Icon
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
                    title: "Blog",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) =>
                        <Icon
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
                        <Icon
                            iconName="person-outline"
                            iconSize={size}
                            iconColor={color}
                        />,
                }}
            />
        </Tabs.Navigator>
    );
}