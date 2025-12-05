import React from "react";
import { Image, Text, View } from "react-native";

const SavedItems = ({ title, poster_url }: SavedMovies) => {
  return (
    <View className="w-1/2 p-3">
      <Image
        source={{uri: poster_url}}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />

      <Text
        className="text-white mt-2 text-sm font-semibold"
        numberOfLines={2}
      >
        {title}
      </Text>
    </View>
  );
};

export default SavedItems;
