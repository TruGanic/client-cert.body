import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl font-bold text-green-800">Certification Body App</Text>
            <Text className="text-gray-500 mt-2">Welcome to the dashboard</Text>
        </View>
    );
};

export default HomeScreen;
