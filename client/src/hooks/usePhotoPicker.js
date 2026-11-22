
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export default function usePhotoPicker({ onChange }) {
    const chooseFromGalleryHandler = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission required", "Access to your photos is required.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;

        onChange(result.assets[0].uri);
    };

    const takePhotoHandler = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission required", "Camera access is required.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;

        onChange(result.assets[0].uri);
    };

    const showPickerOptions = () => {
        Alert.alert("Select a photo", "Choose an option:", [
            { text: "Gallery", onPress: chooseFromGalleryHandler },
            { text: "Camera", onPress: takePhotoHandler },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    return { showPickerOptions };
}
