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

export default function TournamentApplicationsScreen() {
  const [fontsLoaded] = useFonts({ Montserrat_600SemiBold });
  const router = useRouter();

  const [expandedOpen, setExpandedOpen] = useState(true);
  const [expandedSubmitted, setExpandedSubmitted] = useState(false);
  const [expandedClosed, setExpandedClosed] = useState(false);

  const safeFontFamily = getSafeFontFamily(fontsLoaded);

  const openTournaments = [
    { 
      id: '1', 
      name: 'Чемпионат России', 
      date: '15 июня 2026', 
      place: 'Москва', 
      status: 'Идет прием до 01.06' 
    },
    { 
      id: '2', 
      name: 'Межрегиональный кубок', 
      date: '22 июля 2026', 
      place: 'Санкт-Петербург', 
      status: 'Идет прием до 10.07' 
    },
  ];

  const submittedApplications = [
    { 
      id: '3', 
      name: 'Летний турнир', 
      date: '5 августа 2026', 
      place: 'Казань', 
      athletes: 5, 
      green: 3, 
      orange: 1, 
      red: 1 
    },
  ];

  const closedTournaments = [
    { 
      id: '4', 
      name: 'Весенний турнир', 
      date: '3 мая 2026', 
      place: 'Сочи' 
    },
  ];

  const handleBack = () => router.back();
  const handleSubmitApplication = (id: string) => console.log(`Подать заявку на турнир ${id}`);

  const toggleSection = (section: 'open' | 'submitted' | 'closed') => {
    switch (section) {
      case 'open': setExpandedOpen(!expandedOpen); break;
      case 'submitted': setExpandedSubmitted(!expandedSubmitted); break;
      case 'closed': setExpandedClosed(!expandedClosed); break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} hitSlop={20}>
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </Pressable>
          <Text style={[styles.title, { fontFamily: safeFontFamily }]}>Подача заявок на Турнир</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Идет прием заявок */}
        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('open')}>
            <Text style={[styles.sectionTitle, { fontFamily: safeFontFamily }]}>Идет прием заявок</Text>
            <Ionicons name={expandedOpen ? 'chevron-up' : 'chevron-down'} size={24} color="#FFFFFF" />
          </Pressable>
          {expandedOpen && (
            <View style={styles.sectionContent}>
              {openTournaments.map(t => (
                <View key={t.id} style={styles.tournamentItem}>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Название: {t.name}</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Дата: {t.date}</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Место проведения: {t.place}</Text>
                  <Text style={[styles.tournamentStatus, { fontFamily: safeFontFamily }]}>Статус: {t.status}</Text>
                  <Pressable
                    style={({ pressed }) => [styles.button, styles.buttonSubmit, pressed && styles.buttonPressed]}
                    onPress={() => handleSubmitApplication(t.id)}
                  >
                    <Text style={[styles.buttonText, { fontFamily: safeFontFamily }]}>Подать заявку</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Поданные заявки */}
        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('submitted')}>
            <Text style={[styles.sectionTitle, { fontFamily: safeFontFamily }]}>Поданные заявки</Text>
            <Ionicons name={expandedSubmitted ? 'chevron-up' : 'chevron-down'} size={24} color="#FFFFFF" />
          </Pressable>
          {expandedSubmitted && (
            <View style={styles.sectionContent}>
              {submittedApplications.map(app => (
                <View key={app.id} style={styles.tournamentItem}>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Название: {app.name}</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Дата: {app.date}</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Место проведения: {app.place}</Text>
                  <Text style={[styles.submittedTextCenter, { fontFamily: safeFontFamily }]}>Заявка подана!</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>{app.athletes} спортсменов</Text>
                  <View style={styles.iconsColumn}>
                    <Text style={[styles.greenIcon]}>🟢 {app.green} человек</Text>
                    <Text style={[styles.orangeIcon]}>🟠 {app.orange} человек</Text>
                    <Text style={[styles.redIcon]}>🔴 {app.red} человек</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Прием заявок закрыт */}
        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('closed')}>
            <Text style={[styles.sectionTitle, { fontFamily: safeFontFamily }]}>Прием заявок закрыт</Text>
            <Ionicons name={expandedClosed ? 'chevron-up' : 'chevron-down'} size={24} color="#FFFFFF" />
          </Pressable>
          {expandedClosed && (
            <View style={styles.sectionContent}>
              {closedTournaments.map(t => (
                <View key={t.id} style={styles.tournamentItem}>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Название: {t.name}</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Дата: {t.date}</Text>
                  <Text style={[styles.tournamentLabel, { fontFamily: safeFontFamily }]}>Место проведения: {t.place}</Text>
                  <Text style={[styles.closedTextCenter, { fontFamily: safeFontFamily }]}>Прием заявок закрыт!</Text>
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
    backgroundColor: '#082F49' 
  },
  content: { 
    paddingHorizontal: 24, 
    paddingTop: 40, 
    paddingBottom: 40, 
    flexGrow: 1 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 24 
  },
  headerSpacer: { 
    width: 28 
  },
  title: { 
    fontSize: 20, 
    lineHeight: 24, 
    color: '#FFFFFF', 
    textAlign: 'center' 
  },
  section: { 
    marginBottom: 16, 
    backgroundColor: '#0C4A6E', 
    borderRadius: 0, 
    shadowColor: '#000', 
    shadowOffset: { 
      width: 6, 
      height: 6 
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 6, 
    elevation: 6, 
    overflow: 'hidden' 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 18, 
    paddingVertical: 14, 
    backgroundColor: '#0C4A6E' 
  },
  sectionTitle: { 
    fontSize: 16, 
    lineHeight: 20, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
  sectionContent: { 
    paddingHorizontal: 18, 
    paddingVertical: 18, 
    backgroundColor: '#082F49' 
  },
  tournamentItem: { 
    marginBottom: 22 
  },
  tournamentLabel: { 
    fontSize: 16, 
    lineHeight: 20, 
    color: '#FFFFFF', 
    marginBottom: 4 
  },
  tournamentStatus: { 
    fontSize: 16, 
    lineHeight: 20, 
    color: '#FFD700', 
    marginBottom: 8 
  },
  submittedTextCenter: { 
    fontSize: 20, 
    color: '#00FF00', 
    textAlign: 'center', 
    marginBottom: 4 
  },
  closedTextCenter: { 
    fontSize: 20, 
    color: '#FF4500', 
    textAlign: 'center', 
    marginBottom: 4 
  },
  iconsColumn: { 
    flexDirection: 'column', 
    gap: 12, 
    marginTop: 4 
  },
  greenIcon: { 
    color: '#00FF00', 
    fontSize: 16 
  },
  orangeIcon: { 
    color: '#FFA500', 
    fontSize: 16 
  },
  redIcon: { 
    color: '#FF0000', 
    fontSize: 16 
  },
  button: { 
    borderRadius: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    shadowColor: '#000', 
    shadowOffset: { 
      width: 6, 
      height: 6 
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 6, 
    elevation: 6 
  },
  buttonSubmit: { 
    backgroundColor: '#0C4A6E', 
    marginTop: 8 
  },
  buttonPressed: { 
    opacity: 0.7, 
    transform: [{ scale: 0.98 }] 
  },
  buttonText: { 
    fontSize: 16, 
    lineHeight: 20, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    textAlign: 'center' 
  },
});