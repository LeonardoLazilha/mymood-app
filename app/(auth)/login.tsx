import { supabase } from '@/lib/supabase';
import { spacing } from '@/shared/constants/spacing';
import SharedButton from '@/shared/ui/components/SharedButton';
import SharedInput from '@/shared/ui/components/SharedInput';
import SharedScreen from '@/shared/ui/components/SharedScreen';
import SharedText from '@/shared/ui/components/SharedText';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/(auth)/register' as never);
  };

  return (
    <SharedScreen>
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' }}>
        {/* Logo/Title */}
        <View style={{ marginBottom: spacing.xxl, alignItems: 'center' }}>
          <SharedText variant="h1" color="primary" weight="700">
            MyMood
          </SharedText>
          <SharedText variant="body" color="textSecondary" style={{ marginTop: spacing.sm }}>
            Track your mood, gain insights
          </SharedText>
        </View>

        {/* Email Input */}
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

        {/* Password Input */}
        <View style={{ marginBottom: spacing.md }}>
          <SharedInput
            label="Senha"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View style={{ marginBottom: spacing.md }}>
            <SharedText variant="caption" color="error">
              {error}
            </SharedText>
          </View>
        )}

        {/* Login Button */}
        <SharedButton
          label="Entrar"
          onPress={handleLogin}
          loading={loading}
          disabled={!email || !password || loading}
          size="lg"
          style={{ marginBottom: spacing.lg }}
        />

        {/* Link to Register */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.xs }}>
          <SharedText variant="body" color="textSecondary">
            Não tem conta?
          </SharedText>
          <SharedText
            variant="body"
            color="primary"
            weight="600"
            onPress={handleNavigateToRegister}
          >
            Cadastre-se
          </SharedText>
        </View>
      </View>
    </SharedScreen>
  );
}
