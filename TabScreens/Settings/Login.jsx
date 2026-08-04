// LoginScreen.js
import React, {useState} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import {colors, type, spacing} from './theme';
import TunerHeader from './components/TunerHeader';
import ChannelInput from './components/ChannelInput';
import OnAirButton from './components/OnAirButton';

export default function LoginScreen({navigation, onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'Enter your email';
    if (!password) next.password = 'Enter your password';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: wire to your existing Firebase auth call, e.g.
      // await onLogin({ email, password });
      await onLogin?.({email, password});
    } catch (e) {
      setErrors({password: e?.message || 'Sign in failed. Try again.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <TunerHeader eyebrow="Member sign-in" />

          <ChannelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <ChannelInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={hidePassword}
            error={errors.password}
            trailingLabel={hidePassword ? 'SHOW' : 'HIDE'}
            onTrailingPress={() => setHidePassword(v => !v)}
          />

          <TouchableOpacity
            style={styles.forgotWrap}
            onPress={() => navigation?.navigate('ForgotPassword')}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>

          <OnAirButton
            label="Tune In"
            onPress={handleSubmit}
            loading={loading}
          />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>NEW LISTENER</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.footerRow}
            onPress={() => navigation?.navigate('Register')}>
            <Text style={styles.footerText}>
              Don't have a membership?{' '}
              <Text style={styles.footerLink}>Create one</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    justifyContent: 'center',
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgot: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.hairline,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.textMuted,
  },
  footerRow: {
    alignItems: 'center',
  },
  footerText: {
    ...type.body,
  },
  footerLink: {
    color: colors.accent,
    fontWeight: '700',
  },
});
