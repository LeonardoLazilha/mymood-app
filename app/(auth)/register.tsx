import { supabase } from '@/lib/supabase';
import { spacing } from '@/shared/constants/spacing';
import { SharedButton, SharedInput, SharedScreen, SharedText } from '@/shared/ui';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setError('');

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error('Registration error:', signUpError);
        setError('Registration failed. Please check your email and try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    router.push('/(auth)/login' as never);
  };

  return (
    <SharedScreen>
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' }}>
        <View style={{ marginBottom: spacing.xxl, alignItems: 'center' }}>
          <SharedText variant="h1" color="primary" weight="700">
            Create an account
          </SharedText>
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <SharedInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <SharedInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <SharedInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {error && (
          <View style={{ marginBottom: spacing.md }}>
            <SharedText variant="caption" color="error">
              {error}
            </SharedText>
          </View>
        )}

        <SharedButton
          label="Sign Up"
          onPress={handleRegister}
          loading={loading}
          disabled={!email || !password || !confirmPassword || loading}
          size="md"
          style={{ marginBottom: spacing.lg }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.xs }}>
          <SharedText variant="body" color="textSecondary">
            Already have an account?
          </SharedText>
          <SharedText
            variant="body"
            color="primary"
            weight="600"
            onPress={handleNavigateToLogin}
          >
            Log in
          </SharedText>
        </View>
      </View>
    </SharedScreen>
  );
}
