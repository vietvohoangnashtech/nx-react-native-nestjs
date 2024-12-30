import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Profile from '../components/Profile';
import ProfileEdit from '../components/ProfileEdit';
import axiosInstance from '../utils/axios';
import { useAuthStore } from '../store/authStore';
import { Button, Text } from 'react-native-paper';
import clsx from 'clsx';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profiles');
        setProfile(response.data);
      } catch (err: any) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Fetch profile failed');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (data: any) => {
    try {
      const response = await axiosInstance.patch('/profiles', data);
      setProfile(response.data);
      setIsEditMode(false);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Update profile failed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {profile && (
        <>
          {isEditMode ? (
            <ProfileEdit profile={profile} onSubmit={handleSave} />
          ) : (
            <Profile profile={profile} />
          )}
          <View style={styles.btnContainer}>
            {!isEditMode && (
              <Button mode="contained" onPress={() => setIsEditMode(true)}>
                Edit Profile
              </Button>
            )}
            {isEditMode && (
              <Button mode="contained" onPress={() => setIsEditMode(false)}>
                Cancel Edit
              </Button>
            )}
            <Button mode="contained" onPress={logout}>
              Logout
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProfileScreen;
