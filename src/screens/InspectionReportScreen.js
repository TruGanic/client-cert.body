import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { AlertTriangle, Activity, CheckCircle, XCircle } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { apiClient } from '../config/apiConfig';

const InspectionReportScreen = ({ route, navigation }) => {
    const { batchId, farmName, status } = route.params;
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    const isCritical = status === 'CRITICAL_ALERT';

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await apiClient.get(`/inspection-report/${batchId}`);
                setReportData(response.data);
            } catch (error) {
                console.error('Failed to fetch inspection report:', error);
                Alert.alert('Error', 'Could not load inspection data.');
            } finally {
                setLoading(false);
            }
        };

        if (batchId) fetchReport();
    }, [batchId]);
    const handleScheduleAudit = () => {
        console.log('Audit Scheduled');
    };

    const handleDismiss = () => {
        console.log('Dismissed');
    };

    if (loading || !reportData) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <ActivityIndicator size="large" color="#003366" />
                <Text className="mt-4 text-slate-500">Loading Report...</Text>
            </View>
        );
    }

    // Extract the Month from the labels
    const getChartMonth = () => {
        if (!reportData?.chartData?.labels?.length) return '';
        const firstLabel = reportData.chartData.labels[0];
        // Expecting format like "Mar 04", extract "Mar"
        const parts = firstLabel.split(' ');
        if (parts.length > 0) return parts[0];
        return '';
    };

    // Keep only the Date part
    const formatXLabel = (label) => {
        const parts = label.split(' ');
        if (parts.length > 1) return parts[1]; // Return "04" from "Mar 04"
        return label;
    };

    const chartMonth = getChartMonth();

    return (
        <ScrollView className="flex-1 bg-slate-50 p-4">
            {/* Header Info */}
            <View className="mb-6">
                <Text className="text-[#003366] text-2xl font-bold">Inspection Report:</Text>
                <Text className="text-[#003366] text-xl">{farmName}</Text>
                <View className="flex-row items-center mt-1">
                    <Text className="text-slate-500 mr-3">Batch ID: {batchId}</Text>
                    <View className="bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                        <Text className="text-green-700 text-xs font-bold">Status: Online</Text>
                    </View>
                </View>
            </View>

            {/* Status Card */}
            {isCritical && reportData.anomalyDetails ? (
                <View className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 shadow-sm">
                    <View className="flex-row items-center mb-3">
                        <AlertTriangle color="#ef4444" size={24} />
                        <Text className="text-red-700 font-bold text-lg ml-2">CRITICAL ANOMALY DETECTED</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-red-800 font-semibold">AI Confidence</Text>
                            <Text className="text-red-600 text-2xl font-bold">{reportData.anomalyDetails.confidence}%</Text>
                        </View>
                        <View>
                            <Text className="text-red-800 font-semibold">Substance</Text>
                            <Text className="text-red-600 text-lg font-bold">{reportData.anomalyDetails.substance}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 shadow-sm">
                    <View className="flex-row items-center mb-3">
                        <CheckCircle color="#16a34a" size={24} />
                        <Text className="text-green-700 font-bold text-lg ml-2">SYSTEMS NORMAL</Text>
                    </View>
                    <Text className="text-green-800 font-semibold mt-1">
                        No chemical anomalies detected. Soil nutrient levels are stable and within organic compliance thresholds.
                    </Text>
                </View>
            )}

            {/* Chart */}
            <View className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-slate-200">
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-[#003366] font-bold text-lg">Nitrogen Levels (ppm)</Text>
                    <Activity color="#64748b" size={20} />
                </View>
                {chartMonth ? <Text className="text-slate-500 text-sm mb-3">Month: {chartMonth}</Text> : null}

                {reportData.chartData && reportData.chartData.labels.length > 0 ? (
                    <LineChart
                        data={reportData.chartData}
                        formatXLabel={formatXLabel}
                        width={Dimensions.get('window').width - 75} // screen width minus padding
                        height={230} // Restoring normal height
                        yAxisSuffix=""
                        yAxisInterval={1}
                        verticalLabelRotation={0} // Remove rotation since terms are much shorter now
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 51, 102, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: '4',
                                strokeWidth: '2',
                                stroke: '#003366'
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginLeft: -15
                        }}
                    />
                ) : (
                    <Text className="text-slate-400 py-6 text-center italic">No soil readings available.</Text>
                )}
            </View>

            {/* The Conflict Box */}
            <View className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-slate-200">
                <Text className="text-[#003366] font-bold text-lg mb-4">Compliance Check</Text>

                {isCritical && reportData.anomalyDetails ? (
                    <>
                        <View className="flex-row items-center mb-3">
                            <View className="mr-3">
                                <Activity color="#ef4444" size={18} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-slate-500 text-xs">Sensor Data</Text>
                                <Text className="text-slate-800 font-medium">{reportData.anomalyDetails.sensorInsight}</Text>
                            </View>
                        </View>

                        <View className="flex-row items-center mb-4">
                            <View className="w-[18px] mr-3 items-center"><Text className="text-slate-300">|</Text></View>
                        </View>

                        <View className="flex-row items-center mb-4">
                            <View className="mr-3">
                                <FileTextIcon color="#64748b" size={18} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-slate-500 text-xs">Farmer Log</Text>
                                <Text className="text-slate-800 font-medium">{reportData.anomalyDetails.farmerLogInsight}</Text>
                            </View>
                        </View>

                        <View className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex-row items-center justify-center">
                            <Text className="text-orange-700 font-bold">VERDICT: {reportData.anomalyDetails.verdict}</Text>
                        </View>
                    </>
                ) : (
                    <View className="bg-green-50 p-4 rounded-lg border border-green-100 items-center justify-center">
                        <CheckCircle color="#16a34a" size={32} className="mb-2" />
                        <Text className="text-green-700 font-bold text-lg mt-2">VERIFIED ORGANIC</Text>
                        <Text className="text-green-600 text-center text-sm mt-1">Cross-referencing confirmed matching soil records and natural input logs.</Text>
                    </View>
                )}
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
const FileTextIcon = ({ color = '#64748b', size = 18 }) => (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.66, height: size * 0.77, borderWidth: 1.5, borderColor: color, borderRadius: 2 }} />
        <View style={{ width: size * 0.33, height: 1.5, backgroundColor: color, position: 'absolute' }} />
    </View>
);

export default InspectionReportScreen;
