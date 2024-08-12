import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum SignInType {
    Phone, Email, Google, Apple
}

const Page = () => {
    const [countryCode, setCountryCode] = useState('+44')
    const [phoneNumber, setPhoneNumber] = useState('')
    const keyboardVerticalOffsetValue = Platform.OS === 'ios' ? 90 : 50
    const router = useRouter();
    const { signIn } = useSignIn();

    const onSignIn = async(type: SignInType) => {
        if (type === SignInType.Phone) {
            console.log('Sign in with phone number')
            try {
                const fullPhoneNumber = `${countryCode}${phoneNumber}`;
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: fullPhoneNumber,
                });
                const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
                    return factor.strategy === 'phone_code';
                });

                const { phoneNumberId } = firstPhoneFactor;

                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                });

                router.push({ pathname: './verify/[phone]', params: {phone: fullPhoneNumber, signin: true}});
            } catch (error) {
                console.error('error', JSON.stringify(error, null, 2));
                if (isClerkAPIResponseError(error)) {
                    console.error('Clerk API Error', JSON.stringify(error, null, 2));
                    if (error.errors[0].code === 'form_identifier_not_found') {
                        Alert.alert('Error', error.errors[0].message);
                    }
                }
            }
        }
    };

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffsetValue}>
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Welcome back.</Text>
                <Text style={defaultStyles.descriptionText}>
                    Enter your account's phone number
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

                <TouchableOpacity 
                    style={[
                        defaultStyles.pillButton, 
                        phoneNumber !== '' ? styles.enabled : styles.disabled,
                        { marginBottom: 20 }
                    ]}
                    onPress={() => onSignIn(SignInType.Phone)}
                >
                    <Text style={[defaultStyles.buttonText, 
                        phoneNumber !== '' ? styles.enabled : styles.disabled,
                    ]}>
                        Continue
                    </Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
                    <View style={{flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.darkGray}}/>
                    <Text style={{color: Colors.darkGray, fontSize: 20}}>or</Text>
                    <View style={{flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.darkGray}}/>
                </View>

                <TouchableOpacity 
                    onPress={() => onSignIn(SignInType.Email)}
                    style={[
                        defaultStyles.pillButton, 
                        {
                            flexDirection: 'row', 
                            gap: 16, 
                            marginTop: 20, 
                            backgroundColor: Colors.secondary
                        }
                    ]}
                >
                    <Ionicons name="mail" size={24} color={Colors.primary}/>
                    <Text style={[defaultStyles.buttonText, {color: Colors.primary}]}>Sign in with email</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => onSignIn(SignInType.Google)}
                    style={[
                        defaultStyles.pillButton, 
                        {
                            flexDirection: 'row', 
                            gap: 16, 
                            marginTop: 20, 
                            backgroundColor: Colors.secondary
                        }
                    ]}
                >
                    <Ionicons name="logo-google" size={24} color={Colors.primary}/>
                    <Text style={[defaultStyles.buttonText, {color: Colors.primary}]}>Sign in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => onSignIn(SignInType.Apple)}
                    style={[
                        defaultStyles.pillButton, 
                        {
                            flexDirection: 'row', 
                            gap: 16, 
                            marginTop: 20, 
                            backgroundColor: Colors.secondary
                        }
                    ]}
                >
                    <Ionicons name="logo-apple" size={24} color={Colors.primary}/>
                    <Text style={[defaultStyles.buttonText, {color: Colors.primary}]}>Sign in with Apple</Text>
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