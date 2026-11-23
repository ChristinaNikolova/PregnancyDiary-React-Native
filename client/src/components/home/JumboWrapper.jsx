import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../shared/PrimaryButton';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

export default function JumboWrapper({
    title,
    buttonText,
    handlePress,
    children
}) {
    return (
        <ImageBackground
            source={require('../../assets/images/welcome.png')}
            resizeMode="cover"
        >
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
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
        backgroundColor: COLORS.clearBackground,
    },
    title: {
        marginBottom: SPACING.sm,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        textAlign: 'center',
        color: COLORS.text,
    },
});
