import { Montserrat_600SemiBold, useFonts } from '@expo-google-fonts/montserrat';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

let LOGO_FEDERATION = null;

try { LOGO_FEDERATION = require('../../assets/images/react-logo.png'); } // заменить на реальный путь к логотипу федерации
catch (error) { LOGO_FEDERATION = null; }

const SecureStorage = {
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  }
};

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

  const router = useRouter();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const isButtonDisabled = !login.trim() || !password.trim();

  const safeFontFamily = getSafeFontFamily(fontsLoaded);

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      try {
        const token = await SecureStorage.getItem('authToken');
        if (token) {
          router.replace('/(tabs)');
          return;
        }
      } catch (tokenError) {
        console.warn('Failed to read auth token', tokenError);
      } finally {
        if (isMounted) {
          setIsCheckingToken(false);
        }
      }
    };

    checkToken();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogin = async () => {
    if (login === 'admin' && password === 'admin') {
      setError('');
      try {
        await SecureStorage.setItem('authToken', 'mock-token');
        router.replace('/(tabs)');
      } catch (tokenError) {
        console.warn('Failed to save auth token', tokenError);
        setError('Failed to save token. Try again.');
      }
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const handleLoginChange = (text) => {
    setLogin(text);
    if (error) setError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (error) setError('');
  };

  if (isCheckingToken) {
    return <View style={styles.container} />;
  }

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
              onChangeText={handleLoginChange}
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
              onChangeText={handlePasswordChange}
            />

            <View style={styles.spacer} />
            
            <Pressable 
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                isButtonDisabled && styles.buttonDisabled
              ]}
              android_ripple={{ color: '#1a5f8a' }}
              onPress={handleLogin}
              disabled={isButtonDisabled}>
              <Text style={[styles.buttonText, { fontFamily: safeFontFamily }]}>
                {"ВОЙТИ"}
              </Text>
            </Pressable>

            {error ? (
              <Text style={[styles.errorText, { fontFamily: safeFontFamily }]}>
                {error}
              </Text>
            ) : null}
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
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
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
  errorText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});