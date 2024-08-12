import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo';

const Page = () => {
    const [countryCode, setCountryCode] = useState('+44')
    const [phoneNumber, setPhoneNumber] = useState('')
    const keyboardVerticalOffsetValue = Platform.OS === 'ios' ? 90 : 50
    const router = useRouter();
    const { signUp } = useSignUp();

    const onSignup = async() => {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        
        try {
            await signUp!.create({
                phoneNumber: fullPhoneNumber
            });
            signUp!.preparePhoneNumberVerification();
            router.push({pathname: '/verify/[phone]', params: {phone: fullPhoneNumber}});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffsetValue}>
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Let's get started.</Text>
                <Text style={defaultStyles.descriptionText}>
                    Enter your phone number. {'\n'}
                    We will send you a confirmation code there
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Country code"
                        placeholderTextColor={Colors.primary}
                        value={countryCode}
                    />
                    <TextInput
                        style={[styles.input, {flex: 1}]}
                        placeholder="Mobile number"
                        placeholderTextColor={Colors.secondary}
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <Link href={'/login'} replace asChild>
                    <TouchableOpacity>
                        <Text style={defaultStyles.textLink}>Already have an account?</Text>
                    </TouchableOpacity>
                </Link> 

                <View style={{flex: 1}} /> 
                <TouchableOpacity 
                    style={[
                        defaultStyles.pillButton, 
                        phoneNumber !== '' ? styles.enabled : styles.disabled,
                        { marginTop: 20 }
                    ]}
                    onPress={onSignup}
                >
                    <Text style={[defaultStyles.buttonText, 
                        phoneNumber !== '' ? styles.enabled : styles.disabled,
                    ]}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: Colors.gray,
        padding: 20,
        borderRadius: 16,
        fontSize: 20,
        marginHorizontal: 10,
    },
    enabled: {
        backgroundColor: Colors.secondary,
        color: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.gray,
        color: Colors.primary,
    }
})

export default Page