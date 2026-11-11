import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "./TabsNavigator";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import { Pressable, View } from "react-native";
import { COLORS } from "../theme/colors";
import CustomIcon from "../components/shared/CustomIcon";

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
                    // todo extract component?
                    headerRight: () => (
                        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", }}>
                            <Pressable>
                                <CustomIcon iconName="heart-outline" />
                            </Pressable>
                            <Pressable>
                                <CustomIcon iconName="share-outline" />
                            </Pressable>
                        </View>
                    )
                }}
            />
        </Stack.Navigator>
    );
}
