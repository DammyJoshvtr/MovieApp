import SavedItems from "@/components/SavedItems";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {

  const {
    data: movies,
    loading,
    error
  } = useFetch(() => getSavedMovieDetails())

  useEffect(() => {
    getSavedMovieDetails().then((movie) => {
      console.log('Saved Movies:',movie)
    })
  }, [])

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      
      <Text className="text-white text-2xl ml-4">Saved Movies</Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SavedItems { ...item } />
        )}
        className="mt-2 pb-32"
      />

    </View>
  );
};

export default Save;