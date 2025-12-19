import { images } from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* <StatusBar hidden={false} /> */}

      {/* Background image */}
      <Image
        source={images.bg}
        className="absolute w-full h-64 top-0"
        resizeMode="cover"
      />

      <View className="flex-1 px-6">
        {/* Profile Header */}
        <View className="items-center mt-24">
          {/* Avatar */}
          <View className="w-40 h-40 rounded-full bg-gray-400 border-4 border-primary overflow-hidden">
            <Image
							source={images.profile}
							className="w-full h-full"
							resizeMode="cover"
						/>
          </View>

          {/* Name */}
          <Text className="text-white text-2xl font-semibold mt-4">
            Joshua Damilola
          </Text>

          {/* Username / email */}
          <Text className="text-gray-300 text-sm mt-1">
            @damilolajoshua2021@gmail.com
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity className="mt-4 px-6 py-2 rounded-full bg-secondary">
            <Text className="text-gray-300 font-semibold">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-between mt-10 bg-black rounded-xl p-4">
          <View className="items-center flex-1">
            <Text className="text-white text-lg font-bold">12</Text>
            <Text className="text-gray-300 text-xs">Saved</Text>
          </View>

          <View className="items-center flex-1 border-x border-gray-600">
            <Text className="text-white text-lg font-bold">5</Text>
            <Text className="text-gray-300 text-xs">Favorites</Text>
          </View>

          <View className="items-center flex-1">
            <Text className="text-white text-lg font-bold">3</Text>
            <Text className="text-gray-300 text-xs">Reviews</Text>
          </View>
        </View>

        {/* About Section */}
        <View className="mt-8">
          <Text className="text-white text-lg font-semibold mb-2">
            About
          </Text>
          <Text className="text-gray-300 text-sm leading-5">
            Movie lover 🎬 | React Native developer | Enjoys action & romance movies.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
