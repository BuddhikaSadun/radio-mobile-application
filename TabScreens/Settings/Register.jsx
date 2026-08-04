// RegisterScreen.js
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

export default function Register({navigation, onRegister}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Enter your name';
    if (!email.trim()) next.email = 'Enter your email';
    if (!password) next.password = 'Choose a password';
    else if (password.length < 8) next.password = 'At least 8 characters';
    if (confirmPassword !== password)
      next.confirmPassword = "Passwords don't match";
    if (!agreed) next.agreed = 'Accept the terms to continue';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: wire to your existing Firebase auth call, e.g.
      // await onRegister({ name, email, password });
      await onRegister?.({name, email, password});
    } catch (e) {
      setErrors({email: e?.message || 'Registration failed. Try again.'});
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
          <TunerHeader eyebrow="Create your membership" />

          <ChannelInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            error={errors.name}
          />

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
            placeholder="At least 8 characters"
            secureTextEntry={hidePassword}
            error={errors.password}
            trailingLabel={hidePassword ? 'SHOW' : 'HIDE'}
            onTrailingPress={() => setHidePassword(v => !v)}
          />

          <ChannelInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Retype your password"
            secureTextEntry={hidePassword}
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreed(v => !v)}
            activeOpacity={0.8}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed ? <View style={styles.checkboxDot} /> : null}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>terms</Text> and{' '}
              <Text style={styles.termsLink}>privacy policy</Text>
            </Text>
          </TouchableOpacity>
          {errors.agreed ? (
            <Text style={styles.termsError}>{errors.agreed}</Text>
          ) : null}

          <OnAirButton
            label="Go On Air"
            onPress={handleSubmit}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.footerRow}
            onPress={() => navigation?.navigate('Login')}>
            <Text style={styles.footerText}>
              Already a member? <Text style={styles.footerLink}>Sign in</Text>
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
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.hairline,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: colors.accent,
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  termsText: {
    ...type.body,
    flex: 1,
  },
  termsLink: {
    color: colors.accent,
    fontWeight: '600',
  },
  termsError: {
    marginTop: -spacing.lg + spacing.xs,
    marginBottom: spacing.lg,
    fontSize: 12,
    color: colors.error,
  },
  footerRow: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  footerText: {
    ...type.body,
  },
  footerLink: {
    color: colors.accent,
    fontWeight: '700',
  },
});
