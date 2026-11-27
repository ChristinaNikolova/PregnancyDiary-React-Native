import { StyleSheet, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import JumboWrapper from './JumboWrapper';
import useThemeContext from '../../contexts/theme/useThemeContext';
import { SPACING, TYPOGRAPHY } from '../../theme';

// todo constants
export default function JumboStart() {
    const navigation = useNavigation();
    const { theme } = useThemeContext();

    const handlePress = () => {
        navigation.navigate("CreateDiary")
    }

    return (
        <JumboWrapper
            title=" You don't have a diary yet?"
            buttonText="Create Diary"
            handlePress={handlePress}
        >
            <Text style={[styles.description, { color: theme.colors.text }]}>
                Create your pregnancy diary and keep all your precious moments in one place.
            </Text>
        </JumboWrapper>
    );
}

const styles = StyleSheet.create({
    description: {
        marginBottom: SPACING.xl,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.md,
        textAlign: 'center',
    },
});