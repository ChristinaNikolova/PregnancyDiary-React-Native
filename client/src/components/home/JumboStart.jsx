import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../shared/PrimaryButton';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

// todo constants
export default function JumboStart() {
    return (
        <ImageBackground
            source={require('../../assets/images/welcome.png')}
            resizeMode="cover"
        >
            <View style={styles.content}>
                <Text style={styles.title}>
                    You don't have a diary yet?
                </Text>
                <Text style={styles.description}>
                    Create your pregnancy diary and keep all your precious moments in one place.
                </Text>
                <PrimaryButton buttonText="Create Diary" />
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
        marginBottom: SPACING.xxl,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize.xxl,
        textAlign: 'center',
        color: COLORS.text,
    },
    description: {
        marginBottom: SPACING.xl,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.md,
        textAlign: 'center',
        color: COLORS.text,
    },
});