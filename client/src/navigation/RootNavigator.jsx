import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "./TabsNavigator";
import AuthNavigator from "./AuthNavigator";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import CreateDiaryScreen from "../screens/CreateDiaryScreen";
import UpdateMyProfileScreen from "../screens/UpdateMyProfileScreen";
import ArticleDetailsHeader from "../components/blog/ArticleDetailsHeader";
import useAuthContext from "../contexts/auth/useAuthContext";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

const Stack = createStackNavigator();

// TODO reuse Routes contanst
export default function RootNavigator() {
    const { isAuthenticated, isLoaded } = useAuthContext();

    if (!isLoaded) {
        return null;
    }

    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: TYPOGRAPHY.fontFamily.semiBold,
                fontSize: TYPOGRAPHY.fontSize.xxl,
                color: COLORS.text,
            },
        }}>
            {!isAuthenticated ?
                <Stack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{
                        headerShown: false,
                    }}
                /> :
                <>
                    <Stack.Screen
                        name="Main"
                        component={TabsNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="CreateDiary"
                        component={CreateDiaryScreen}
                    />
                    <Stack.Screen
                        name="UpdateMyProfile"
                        component={UpdateMyProfileScreen}
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
                </>
            }
        </Stack.Navigator>
    );
}
