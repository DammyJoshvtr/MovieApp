import { ServerCrash } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

interface Reload {
	reconnect: () => void
}

const internetError = ({reconnect}: Reload) => {
	return (
		<View className="flex-1 justify-center items-center bg-primary px-6">
			
			<ServerCrash size={120} color="#fbbf24" /> 
			{/* yellow-400 */}

			<Text className="text-white text-xl font-semibold mt-4">
				Oops! Network Error
			</Text>

			<Text className="text-white text-base opacity-80 mt-1 text-center">
				Please reconnect to the Internet and try again.
			</Text>

			<TouchableOpacity
				className="w-full bg-accent rounded-xl py-3 mt-8 flex flex-row items-center justify-center"
				onPress={reconnect}
			>
				<Text className="text-white text-base font-medium">
					Reconnect
				</Text>
			</TouchableOpacity>

		</View>
	);
};

export default internetError;
