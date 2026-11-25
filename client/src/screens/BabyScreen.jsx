import { StyleSheet, View } from "react-native";
import BabyOnTheWay from "../components/baby/BabyOnTheWay";
import BabyProfile from "../components/baby/BabyProfile";
import { COLORS } from "../theme";

export default function BabyScreen({ route }) {
    const diaryId = route.params.diaryId;
    const isBabyBorn = route.params.isBabyBorn;

    return (
        <View style={styles.container}>
            {!isBabyBorn ?
                <BabyProfile diaryId={diaryId} /> :
                <BabyOnTheWay />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});