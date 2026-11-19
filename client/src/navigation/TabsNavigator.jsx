import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import BlogNavigator from "./BlogNavigator";
import DiariesScreen from "../screens/DiariesScreen";
import AddScreen from "../screens/AddScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "../components/shared/Icon";
import { triggerHaptic } from "../utils/native-helpers/haptics";
import { BORDERS, COLORS, TYPOGRAPHY } from "../theme";

const Tabs = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenListeners={{
                tabPress: () => triggerHaptic(),
            }}
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                },
                headerTitleStyle: {
                    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
                    fontSize: TYPOGRAPHY.fontSize.xxl,
                    color: COLORS.text,
                },
            }}>
            <Tabs.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) =>
                        <Icon
                            name="home-outline"
                            size={size}
                            color={color}
                        />,
                }}
            />
            <Tabs.Screen
                name="Diaries"
                component={DiariesScreen}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <Icon
                            name="calendar-outline"
                            size={size}
                            color={color}
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
                        borderRadius: BORDERS.radius.xxl,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    tabBarIcon: ({ color, size }) =>
                        <Icon
                            name="add-outline"
                            size={size}
                            color={color}
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
                            name="newspaper-outline"
                            size={size}
                            color={color}
                        />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <Icon
                            name="person-outline"
                            size={size}
                            color={color}
                        />,
                }}
            />
        </Tabs.Navigator>
    );
}