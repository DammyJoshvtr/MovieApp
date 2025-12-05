import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps extends Movie {
  addMovie?: () => void;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  addMovie
}: MovieCardProps) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-xs text-light-300 font-medium">
            {release_date?.split("-")[0]}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setActive(!active);
              addMovie?.(); //same as "addMovie && addMovie()"
              // if addMovie Exists call it, if not ignore...all these because addMovie is optional in the interface
            }}
            className={`${active ? 'bg-green-500' : 'bg-gray-300'} p-1 rounded-full`}
          >
            <CheckCircle 
              color={active ? 'white' : 'black'} 
              size={15} 
              strokeWidth={1.3} 
            />
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
