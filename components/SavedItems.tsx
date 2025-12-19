import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SavedItems = ({
  id,
  title,
  poster_url,
  release_date,
  vote_average,
}: SavedMovieUI) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity>
        <View className="w-full flex-row gap-4 p-3 mb-4 rounded-xl">
          {/* Poster */}
          <Image
            source={{ uri: poster_url }}
            className="w-28 h-40 rounded-lg"
            resizeMode="cover"
          />

          {/* Details */}
          <View className="flex-1 justify-between">
            {/* Title */}
            <Text
              className="text-white text-base font-semibold"
              numberOfLines={2}
            >
              {title}
            </Text>

            {/* Meta info */}
            <View className="mt-2 space-y-1">
              <Text className="text-xs text-light-300 font-medium">
                {release_date?.split("-")[0]}
              </Text>

              <View className="flex-row gap-1">
                <Image 
                source={icons.star} className="size-5"
                />
                <Text className="text-yellow-400 text-sm font-medium">
                  {vote_average.toFixed(1)}/10
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedItems;
