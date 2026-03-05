import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogOut, AlertTriangle, CheckCircle, ChevronRight, FileText } from 'lucide-react-native';
import { apiClient } from '../config/apiConfig';

const MyFarmersDashboard = ({ route }) => {
    const navigation = useNavigation();
    const { agentName: routeAgentName, agentRegion: routeAgentRegion } = route.params || {};
    const [authAgentName, setAuthAgentName] = useState(routeAgentName || 'Agent');
    const [agentRegion, setAgentRegion] = useState(routeAgentRegion || 'Loading region...');
    const [filter, setFilter] = useState('All');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profileStr = await AsyncStorage.getItem('agentProfile');
                if (profileStr) {
                    const profile = JSON.parse(profileStr);
                    if (profile.fullName) setAuthAgentName(profile.fullName);
                    if (profile.assignedRegion) setAgentRegion(profile.assignedRegion);
                    else if (profile.region) setAgentRegion(profile.region); // fallback if it's stored as region
                }
            } catch (error) {
                console.error('Error loading profile from AsyncStorage:', error);
            }
        };
        loadProfile();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/dashboard-stats');
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            Alert.alert('Error', 'Failed to fetch dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await apiClient.get('/dashboard-stats');
            setFarmers(response.data);
        } catch (error) {
            console.error('Error refreshing dashboard:', error);
            Alert.alert('Error', 'Failed to refresh dashboard data.');
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchDashboardStats();
        });
        return unsubscribe;
    }, [navigation]);

    const filteredFarmers = farmers.filter(farmer => {
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

    const handleViewReport = (item) => {
        console.log(`Navigating to Inspection for ${item.farmName}`);
        navigation.navigate('InspectionReport', {
            farmName: item.farmName,
            batchId: item.batchId,
            status: item.status
        });
    };

    const renderFarmerCard = ({ item }) => {
        const isCritical = item.status === 'CRITICAL_ALERT';

        return (
            <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-slate-200">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-[#003366] mb-1">{item.farmName}</Text>
                        <Text className="text-slate-600 font-medium mb-1">
                            {item.farmerName} • <Text className="text-slate-500 italic">{item.cropVariety}</Text>
                        </Text>
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
                        <Text className="text-red-600 text-sm font-medium">AI detected synthetic chemical spike</Text>
                    </View>
                )}

                <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-slate-100">
                    <Text className="text-xs text-slate-400">Sync: {item.lastSync}</Text>
                    <TouchableOpacity
                        className="flex-row items-center bg-[#003366] px-3 py-2 rounded-md active:bg-[#002244]"
                        onPress={() => handleViewReport(item)}
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
                        <Text className="text-white text-2xl font-bold">Welcome, {authAgentName}</Text>
                        <Text className="text-slate-300 text-sm">Region: {agentRegion}</Text>
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
            {loading ? (
                <View className="flex-1 justify-center items-center mt-10">
                    <ActivityIndicator size="large" color="#003366" />
                    <Text className="mt-4 text-slate-500">Loading farmer data...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredFarmers}
                    renderItem={renderFarmerCard}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#003366']} // Android
                            tintColor="#003366" // iOS
                        />
                    }
                />
            )}
        </View>
    );
};

export default MyFarmersDashboard;
