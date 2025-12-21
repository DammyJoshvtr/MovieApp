import SavedItems from "@/components/SavedItems";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const {
    data: movies = [], // ✅ default empty array
    loading,
    error,
  } = useFetch(() => getSavedMovieDetails());

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mb-5 mx-auto"
      />

      <Text className="text-white text-2xl ml-4 mb-3">
        Saved Movies
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SavedItems {...item} />}
        className="pb-32"
        ListEmptyComponent={
          <View className="mt-20 items-center px-6">
            <Image
              source={icons.save}
              className="w-14 h-14 mb-4"
              tintColor="#aaa"
            />
            <Text className="text-white text-lg font-semibold">
              No saved movies
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              Movies you save will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Save;
