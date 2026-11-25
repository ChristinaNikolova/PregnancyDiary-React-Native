import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import { BORDERS, COLORS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function ProfileRow({
    id,
    title,
    iconName,
    iconSize,
    iconColor,
    handlePress,
}) {
    return (
        <Pressable
            style={styles.item}
            onPress={handlePress}
        >
            <View style={styles.itemView}>
                <Icon
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                />
                <Text style={styles.text}>{title}</Text>
            </View>
            {id !== "logout" && (
                <Icon
                    name="chevron-forward"
                    size={SIZES.iconSmall}
                    color={COLORS.textSecondary}
                />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 58,
        borderBottomWidth: BORDERS.width.thin,
        borderBottomColor: COLORS.border,
    },
    itemView: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
    },
    text: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.text,
    },
});