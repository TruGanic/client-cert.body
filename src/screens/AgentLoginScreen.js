import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck } from 'lucide-react-native';

const AgentLoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login Attempt:', { email });
        // Navigate to Dashboard on success (mock)
        navigation.replace('AgentDashboard', { agentName: 'Amal' });
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
                    className="bg-[#003366] p-4 rounded-lg items-center mt-6 shadow-md active:bg-[#002244]"
                    onPress={handleLogin}
                >
                    <Text className="text-white font-bold text-lg">Login</Text>
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
