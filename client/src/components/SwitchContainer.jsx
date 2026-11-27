import { StyleSheet, Switch, View } from "react-native";
import useThemeContext from "../contexts/theme/useThemeContext";

export default function SwitchContainer({ switchValue, onPress }) {
    const { theme } = useThemeContext();

    return (
        <View style={styles.container}>
            <Switch
                value={switchValue}
                onValueChange={onPress}
                trackColor={{
                    false: theme.colors.border,
                    true: theme.colors.primary,
                }}
                thumbColor={theme.colors.white}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});