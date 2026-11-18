import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "./TabsNavigator";
import AuthNavigator from "./AuthNavigator";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import ArticleDetailsHeader from "../components/blog/ArticleDetailsHeader";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

const Stack = createStackNavigator();

// TODO reuse Routes contanst
export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: TYPOGRAPHY.fontFamily.semiBold,
                fontSize: TYPOGRAPHY.fontSize.xxl,
                color: COLORS.text,
            },
        }}>
            <Stack.Screen
                name="Main"
                component={TabsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Auth"
                component={AuthNavigator}
                options={{
                    headerShown: false,
                }}
            />
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
                        paddingLeft: SPACING.lg,
                    },
                    headerRightContainerStyle: {
                        paddingRight: SPACING.lg,
                    },
                    headerRight: () => <ArticleDetailsHeader />
                }}
            />
        </Stack.Navigator>
    );
}
