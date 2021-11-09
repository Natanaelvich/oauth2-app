import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';

import { Button } from '../../components/Button';
import { SignInContent } from '../../components/SignInContent';

import { styles } from './styles';

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  }
}

export function SignIn() {
  const navigation = useNavigation();


  async function handleSignIn() {
      const CLIENT_ID = '233068102496-ocno21aue5jo612vl4cu1cdkp4v676f0.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@natanaelvich/oauth2app'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const url = `https://accounts.google.com/o/oauth2/v2/auth`
    // navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      <SignInContent />

      <Button
        title="Entrar com Google"
        icon="social-google"
        onPress={handleSignIn}
      />
    </View>
  );
}