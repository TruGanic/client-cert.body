import React from 'react';
import { View, Text } from 'react-native';

const MyFarmersDashboard = () => {
    return (
        <View className="flex-1 bg-gray-50 p-6">
            <View className="bg-[#003366] p-6 rounded-xl shadow-sm mb-6">
                <Text className="text-white text-2xl font-bold">My Farmers Dashboard</Text>
                <Text className="text-gray-200 mt-2">Manage your assigned farmers here.</Text>
            </View>
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">List of farmers will appear here.</Text>
            </View>
        </View>
    );
};

export default MyFarmersDashboard;
