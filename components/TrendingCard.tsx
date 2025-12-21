import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";


import { images } from "@/constants/images";

import { useState } from "react";

interface Addprop extends TrendingCardProps {
  addMovie?: () => void;
}
const TrendingCard = ({
  movie: { movie_id, title, poster_url }, index}: TrendingCardProps) => {

  const [active, setActive] = useState(false);

  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-[8px] px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text
            className="text-sm font-bold mt-2 text-light-200"
            numberOfLines={2}
          >
            {title}
          </Text>

        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard
