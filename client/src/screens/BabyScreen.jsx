import { StyleSheet, View } from "react-native";
import BabyOnTheWay from "../components/baby/BabyOnTheWay";
import BabyProfile from "../components/baby/BabyProfile";
import useThemeContext from "../contexts/theme/useThemeContext";

export default function BabyScreen({ route }) {
    const { theme } = useThemeContext();

    const diaryId = route.params.diaryId;
    const babyId = route.params.babyId;
    const isBabyBorn = route.params.isBabyBorn;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {isBabyBorn ?
                <BabyProfile babyId={babyId} /> :
                <BabyOnTheWay diaryId={diaryId} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});