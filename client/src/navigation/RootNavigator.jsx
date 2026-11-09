import { createStackNavigator } from "@react-navigation/stack";
import TabsNavigator from "./TabsNavigator";
import ArticleDetailsScreen from "../screens/ArticleDetailsScreen";
import { Pressable, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

// TODO extract values as constants
const ICON_SIZE = 24

const Stack = createStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen
                name="ArticleDetails"
                component={ArticleDetailsScreen}
                options={{
                    headerTintColor: "#49372F",
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: "#FAF5EF",
                        height: 120,
                    },
                    headerBackTitle: false,
                    headerLeftContainerStyle: {
                        paddingLeft: 16,
                    },
                    headerRightContainerStyle: {
                        paddingRight: 16,
                    },
                    headerRight: ({ tintColor }) => (
                        <View style={{ flexDirection: "row", gap: 20, justifyContent: "center", }}>
                            <Pressable>
                                <Ionicons
                                    name="heart-outline"
                                    size={ICON_SIZE}
                                    color={tintColor} />
                            </Pressable>
                            <Pressable>
                                <Ionicons
                                    name="share-outline"
                                    size={ICON_SIZE}
                                    color={tintColor} />
                            </Pressable>
                        </View>
                    )
                }}
            />
        </Stack.Navigator>
    );
}
