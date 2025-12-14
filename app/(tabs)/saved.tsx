import SavedItems from "@/components/SavedItems";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { getAllSavedMovies } from "@/services/useMetrics";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";

const Save = () => {

  const { 
    data: movies, 
    loading, 
    error } = useFetch(getAllSavedMovies);


  useEffect(() => {
  getAllSavedMovies().then((movies) => {
    console.log("Saved:", movies);
  });
}, []);

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SavedItems title={item.title} poster_url={item.poster} vote_average={item.vote_average} />
        )}
        className="mt-2 pb-32"
      />

    </View>
  );
};

export default Save;
















// <View className="bg-primary flex-1">
//   <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />

//   {loading && <Text className="text-white p-4">Loading...</Text>}

//   {error && <Text className="text-red-500 p-4">Error loading movies</Text>}

//   {movies && movies.length === 0 && (
//     <Text className="text-light-200 text-center mt-10">No saved movies</Text>
//   )}

//   {movies && movies.length > 0 && (
//     <FlatList
//       data={movies}
//       numColumns={2}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View className="p-3 w-1/2">
//           <Image
//             source={{ uri: item.poster }}
//             className="w-full h-48 rounded-xl"
//             resizeMode="cover"
//           />
//           <Text className="text-white mt-2">{item.title}</Text>
//         </View>
//       )}
//     />
//   )}
// </View>