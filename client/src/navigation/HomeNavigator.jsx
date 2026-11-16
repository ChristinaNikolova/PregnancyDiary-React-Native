import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { COLORS, TYPOGRAPHY } from "../theme";

const Stack = createStackNavigator();

// TODO Add proper name later!!!
export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: TYPOGRAPHY.fontFamily.semiBold,
                fontSize: TYPOGRAPHY.fontSize.xxl,
                color: COLORS.text,
            },
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}