import { Montserrat_600SemiBold, useFonts } from '@expo-google-fonts/montserrat';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

let LOGO_FEDERATION = null;

try { LOGO_FEDERATION = require('../../assets/images/react-logo.png'); } // заменить на реальный путь к логотипу федерации
catch (error) { LOGO_FEDERATION = null; }

const getSafeFontFamily = (fontsLoaded) => {
  return fontsLoaded ? 'Montserrat_600SemiBold' : Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System'
  });
};

const LogoCircle = ({ source, fallbackText, fontsLoaded }) => {
  const [imageError, setImageError] = useState(false);
  const fontFamily = getSafeFontFamily(fontsLoaded);

  if (!source) {
    return (
      <View style={styles.logoLeft}>
        <Text style={[styles.logoText, { fontFamily }]}>
          {fallbackText}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.logoLeft}>
      <Image 
        source={source} 
        style={styles.logoImage}
        resizeMode="contain"
        onError={() => setImageError(true)}
      />
      {imageError && (
        <View style={styles.logoTextContainer}>
          <Text style={[styles.logoText, { fontFamily }]}>
            {fallbackText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const isButtonDisabled = !login.trim() || !password.trim();

  const safeFontFamily = getSafeFontFamily(fontsLoaded);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView 
          contentContainerStyle={styles.content} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.logoRow}>
            <LogoCircle 
              source={LOGO_FEDERATION} 
              fallbackText="Лого федерации"
              fontsLoaded={fontsLoaded}
            />
            <LogoCircle 
              source={LOGO_FEDERATION} 
              fallbackText="Лого федерации"
              fontsLoaded={fontsLoaded}
            />
          </View>

          <View style={styles.spacer} />

          <View style={styles.form}>
            <Text style={[styles.labelLogin, { fontFamily: safeFontFamily }]}>
              {"Введите логин:"}
            </Text>
            <TextInput 
              style={[styles.inputLogin, { fontFamily: safeFontFamily }]} 
              placeholder="ivanov@mail.ru" 
              placeholderTextColor="#999999"
              value={login}
              onChangeText={setLogin}
            />

            <Text style={[styles.labelPassword, { fontFamily: safeFontFamily }]}>
              {"Введите пароль:"}
            </Text>
            <TextInput 
              style={[styles.inputPassword, { fontFamily: safeFontFamily }]} 
              placeholder="••••••••" 
              secureTextEntry 
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.spacer} />
            
            <Pressable 
              style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
              android_ripple={{ color: '#1a5f8a' }}
              onPress={() => console.log('Login pressed')}
              disabled={isButtonDisabled}>
              <Text style={[styles.buttonText, { fontFamily: safeFontFamily }]}>
                {"ВОЙТИ"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#082F49',
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    flexGrow: 1,
  },
  logoRow: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    flexGrow: 1,
    minHeight: 24,
    maxHeight: 120,
  },
  logoLeft: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoRight: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
  logoTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  logoText: {
    width: '100%',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
    paddingHorizontal: 8,
  },
  form: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  labelLogin: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  labelPassword: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
    marginTop: 18,
    marginBottom: 8,
  },
  inputLogin: {
    height: 58,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#004EA6',
    paddingVertical: 9.5,
    paddingHorizontal: 16,
  },
  inputPassword: {
    height: 58,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#004EA6',
    paddingVertical: 9.5,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 28,
    height: 73,
    backgroundColor: '#0C4A6E',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});