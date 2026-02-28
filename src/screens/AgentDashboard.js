import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogOut, AlertTriangle, CheckCircle, ChevronRight, FileText } from 'lucide-react-native';
import { apiClient } from '../config/apiConfig';

const ASSIGNED_FARMERS = [
    { id: '1', farmerName: 'Saman Kumara', farmName: 'Green Valley Estate', location: 'Badulla - Block A', status: 'COMPLIANT', lastSync: '10 mins ago' },
    { id: '2', farmerName: 'Anura Perera', farmName: 'Sunrise Organic Farm', location: 'Badulla - Block B', status: 'CRITICAL_ALERT', lastSync: '2 hours ago' },
    { id: '3', farmerName: 'Kamal Gunaratne', farmName: 'Highland Spices', location: 'Bandarawela - Zone 1', status: 'COMPLIANT', lastSync: '1 day ago' },
    { id: '4', farmerName: 'Nimali Silva', farmName: 'Silva Gardens', location: 'Ella - Zone 4', status: 'CRITICAL_ALERT', lastSync: '5 mins ago' },
    { id: '5', farmerName: 'Ruwan Dissanaike', farmName: 'Golden Harvest', location: 'Haputale - Ridge', status: 'COMPLIANT', lastSync: '30 mins ago' },
    { id: '6', farmerName: 'Sunil Shantha', farmName: 'Shantha Farms', location: 'Badulla - Block C', status: 'COMPLIANT', lastSync: '1 hour ago' },
    { id: '7', farmerName: 'Mahesh Senanayake', farmName: 'Organic Roots', location: 'Welimada - Lowlands', status: 'COMPLIANT', lastSync: '3 days ago' },
];

const MyFarmersDashboard = ({ route }) => {
    const navigation = useNavigation();
    const { agentName } = route.params || { agentName: 'Amal' };
    const [filter, setFilter] = useState('All');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const filteredFarmers = ASSIGNED_FARMERS.filter(farmer => {
        if (filter === 'All') return true;
        if (filter === 'Critical Risk') return farmer.status === 'CRITICAL_ALERT';
        if (filter === 'Compliant') return farmer.status === 'COMPLIANT';
        return true;
    });

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoggingOut(true);
                        try {
                            await apiClient.post('/logout');

                            // Wipe the token and profile from local storage to secure the device
                            await AsyncStorage.removeItem('agentToken');
                            await AsyncStorage.removeItem('agentProfile');

                            navigation.replace('AgentLogin');
                        } catch (error) {
                            setIsLoggingOut(false);
                            console.error('Logout API Error:', error);
                            Alert.alert('Error', 'Failed to log out cleanly. Please check your connection.');
                        }
                    }
                }
            ]
        );
    };

    const handleViewReport = (farmName) => {
        console.log(`Navigating to Inspection for ${farmName}`);
        navigation.navigate('InspectionReport', { farmName });
    };

    const renderFarmerCard = ({ item }) => {
        const isCritical = item.status === 'CRITICAL_ALERT';

        return (
            <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-slate-200">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-[#003366] mb-1">{item.farmName}</Text>
                        <Text className="text-slate-600 font-medium mb-1">{item.farmerName}</Text>
                        <Text className="text-xs text-slate-400">{item.location}</Text>
                    </View>

                    <View className={`px-3 py-1 rounded-full flex-row items-center ${isCritical ? 'bg-red-100' : 'bg-green-100'}`}>
                        {isCritical ? (
                            <View className="mr-1">
                                <AlertTriangle size={14} color="#ef4444" />
                            </View>
                        ) : (
                            <View className="mr-1">
                                <CheckCircle size={14} color="#16a34a" />
                            </View>
                        )}
                        <Text className={`text-xs font-bold ${isCritical ? 'text-red-700' : 'text-green-700'}`}>
                            {isCritical ? 'ANOMALY DETECTED' : 'Verified'}
                        </Text>
                    </View>
                </View>

                {isCritical && (
                    <View className="mt-3 bg-red-50 p-2 rounded-md border border-red-100 flex-row items-center">
                        <View className="mr-2">
                            <AlertTriangle size={16} color="#ef4444" />
                        </View>
                        <Text className="text-red-600 text-sm font-medium">AI detected synthetic nitrogen spike</Text>
                    </View>
                )}

                <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-slate-100">
                    <Text className="text-xs text-slate-400">Sync: {item.lastSync}</Text>
                    <TouchableOpacity
                        className="flex-row items-center bg-[#003366] px-3 py-2 rounded-md active:bg-[#002244]"
                        onPress={() => handleViewReport(item.farmName)}
                    >
                        <View className="mr-2">
                            <FileText size={14} color="white" />
                        </View>
                        <Text className="text-white text-xs font-bold">View Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-slate-50">
            {/* Header */}
            <View className="bg-[#003366] pt-12 pb-6 px-6 shadow-md">
                <View className="flex-row justify-between items-center mb-2">
                    <View>
                        <Text className="text-white text-2xl font-bold">Welcome, {agentName}</Text>
                        <Text className="text-slate-300 text-sm">Region: Uva Province</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} disabled={isLoggingOut} className="bg-white/10 p-2 rounded-full">
                        {isLoggingOut ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <LogOut size={20} color="white" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filters */}
            <View className="flex-row px-4 py-4 bg-white shadow-sm border-b border-slate-200">
                {['All', 'Critical Risk', 'Compliant'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setFilter(tab)}
                        className={`mr-3 px-4 py-2 rounded-full border ${filter === tab
                            ? 'bg-[#003366] border-[#003366]'
                            : 'bg-white border-slate-300'
                            }`}
                    >
                        <Text className={`text-sm font-bold ${filter === tab ? 'text-white' : 'text-slate-600'}`}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={filteredFarmers}
                renderItem={renderFarmerCard}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MyFarmersDashboard;
