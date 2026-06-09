import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Roboto_400Regular } from '@expo-google-fonts/roboto/400Regular';
import { Roboto_500Medium } from '@expo-google-fonts/roboto/500Medium';
import { Roboto_600SemiBold } from '@expo-google-fonts/roboto/600SemiBold';
import { Roboto_700Bold } from '@expo-google-fonts/roboto/700Bold';
import { Roboto_800ExtraBold } from '@expo-google-fonts/roboto/800ExtraBold';
import { Roboto_900Black } from '@expo-google-fonts/roboto/900Black';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, type TextInputProps, type TextProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync().catch(() => {});

const defaultFontStyle = { fontFamily: 'Roboto_400Regular' };

function applyDefaultFont() {
  const textComponent = Text as typeof Text & { defaultProps?: TextProps };
  const textInputComponent = TextInput as typeof TextInput & { defaultProps?: TextInputProps };

  textComponent.defaultProps = {
    ...textComponent.defaultProps,
    style: [defaultFontStyle, textComponent.defaultProps?.style],
  };
  textInputComponent.defaultProps = {
    ...textInputComponent.defaultProps,
    style: [defaultFontStyle, textInputComponent.defaultProps?.style],
  };
}

applyDefaultFont();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showAppSplash, setShowAppSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_700Bold,
    Roboto_800ExtraBold,
    Roboto_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
      const timeout = setTimeout(() => setShowAppSplash(false), 1600);

      return () => clearTimeout(timeout);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {showAppSplash ? (
          <View style={styles.splashContainer}>
            <Image
              source={require('../assets/images/splash-icon.png')}
              resizeMode="contain"
              style={styles.splashLogo}
            />
            <StatusBar style="dark" />
          </View>
        ) : (
          <>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="birthday-wish" options={{ headerShown: false }} />
            <Stack.Screen name="birthdays" options={{ headerShown: false }} />
            <Stack.Screen name="devotional" options={{ headerShown: false }} />
            <Stack.Screen name="devotional/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="event" options={{ headerShown: false }} />
            <Stack.Screen name="event-details" options={{ headerShown: false }} />
            <Stack.Screen name="fellowship" options={{ headerShown: false }} />
            <Stack.Screen name="ministries" options={{ headerShown: false }} />
            <Stack.Screen name="notification" options={{ headerShown: false }} />
            <Stack.Screen name="word-detail" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        <StatusBar style="auto" />
          </>
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
  },
  splashLogo: {
    height: 232,
    width: 280,
  },
});
