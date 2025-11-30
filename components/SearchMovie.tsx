import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Search } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import MovieCard from "./MovieCard";

const SearchMovie = () => {
  const { data: movies, loading } = useFetch(() =>
    fetchMovies({ query: "" })
  );

  return (
    <View className="flex-1 pt-6">

      {/* Header Row */}
      <View className="flex-row justify-center items-center mb-10 ">
        <Search size={20} color="white" />
        <Text className="text-white text-lg ml-2 font-semibold">
          Search for a Movie
        </Text>
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        ListHeaderComponent={
          <View className="mb-4 px-2">
            <Text className="text-white text-xl font-semibold">
              Recent Movies
            </Text>
          </View>
        }
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />
    </View>
  );
};

export default SearchMovie;
