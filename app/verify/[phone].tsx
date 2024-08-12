import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router'
import { Fragment, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const cellCount = 6;

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string}>();
    const [ code, setCode ] = useState('');
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp(); 

    const ref = useBlurOnFulfill({ value: code, cellCount });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

  useEffect(() => {
    if(code.length === 6) {
      // Verify code
      console.log('code', code);
      if (signin === 'true') {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code])

  const verifyCode = async() => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code
      })
      await setActive!({ session: signUp?.createdSessionId});
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message);
      }
    };
  }

  const verifySignIn = async() => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code
      })
      await setActive!({ session: signIn?.createdSessionId});
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message);
      }
    };
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Authentication code.</Text>
      <Text style={defaultStyles.descriptionText}>
        Code has been sent to {phone} {'\n'}
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
        )}/>

      <Link href={'/login'} replace asChild>
          <TouchableOpacity>
              <Text style={defaultStyles.textLink}>Already have an account?</Text>
          </TouchableOpacity>
      </Link> 
    </View>
  )
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 38,
    fontSize: 36,
    borderWidth: 2,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontFamily: 'FoundersGrotesk',
    color: Colors.secondary,
    fontSize: 44,
    alignSelf: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  separator : {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  }
});

export default Page