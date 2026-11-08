import { createStackNavigator } from "@react-navigation/stack";
import ArticleDetails from "../screens/ArticleDetailsScreen";
import BlogScreen from "../screens/BlogScreen";

const Stack = createStackNavigator();

export default function BlogNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
        }}>
            <Stack.Screen name="Blog" component={BlogScreen} options={{ title: "Блог" }} />
            <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
        </Stack.Navigator>
    );
}