import { Text, View, Image, ScrollView } from "react-native";
import {images} from "@/constants/images";
import { icons } from "@/constants/icons"
import { Link } from 'expo-router'
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View>
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movies"
          />
        </View>
      </ScrollView>
    </View>

  );
}