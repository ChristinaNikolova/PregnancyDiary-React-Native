import { Share } from "react-native"

export const triggerShare = async (id, title) => {
    await Share.share({
        title,
        message: title,
        url: `https://your-domain.com/articles/${id}`,
    });
}