import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053552',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Центрируем заголовок
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  
  // Секция Аккордеона
  section: {
    backgroundColor: '#084366',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1A6B9B',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 6 },
      web: { boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }
    }),
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginRight: 10,
  },
  sectionContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  // Карточка уведомления
  notificationCard: {
    backgroundColor: 'rgba(5, 53, 82, 0.6)', // Более темный фон внутри
    borderRadius: 4,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 0, // Мы используем индикатор-кружок, как на макете
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  indicatorFine: { backgroundColor: '#FF0000' },
  indicatorWarning: { backgroundColor: '#FFD700' },
  indicatorInfo: { backgroundColor: '#0055FF' },
  
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardEvent: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardRow: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.9,
  },
  amountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  timeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 8,
  },
});

export interface NotificationItem {
  id: string;
  type: 'fine' | 'warning' | 'info'; // Штраф, Внимание, Новое
  title: string;
  event?: string;
  athlete: string;
  details?: string;
  amount?: string;
  time: string;
  dateLabel: string;
}

export const NOTIFICATIONS_DATA = [
  {
    period: 'Сегодня',
    items: [
      {
        id: '1',
        type: 'fine',
        title: 'Штраф',
        event: 'Чемпионат России',
        athlete: 'Петров А.С.',
        details: 'Несоответствие веса',
        amount: '2 000 ₽ к оплате',
        time: '15:30 • 2 часа назад',
      },
      {
        id: '2',
        type: 'warning',
        title: 'ВНИМАНИЕ',
        event: 'Истекает страховка',
        athlete: 'Смирнова А.С.',
        details: 'Срок действия: 3 дня',
        time: '11:20',
      },
      {
        id: '3',
        type: 'info',
        title: 'Новое',
        event: 'Новый спортсмен в группе',
        athlete: 'Сергей Ковалев, 15 лет',
        time: 'Сегодня 10:20',
      },
    ],
  },
  {
    period: 'Вчера',
    items: [
      {
        id: '4',
        type: 'info',
        title: 'Новое',
        event: 'Изменение в расписании',
        athlete: 'Группа А',
        time: 'Вчера 18:00',
      },
    ],
  },
  {
    period: 'В этом месяце',
    items: [
      {
        id: '5',
        type: 'fine',
        title: 'Штраф',
        event: 'Турнир "Надежда"',
        athlete: 'Иванов И.И.',
        details: 'Опоздание на взвешивание',
        amount: '500 ₽ к оплате',
        time: '12.02.2024',
      },
    ],
  },
  {
    period: 'Ранее',
    items: [
      {
        id: '6',
        type: 'info',
        title: 'Архив',
        athlete: 'Система',
        details: 'Регистрация успешно пройдена',
        time: '01.01.2024',
      },
    ],
  },
];