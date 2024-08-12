import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useAssets } from 'expo-asset';
import { Link } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { defaultStyles } from '@/constants/Styles';
import EventusWhiteSVG from '@/assets/images/EVENTUS_WHITE.svg';
import Colors from '@/constants/Colors';


const Page = () => {
    const [assets] = useAssets([require('@/assets/videos/stock-video.mp4')]);

    const [loaded, error] = useFonts({
        "FoundersGrotesk": require('../assets/fonts/TestFoundersGrotesk-Regular.otf'),
        "FoundersGroteskBold": require('../assets/fonts/TestFoundersGrotesk-Bold.otf')
      });

    useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    
    if (!loaded && !error) {
        return null;
    }
    return (
        <View style={styles.container}>
            { assets && (
                <Video resizeMode={ResizeMode.COVER} isMuted isLooping shouldPlay source={{uri: assets[0].uri}} style={styles.video} /> 
            )}
            <View style={{ marginTop: 40, padding: 20}}>
                <EventusWhiteSVG width={250} height={64} />
                <Text style={{fontFamily: 'FoundersGroteskBold', fontWeight: 'bold',fontSize: 20,color: Colors.primary, marginTop: 5}}>Change is coming{'\n'}#welcomethenew</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Link href={'/login'} style={[defaultStyles.pillButton, {flex: 1, backgroundColor: Colors.primary, color: Colors.secondary}]} asChild>
                    <TouchableOpacity>
                        <Text style={[defaultStyles.buttonText, {color: Colors.secondary}]}>Login</Text>
                    </TouchableOpacity>
                </Link>
                <Link href={'/signup'} style={[defaultStyles.pillButton, {flex: 1, backgroundColor: Colors.secondary, color: Colors.primary}]} asChild>
                    <TouchableOpacity>
                        <Text style={[defaultStyles.buttonText, {color: Colors.primary}]}>Sign Up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        padding: 20,
        marginBottom: 60,
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
});

export default Page;