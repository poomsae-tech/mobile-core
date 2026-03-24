import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './NotificationsScreen.styles';
import { NOTIFICATIONS_DATA } from './data';

export default function NotificationsScreen() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Сегодня']); // По умолчанию открыто "Сегодня"

  const toggleSection = (period: string) => {
    if (expandedSections.includes(period)) {
      setExpandedSections(expandedSections.filter(s => s !== period));
    } else {
      setExpandedSections([...expandedSections, period]);
    }
  };

  const getIndicatorStyle = (type: string) => {
    switch (type) {
      case 'fine': return styles.indicatorFine;
      case 'warning': return styles.indicatorWarning;
      default: return styles.indicatorInfo;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Уведомления</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {NOTIFICATIONS_DATA.map((section) => {
          const isExpanded = expandedSections.includes(section.period);
          
          return (
            <View key={section.period} style={styles.section}>
              {/* Заголовок аккордеона */}
              <TouchableOpacity 
                style={styles.accordionHeader} 
                onPress={() => toggleSection(section.period)}
                activeOpacity={0.7}
              >
                <Text style={styles.headerText}>{section.period}</Text>
                <View style={styles.headerLeft}>
                  {!isExpanded && (
                    <Text style={styles.countText}>уведомлений: {section.items.length}</Text>
                  )}
                  <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color="#fff" 
                  />
                </View>
              </TouchableOpacity>

              {/* Контент аккордеона */}
              {isExpanded && (
                <View style={styles.sectionContent}>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.notificationCard}>
                      <View style={styles.cardHeader}>
                        <View style={[styles.indicator, getIndicatorStyle(item.type)]} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                      </View>
                      
                      {item.event && <Text style={styles.cardEvent}>{item.event}</Text>}
                      <Text style={styles.cardRow}>Спортсмен: {item.athlete}</Text>
                      {item.details && <Text style={styles.cardRow}>{item.details}</Text>}
                      
                      {item.amount && (
                        <Text style={styles.amountText}>💰 {item.amount}</Text>
                      )}
                      
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}