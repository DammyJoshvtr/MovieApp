import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import {
  getAllSavedMovies,
  removeSavedMovie,
  storeSavedMovies,
} from "@/services/useMetrics";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="mt-5">
    <Text className="text-light-200 text-sm">{label}</Text>
    <Text className="text-light-100 font-bold mt-1">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [saved, setSaved] = useState(false);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  // ------------------------------
  // CHECK IF MOVIE IS SAVED
  // ------------------------------
  useEffect(() => {
    const checkSaved = async () => {
      if (!movie) return;

      const savedMovies = await getAllSavedMovies();
      const found = savedMovies.find(
        (m) => m.movie_id === movie.id
      );

      if (found) {
        setSaved(true);
        setSavedDocId(found.id);
      }
    };

    checkSaved();
  }, [movie]);

  // ------------------------------
  // SAVE / REMOVE HANDLER
  // ------------------------------
  const handleSave = async () => {
    if (!movie) return;

    if (!saved) {
      await storeSavedMovies({
        movie_id: movie.id,
        title: movie.title,
      });

      const savedMovies = await getAllSavedMovies();
      const found = savedMovies.find(
        (m) => m.movie_id === movie.id
      );

      if (found) {
        setSaved(true);
        setSavedDocId(found.id);
      }
    } else {
      if (!savedDocId) return;
      await removeSavedMovie(savedDocId);
      setSaved(false);
      setSavedDocId(null);
    }
  };

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          className="w-full h-[550px]"
        />

        <View className="px-5 mt-5">
          <View className="flex-cols items-start gap-3">
            <Text className="text-white text-xl font-bold ">
              {movie?.title}
            </Text>

            <TouchableOpacity
              onPress={handleSave}
              className={`flex-row items-center gap-2 px-4 py-2 rounded-full
                ${
                  saved
                    ? "bg-yellow-500"
                    : "border border-white/30 bg-white/10"
                }`}
            >
              <Image
                source={icons.save}
                className="w-4 h-4"
                tintColor={saved ? "#000" : "#fff"}
              />
              <Text
                className={`font-semibold ${
                  saved ? "text-black" : "text-white"
                }`}
              >
                {saved ? "Saved" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map(g => g.name).join(" • ")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-5 right-5 bg-accent py-4 rounded-lg flex-row justify-center"
      >
        <Text className="text-white font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
