import { useRouter } from 'expo-router';
import { SearchX } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

const MovieNotFound = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary justify-center items-center px-6">
      
      {/* Circle background for the icon */}
      <View className="bg-white/10 p-8 rounded-full backdrop-blur-md">
        <SearchX size={90} color="white" />
      </View>

      {/* Title */}
      <Text className="text-white text-2xl font-bold mt-6">
        Movie Not Found
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-300 text-base mt-2 text-center leading-6">
        We couldn’t find any movie matching your search.
        {"\n"}Try a different title or check your spelling.
      </Text>

      {/* Retry Button */}
      <TouchableOpacity
        onPress={router.back}
        className="w-full bg-white/15 border border-white/20 rounded-2xl py-3 mt-10 flex flex-row items-center justify-center backdrop-blur-md"
      >
        <Text className="text-white text-base font-semibold">
          Go Back
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default MovieNotFound;
