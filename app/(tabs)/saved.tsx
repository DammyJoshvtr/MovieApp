import { Image, View } from "react-native";

import { images } from "@/constants/images";


const Save = () => {
  return (
		<View className=" bg-primary flex-1 flex-col">
			<Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

		</View>
  );
};

export default Save;