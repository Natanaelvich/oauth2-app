import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ProfileHeader } from "../../components/ProfileHeader";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";

import { styles } from "./styles";
import { theme } from "../../styles/theme";

type Profile = {
  email: string;
  name: string;
  picture: string;
  family_name: string;
  given_name: string;
  locale: string;
};

export function Profile() {
  const navigation = useNavigation();
  const route = useRoute();

  const { token } = route.params as { token: string };

  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );

      const profileResponse = (await response.json()) as Profile;

      setProfile(profileResponse);
    }

    loadProfile();
  }, [token]);

  async function handleLogout() {
    navigation.navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />

      <View style={styles.content}>
        <View style={styles.profile}>
          <Avatar source={{ uri: profile?.picture }} />

          <Text style={styles.name}>{profile?.name}</Text>

          <View style={styles.email}>
            <Feather name="mail" color={theme.colors.secondary} size={18} />
            <Text style={styles.emailText}>{profile?.email}</Text>
          </View>
        </View>

        <View style={styles.about}>
          <View style={styles.info}>
            <Feather name="user" size={34} color={theme.colors.note} />
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.text}>{profile?.given_name}</Text>
          </View>

          <View style={styles.info}>
            <Feather name="heart" size={34} color={theme.colors.note} />
            <Text style={styles.label}>Sobrenome</Text>
            <Text style={styles.text}>{profile?.family_name}</Text>
          </View>
        </View>

        <View style={styles.locale}>
          <Feather name="map-pin" size={18} color={theme.colors.note} />

          <Text style={styles.localeText}>
            Localidade do perfil do usuário: {profile?.locale}
          </Text>
        </View>

        <Button title="Desconectar" icon="power" onPress={handleLogout} />
      </View>
    </View>
  );
}
