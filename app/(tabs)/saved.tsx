import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images"

const Save = () => {
  return (
	<SafeAreaView className="bg-primary flex-1 px-10">
		<View className="flex-1 flex-col">
			<Image
				source={images.bg}
				className="absolute w-full z-0"
				resizeMode="cover"
			/>

		</View>
	</SafeAreaView>
  );
};

export default Save;