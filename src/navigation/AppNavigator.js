import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgentLoginScreen from '../screens/AgentLoginScreen';
import AgentRegistrationScreen from '../screens/AgentRegistrationScreen';
import AgentDashboard from '../screens/AgentDashboard';
import InspectionReportScreen from '../screens/InspectionReportScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="AgentLogin">
            <Stack.Screen
                name="AgentLogin"
                component={AgentLoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AgentRegistration"
                component={AgentRegistrationScreen}
                options={{
                    title: 'Register New Agent',
                    headerStyle: { backgroundColor: '#f8fafc' },
                    headerTintColor: '#003366',
                }}
            />
            <Stack.Screen
                name="AgentDashboard"
                component={AgentDashboard}
                options={{
                    title: 'Dashboard',
                    headerStyle: { backgroundColor: '#003366' },
                    headerTintColor: '#ffffff',
                    headerBackVisible: false, // Prevent going back to login
                }}
            />
            <Stack.Screen
                name="InspectionReport"
                component={InspectionReportScreen}
                options={{
                    title: 'Back to Dashboard',
                    headerStyle: { backgroundColor: '#f8fafc' },
                    headerTintColor: '#003366',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
