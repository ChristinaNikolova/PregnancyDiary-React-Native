import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "./TabsNavigator";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import ArticleDetailsHeader from "../components/ArticleDetailsHeader";
import { COLORS } from "../theme/colors";

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen
                name="ArticleDetails"
                component={ArticleDetailsScreen}
                options={{
                    headerTintColor: COLORS.text,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        height: 120,
                    },
                    headerBackTitle: false,
                    headerLeftContainerStyle: {
                        paddingLeft: 16,
                    },
                    headerRightContainerStyle: {
                        paddingRight: 16,
                    },
                    headerRight: () => ArticleDetailsHeader
                }}
            />
        </Stack.Navigator>
    );
}
