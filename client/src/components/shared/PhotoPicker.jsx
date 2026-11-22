import { Alert, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function PhotoPicker() {
    const chooseFromGalleryHandler = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access gallery is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (result.canceled) {
            // handle cancellation
            return;
        }

        onChange(result.assets[0].uri);
        // if imageUri => automatically image preview
    };

    return (
        <View>HI</View>
    )
}