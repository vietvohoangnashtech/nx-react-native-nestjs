import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  profile: {
    fullName?: string;
    email?: string;
  };
  onSubmit: (data: any) => void;
}

const ProfileEdit: React.FC<Props> = ({ profile, onSubmit }) => {
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [email, setEmail] = useState(profile.email || '');

  const handleSubmit = () => {
    onSubmit({ fullName, email });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});


export default ProfileEdit;
