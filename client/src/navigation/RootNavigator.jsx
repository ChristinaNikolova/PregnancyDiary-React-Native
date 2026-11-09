import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "./TabsNavigator";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
        </Stack.Navigator>
    );
}
