import { createStackNavigator } from "@react-navigation/stack";
import BlogScreen from "../screens/BlogScreen";
import { COLORS } from "../theme/colors";

const Stack = createStackNavigator();

export default function BlogNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
        }}>
            <Stack.Screen
                name="Blog"
                component={BlogScreen}
                options={{
                    title: "Блог",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        height: 120,
                    },
                }}
            />
        </Stack.Navigator>
    );
}