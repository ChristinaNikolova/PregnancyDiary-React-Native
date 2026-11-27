import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../shared/PrimaryButton';
import useThemeContext from '../../contexts/theme/useThemeContext';
import { SPACING, TYPOGRAPHY } from '../../theme';

export default function JumboWrapper({
    title,
    buttonText,
    handlePress,
    children
}) {
    const { theme, isDarkMode } = useThemeContext();

    const backgroundImage = isDarkMode
        ? require("../../assets/images/welcome-dark.png")
        : require("../../assets/images/welcome.png");

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
        >
            <View style={[styles.content, { backgroundColor: theme.colors.clearBackground, }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
                {children}
                <PrimaryButton
                    buttonText={buttonText}
                    handlePress={handlePress}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        width: '70%',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.xl,
    },
    title: {
        marginBottom: SPACING.sm,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        textAlign: 'center',
    },
});
