import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../theme/colors";

export default function Tag({ text }) {
    return (
        <View style={styles.tagWrapper}>
            <Text style={styles.tagText}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagWrapper: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    tagText: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: "600",
    },
});