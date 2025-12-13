import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserPlus } from 'lucide-react-native';

const AgentRegistrationScreen = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [assignedRegion, setAssignedRegion] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        const registrationData = {
            fullName,
            email,
            assignedRegion,
            // In a real app, passwords would be hashed/handled securely
        };
        console.log('Registration Data:', JSON.stringify(registrationData, null, 2));

        // Mock successful registration
        navigation.goBack();
    };

    return (
        <ScrollView className="flex-1 bg-slate-50 p-6">
            <View className="items-center mb-8 mt-6">
                <View className="bg-slate-200 p-4 rounded-full mb-4">
                    <UserPlus color="#003366" size={32} />
                </View>
                <Text className="text-2xl font-bold text-[#003366]">New Agent Onboarding</Text>
                <Text className="text-slate-500 mt-1">Register to start supervising farmers</Text>
            </View>

            <View className="space-y-5 mb-10">
                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Full Name</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="e.g. Amal Perera"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Professional Email</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="agent.name@controlunion.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Assigned Region</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="e.g. Uva Province"
                        value={assignedRegion}
                        onChangeText={setAssignedRegion}
                    />
                    <Text className="text-xs text-slate-400 ml-1 mt-1">This determines your farmer list.</Text>
                </View>

                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Password</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View>
                    <Text className="text-[#003366] font-bold mb-2 ml-1">Confirm Password</Text>
                    <TextInput
                        className="bg-white border border-slate-300 rounded-lg p-4 text-slate-800 shadow-sm"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    className="bg-[#003366] p-4 rounded-lg items-center mt-6 shadow-md active:bg-[#002244]"
                    onPress={handleRegister}
                >
                    <Text className="text-white font-bold text-lg">Complete Registration</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AgentRegistrationScreen;
