import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AlertTriangle, Activity, CheckCircle, XCircle } from 'lucide-react-native';

const InspectionReportScreen = () => {
    const handleScheduleAudit = () => {
        console.log('Audit Scheduled');
    };

    const handleDismiss = () => {
        console.log('Dismissed');
    };

    return (
        <ScrollView className="flex-1 bg-slate-50 p-4">
            {/* Header Info */}
            <View className="mb-6">
                <Text className="text-[#003366] text-2xl font-bold">Inspection Report:</Text>
                <Text className="text-[#003366] text-xl">Sunrise Organic Farm</Text>
                <View className="flex-row items-center mt-1">
                    <Text className="text-slate-500 mr-3">Sensor ID: #SENS-X78</Text>
                    <View className="bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                        <Text className="text-green-700 text-xs font-bold">Status: Online</Text>
                    </View>
                </View>
            </View>

            {/* Risk Score Card */}
            <View className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 shadow-sm">
                <View className="flex-row items-center mb-3">
                    <AlertTriangle color="#ef4444" size={24} />
                    <Text className="text-red-700 font-bold text-lg ml-2">CRITICAL ANOMALY DETECTED</Text>
                </View>
                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-red-800 font-semibold">AI Confidence</Text>
                        <Text className="text-red-600 text-2xl font-bold">98%</Text>
                    </View>
                    <View>
                        <Text className="text-red-800 font-semibold">Substance</Text>
                        <Text className="text-red-600 text-lg font-bold">Synthetic Nitrogen</Text>
                    </View>
                </View>
            </View>

            {/* Evidence Graph Mock */}
            <View className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-slate-200">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-[#003366] font-bold text-lg">Evidence Graph</Text>
                    <Activity color="#64748b" size={20} />
                </View>

                <Text className="text-xs text-slate-400 mb-2 rotate-0">Nitrogen Levels (ppm)</Text>

                {/* Mock Graph Container */}
                <View className="h-48 bg-slate-50 rounded-lg border border-slate-100 flex justify-center items-center relative overflow-hidden">
                    {/* Y-axis lines */}
                    <View className="absolute top-10 left-0 right-0 h-[1px] bg-slate-200" />
                    <View className="absolute top-24 left-0 right-0 h-[1px] bg-slate-200" />
                    <View className="absolute top-36 left-0 right-0 h-[1px] bg-slate-200" />

                    {/* Mock Data Line (Visualized as text/blocks for now) */}
                    <Text className="text-slate-300 italic">Chart Visualization Placeholder</Text>

                    {/* Annotation */}
                    <View className="absolute top-12 right-10 bg-red-100 px-2 py-1 rounded border border-red-200">
                        <Text className="text-red-600 text-xs font-bold">⚠ SUDDEN SPIKE ({'\n'}Oct 12)</Text>
                    </View>
                </View>

                <View className="flex-row justify-between mt-2 px-2">
                    <Text className="text-xs text-slate-400">Oct 01</Text>
                    <Text className="text-xs text-slate-400">Oct 08</Text>
                    <Text className="text-xs text-slate-400">Oct 15</Text>
                    <Text className="text-xs text-slate-400">Oct 22</Text>
                </View>
            </View>

            {/* The Conflict Box */}
            <View className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-slate-200">
                <Text className="text-[#003366] font-bold text-lg mb-4">Compliance Check</Text>

                <View className="flex-row items-center mb-3">
                    <Activity color="#ef4444" size={18} className="mr-3" />
                    <View>
                        <Text className="text-slate-500 text-xs">Sensor Data</Text>
                        <Text className="text-slate-800 font-medium">High N Spike (Rapid Release)</Text>
                    </View>
                </View>

                <View className="flex-row items-center mb-4">
                    <View className="w-[18px] mr-3 items-center"><Text className="text-slate-300">|</Text></View>
                </View>

                <View className="flex-row items-center mb-4">
                    <FileTextIcon color="#64748b" size={18} className="mr-3" />
                    <View>
                        <Text className="text-slate-500 text-xs">Farmer Log</Text>
                        <Text className="text-slate-800 font-medium">No inputs recorded for Oct 12</Text>
                    </View>
                </View>

                <View className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex-row items-center justify-center">
                    <Text className="text-orange-700 font-bold">VERDICT: DATA MISMATCH</Text>
                </View>
            </View>

            {/* Action Footer */}
            <View className="mb-10">
                <TouchableOpacity
                    className="bg-red-600 p-4 rounded-lg items-center shadow-md active:bg-red-700 mb-4"
                    onPress={handleScheduleAudit}
                >
                    <Text className="text-white font-bold text-lg">Schedule Physical Audit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-slate-200 p-4 rounded-lg items-center active:bg-slate-300"
                    onPress={handleDismiss}
                >
                    <Text className="text-slate-600 font-bold text-lg">Dismiss as False Positive</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// Helper for the missing icon in the conflict box
const FileTextIcon = (props) => (
    <View {...props} style={{ width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 12, height: 14, borderWidth: 1.5, borderColor: props.color || '#64748b', borderRadius: 2 }} />
        <View style={{ width: 6, height: 1, backgroundColor: props.color || '#64748b', position: 'absolute' }} />
    </View>
);

export default InspectionReportScreen;
