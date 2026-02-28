import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShieldCheck } from 'lucide-react-native';
import { apiClient } from '../config/apiConfig';

const AgentLoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        setErrorMessage('');
        setLoading(true);

        try {
            const response = await apiClient.post('/login', {
                email,
                password
            });

            console.log('Login Success:', response.data);

            // Store the token and profile for persistent sessions
            const token = response.data.token;
            await AsyncStorage.setItem('agentToken', token);
            await AsyncStorage.setItem('agentProfile', JSON.stringify(response.data.profile));

            navigation.replace('AgentDashboard', { agentName: response.data.profile.fullName });

        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            setErrorMessage(
                error.response?.data?.error ||
                'Invalid credentials or network error. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-slate-50 justify-center p-8">
            <View className="items-center mb-12">
                <View className="bg-[#003366] p-5 rounded-full mb-6 shadow-md">
                    <ShieldCheck color="white" size={48} />
                </View>
                <Text className="text-3xl font-bold text-[#003366] text-center">National Organic</Text>
                <Text className="text-2xl font-bold text-[#003366] text-center mb-2">Control Unit</Text>
                <Text className="text-slate-500 font-medium">Agent Portal</Text>
            </View>

            <View className="space-y-5">
                {errorMessage ? (
                    <View className="bg-red-100 p-3 rounded-lg border border-red-200 mb-2">
                        <Text className="text-red-700 text-center">{errorMessage}</Text>
                    </View>
                ) : null}

                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Professional Email</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="amal@controlunion.com"
                        placeholderTextColor="#94a3b8"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Password</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="••••••••"
                        placeholderTextColor="#94a3b8"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    className={`p-4 rounded-lg items-center mt-6 shadow-md flex-row justify-center ${loading ? 'bg-slate-400' : 'bg-[#003366] active:bg-[#002244]'}`}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" className="mr-2" />
                    ) : null}
                    <Text className="text-white font-bold text-lg">
                        {loading ? 'Authenticating...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-slate-600">New Agent? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AgentRegistration')}>
                        <Text className="text-[#003366] font-bold underline">Register Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AgentLoginScreen;
