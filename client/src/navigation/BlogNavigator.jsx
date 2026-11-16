import { createStackNavigator } from "@react-navigation/stack";
import BlogScreen from "../screens/BlogScreen";
import { BORDERS, COLORS, TYPOGRAPHY } from "../theme";

const Stack = createStackNavigator();

export default function BlogNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
            headerTitleStyle: {
                fontFamily: TYPOGRAPHY.fontFamily.semiBold,
                fontSize: TYPOGRAPHY.fontSize.xxl,
                color: COLORS.text,
            },
        }}>
            <Stack.Screen
                name="Blog"
                component={BlogScreen}
                options={{
                    title: "Blog",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        borderBottomWidth: BORDERS.width.thin,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTitleStyle: {
                        fontSize: TYPOGRAPHY.fontSize.xxl,
                        color: COLORS.text,
                    }
                }}
            />
        </Stack.Navigator>
    );
}