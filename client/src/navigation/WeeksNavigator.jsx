// todo add navigators for profile and diary

import { createStackNavigator } from "@react-navigation/stack";
import WeeksScreen from "../screens/WeeksScreen";

const Stack = createStackNavigator();

export default function WeeksNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Weeks" component={WeeksScreen} />
        </Stack.Navigator>
    );
}