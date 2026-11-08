import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import DiariesScreen from "../screens/DiariesScreen";
import AddScreen from "../screens/AddScreen";
import BlogScreen from "../screens/BlogScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@react-native-vector-icons/ionicons";

const Tabs = createBottomTabNavigator();

export default function RootNavigator() {
    return (
        <Tabs.Navigator screenOptions={{
            headerTitleAlign: "left",
        }}>
            <Tabs.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="Diaries"
                component={DiariesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
                }} />
            <Tabs.Screen
                name="Add"
                component={AddScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, size }) => <Ionicons name="add-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="Blog"
                component={BlogScreen}
                options={{
                    title: "Блог",
                    tabBarIcon: ({ color, size }) => <Ionicons name="newspaper-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
                }}
            />
        </Tabs.Navigator>
    );
}