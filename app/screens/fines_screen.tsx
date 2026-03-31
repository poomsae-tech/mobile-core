import { Montserrat_600SemiBold, useFonts } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const getSafeFontFamily = (fontsLoaded: boolean) => {
  return fontsLoaded
    ? 'Montserrat_600SemiBold'
    : Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
      });
};

export default function FinesScreen() {
  const [fontsLoaded] = useFonts({ Montserrat_600SemiBold });
  const router = useRouter();

  const [expandedDebt, setExpandedDebt] = useState(false);
  const [expandedUnpaid, setExpandedUnpaid] = useState(false);
  const [expandedPaid, setExpandedPaid] = useState(false);

  const safeFontFamily = getSafeFontFamily(fontsLoaded);

  const unpaidFines = [
    {
      id: '1',
      tournament: 'Чемпионат России',
      date: '15 июня 2025',
      reason: 'Несоответствие веса',
      athlete: 'Петров Р.В.',
      amount: '2 000 ₽',
    },
    {
      id: '2',
      tournament: 'Межрегиональный кубок',
      date: '22 июля 2025',
      reason: 'Нарушение правил экипировки',
      athlete: 'Иванова С.А.',
      amount: '1 250 ₽',
    },
    {
      id: '3',
      tournament: 'Летний турнир',
      date: '5 августа 2025',
      reason: 'Опоздание на взвешивание',
      athlete: 'Смирнов Д.К.',
      amount: '3 500 ₽',
    },
  ];

  const paidFines = [
    {
      id: '4',
      tournament: 'Весенний турнир',
      date: '3 мая 2025',
      reason: 'Несоответствие веса',
      amount: '1 000 ₽',
    },
    {
      id: '5',
      tournament: 'Открытый чемпионат',
      date: '12 апреля 2025',
      reason: 'Нарушение техники безопасности',
      amount: '1 800 ₽',
    },
    {
      id: '6',
      tournament: 'Зимний кубок',
      date: '28 февраля 2025',
      reason: 'Несанкционированное участие',
      amount: '2 300 ₽',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handlePayAll = () => {
    console.log('Оплатить все');
  };

  const handlePay = (id: string) => {
    console.log(`Оплатить штраф ${id}`);
  };

  const handleReceipt = (id: string) => {
    console.log(`Чек для штрафа ${id}`);
  };

  const calculateTotalDebt = (): number => {
    return unpaidFines.reduce((sum, fine) => {
      const amount = parseInt(fine.amount.replace(/[^0-9]/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const totalDebt = calculateTotalDebt();
  const formatAmount = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const isDebtZero = totalDebt === 0;

  const toggleSection = (section: 'debt' | 'unpaid' | 'paid') => {
    switch (section) {
      case 'debt':
        setExpandedDebt(!expandedDebt);
        break;
      case 'unpaid':
        setExpandedUnpaid(!expandedUnpaid);
        break;
      case 'paid':
        setExpandedPaid(!expandedPaid);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} hitSlop={20}>
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </Pressable>
          <Text style={[styles.title, { fontFamily: safeFontFamily }]}>Штрафы</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('debt')}>
            <Text style={[styles.sectionTitle, { fontFamily: safeFontFamily }]}>Текущая задолженность</Text>
            <Ionicons name={expandedDebt ? 'chevron-up' : 'chevron-down'} size={24} color="#FFFFFF" />
          </Pressable>
          {expandedDebt && (
            <View style={styles.sectionContent}>
              <View style={styles.debtRow}>
                <Text style={[styles.debtLabel, { fontFamily: safeFontFamily }]}>К ОПЛАТЕ:</Text>
                <Text style={[styles.debtAmount, { fontFamily: safeFontFamily }]}>{formatAmount(totalDebt)} ₽</Text>
              </View>
              <Pressable
                style={({ pressed }) => [styles.button, styles.buttonPayAll, pressed && !isDebtZero && styles.buttonPressed, isDebtZero && styles.buttonDisabled]}
                pointerEvents={isDebtZero ? 'none' : 'auto'}
                onPress={handlePayAll}
              >
                <Text style={[styles.buttonText, { fontFamily: safeFontFamily }]}>Оплатить все</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('unpaid')}>
            <Text style={[styles.sectionTitle, { fontFamily: safeFontFamily }]}>Не оплаченные</Text>
            <Ionicons name={expandedUnpaid ? 'chevron-up' : 'chevron-down'} size={24} color="#FFFFFF" />
          </Pressable>
          {expandedUnpaid && (
            <View style={styles.sectionContent}>
              {unpaidFines.map((fine) => (
                <View key={fine.id} style={styles.fineItem}>
                  <Text style={[styles.fineTitle, { fontFamily: safeFontFamily }]}>{fine.tournament}</Text>
                  <Text style={[styles.fineDate, { fontFamily: safeFontFamily }]}>{fine.date}</Text>
                  <Text style={[styles.fineReason, { fontFamily: safeFontFamily }]}>{fine.reason}</Text>
                  <Text style={[styles.fineAthlete, { fontFamily: safeFontFamily }]}>Спортсмен: {fine.athlete}</Text>
                  <View style={styles.fineRow}>
                    <Text style={[styles.fineLabel, { fontFamily: safeFontFamily }]}>К ОПЛАТЕ:</Text>
                    <Text style={[styles.fineAmount, { fontFamily: safeFontFamily }]}>{fine.amount}</Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [styles.button, styles.buttonPay, pressed && styles.buttonPressed]}
                    onPress={() => handlePay(fine.id)}
                  >
                    <Text style={[styles.buttonText, { fontFamily: safeFontFamily }]}>Оплатить</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('paid')}>
            <Text style={[styles.sectionTitle, { fontFamily: safeFontFamily }]}>Оплаченные</Text>
            <Ionicons name={expandedPaid ? 'chevron-up' : 'chevron-down'} size={24} color="#FFFFFF" />
          </Pressable>
          {expandedPaid && (
            <View style={styles.sectionContent}>
              {paidFines.map((fine) => (
                <View key={fine.id} style={styles.fineItem}>
                  <Text style={[styles.fineTitle, { fontFamily: safeFontFamily }]}>{fine.tournament}</Text>
                  <Text style={[styles.fineDate, { fontFamily: safeFontFamily }]}>{fine.date}</Text>
                  <Text style={[styles.fineReason, { fontFamily: safeFontFamily }]}>{fine.reason}</Text>
                  <Text style={[styles.finePaid, { fontFamily: safeFontFamily }]}>{fine.amount} оплачено</Text>
                  <Pressable
                    style={({ pressed }) => [styles.button, styles.buttonReceipt, pressed && styles.buttonPressed]}
                    onPress={() => handleReceipt(fine.id)}
                  >
                    <Text style={[styles.buttonText, { fontFamily: safeFontFamily }]}>Чек</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#082F49',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerSpacer: {
    width: 28,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#0C4A6E',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#0C4A6E',
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionContent: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#082F49',
  },
  debtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  debtLabel: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  debtAmount: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  fineItem: {
    marginBottom: 22,
  },
  fineTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  fineDate: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  fineReason: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  fineAthlete: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  finePaid: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  fineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fineLabel: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  fineAmount: {
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonPayAll: {
    backgroundColor: '#0C4A6E',
    marginTop: 8,
  },
  buttonPay: {
    backgroundColor: '#0C4A6E',
    marginTop: 8,
  },
  buttonReceipt: {
    backgroundColor: '#0C4A6E',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
