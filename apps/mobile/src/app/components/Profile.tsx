import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

interface Props {
  profile: {
    username: string;
    fullName?: string;
    email?: string;
  };
}

const Profile: React.FC<Props> = ({ profile }) => {
  return (
    <View style={styles.container}>
      <PaperText style={styles.text}>Username: {profile.username}</PaperText>
      {profile.fullName && (
        <PaperText style={styles.text}>Full Name: {profile.fullName}</PaperText>
      )}
      {profile.email && (
        <PaperText style={styles.text}>Email: {profile.email}</PaperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Profile;
