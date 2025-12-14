import { icons } from '@/constants/icons';
import React from "react";
import { Image, Text, View } from "react-native";

const SavedItems = ({ title, poster_url, vote_average }: SavedMovies) => {
  return (
    <View className="w-full flex flex-row mb-5 p-3 gap-3 bg-red-500">
      <Image
        source={{uri: poster_url}}
        className="w-32 h-52 rounded-lg"
        resizeMode="cover"
      />

      <Text
        className="text-white mt-2 text-sm font-semibold"
        numberOfLines={2}
      >
        {title}
      </Text>

      <View className="flex-row items-center justify-start gap-x-1">
        <Image source={icons.star} className="size-4" />
        <Text className="text-xs text-white font-bold uppercase">
          {Math.round(vote_average / 2)}
        </Text>
      </View>
    </View>
  );
};

export default SavedItems;
