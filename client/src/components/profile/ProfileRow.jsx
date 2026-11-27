import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../shared/Icon";
import SwitchContainer from "../SwitchContainer";
import useThemeContext from "../../contexts/theme/useThemeContext";
import { BORDERS, SIZES, SPACING, TYPOGRAPHY } from "../../theme";

export default function ProfileRow({
    id,
    title,
    iconName,
    iconSize,
    iconColor,
    isSwitch = false,
    switchValue = false,
    handlePress,
}) {
    const { theme } = useThemeContext();

    return (
        <Pressable
            style={[styles.item, { borderBottomColor: theme.colors.border, }]}
            onPress={handlePress}
        >
            <View style={styles.itemView}>
                <Icon
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                />
                <Text style={[styles.text, { color: theme.colors.text }]}>{title}</Text>
            </View>
            {isSwitch ? (
                <SwitchContainer
                    switchValue={switchValue}
                    onPress={handlePress}
                />
            ) : id !== "logout" ? (
                <Icon
                    name="chevron-forward"
                    size={SIZES.iconSmall}
                    color={theme.colors.textSecondary}
                />
            ) : null}
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
    },
    itemView: {
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
    },
    text: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
    },
});