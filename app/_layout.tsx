import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, TouchableOpacity, processColor, NativeModules } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'
import EventusWhiteSVG from '@/assets/images/EVENTUS_WHITE.svg';

console.log(EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);
if (!EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const { StatusBarManager } = NativeModules;

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    // TODO: This is a temporary workaround for the status bar color not updating on Android & iOS, setColor doesn't work.
    // StatusBarManager.setColor(processColor("#000000"), false);
    StatusBarManager.setStyle('light-content', false);
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('isSignedIn', isSignedIn);
    if (!isLoaded) return;
    
    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.push('/(auth)/(tabs)/dashboard');
    } else if (!isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Text>Loading..</Text>
  }

  return <Stack
    screenOptions={{
      statusBarColor: "light"
    }}
  >
  <Stack.Screen name="index" options={{ headerShown: false }}  />
  <Stack.Screen name="login" options={{
    title: 'Login',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerTitleStyle: {
      color: Colors.primary
    },
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <Link href="/help" asChild>
        <Ionicons name="help-circle-outline" size={24} color={Colors.primary} />
      </Link>
    ),
    }
  }/>
  <Stack.Screen name="signup" options={{
    title: 'Sign Up',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerTitleStyle: {
      color: Colors.primary
    },
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
    ),
    }
  }/>
    <Stack.Screen name="verify/[phone]" options={{
    title: 'Confirmation',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerTitleStyle: {
      color: Colors.primary
    },
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
    ),
    }
  }/>
  <Stack.Screen name="help" options={{
    title: 'Help',
    presentation: 'modal',
  }}/>
  <Stack.Screen name="(auth)/(tabs)" options={{
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerTitle: () => (
      <EventusWhiteSVG width={120} height={64} />
    ),
    headerLeft: () => (
      <Text></Text>
    ),
  }}/>
</Stack>
}

const RootLayoutNav = () => {

  return (
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar style="light"  />
          <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

export default RootLayoutNav;