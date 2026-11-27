import { StyleSheet, Switch, View } from "react-native";
import { COLORS } from "../theme";

export default function SwitchContainer({ switchValue, onPress }) {
    return (
        <View style={styles.container}>
            <Switch
                value={switchValue}
                onValueChange={onPress}
                trackColor={{
                    false: COLORS.border,
                    true: COLORS.primary,
                }}
                thumbColor={COLORS.white}
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