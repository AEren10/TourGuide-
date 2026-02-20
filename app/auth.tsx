import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/context/AuthContext';

type Mode = 'login' | 'register';

export default function AuthScreen() {
  const { theme } = useTheme();
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState<Mode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Hata', 'E-posta ve şifre alanları boş bırakılamaz.');
      return;
    }
    if (!isLogin && !fullName.trim()) {
      Alert.alert('Hata', 'Ad Soyad alanı boş bırakılamaz.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email.trim(), password);
        // signIn başarılıysa _layout auth guard /(tabs)'e yönlendirir
      } else {
        await signUp(email.trim(), password, fullName.trim());
        // Supabase email confirmation açıksa oturum hemen açılmaz
        // Kullanıcıya bilgi ver, giriş moduna geç
        Alert.alert(
          'Hesap Oluşturuldu! 🎉',
          'E-posta adresine doğrulama bağlantısı gönderdik.\n\nBağlantıya tıkladıktan sonra giriş yapabilirsin.',
          [{ text: 'Tamam', onPress: () => setMode('login') }]
        );
      }
    } catch (err: any) {
      const raw: string = err?.message || '';
      const msg = raw.includes('Invalid login credentials')
        ? 'E-posta veya şifre hatalı.'
        : raw.includes('User already registered') ||
            raw.includes('already registered')
          ? 'Bu e-posta adresi zaten kayıtlı. Giriş yapmayı dene.'
          : raw.includes('rate limit') ||
              raw.includes('Rate limit') ||
              raw.includes('over_email_send_rate_limit') ||
              raw.includes('email rate limit')
            ? 'Çok fazla deneme yaptın. Lütfen birkaç dakika bekle ve tekrar dene.'
            : raw.includes('Email not confirmed')
              ? 'E-posta adresini henüz doğrulamadın. Gelen kutunu kontrol et.'
              : raw || 'Bir hata oluştu. Lütfen tekrar dene.';
      Alert.alert('Hata', msg);
    } finally {
      setLoading(false);
    }
  };

  const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: theme.colors.background },
    safe: { flex: 1 },
    scroll: { flexGrow: 1 },
    keyboardView: { flex: 1 },
    inner: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
      paddingVertical: 48,
    },
    logoWrap: {
      alignItems: 'center',
      marginBottom: 40,
      gap: 12,
    },
    logoCircle: {
      width: 72,
      height: 72,
      borderRadius: 24,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appName: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    appSub: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    card: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 24,
      padding: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: 16,
    },
    tabRow: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: 14,
      padding: 4,
      gap: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 11,
    },
    tabActive: {
      backgroundColor: theme.colors.surfaceElevated,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
    },
    tabTextActive: { color: theme.colors.text },
    tabTextInactive: { color: theme.colors.textSecondary },
    inputGroup: { gap: 10 },
    inputLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 14,
      height: 50,
      gap: 10,
    },
    inputWrapFocused: {
      borderColor: theme.colors.primary,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: theme.colors.text,
      fontWeight: '500',
    },
    eyeBtn: {
      padding: 4,
    },
    submitBtn: {
      height: 52,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      marginTop: 4,
    },
    submitBtnDisabled: {
      opacity: 0.6,
    },
    submitBtnText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#fff',
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 4,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      fontSize: 12,
      color: theme.colors.textTertiary,
      fontWeight: '500',
    },
    footerText: {
      textAlign: 'center',
      fontSize: 13,
      color: theme.colors.textSecondary,
      marginTop: 8,
    },
    footerLink: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe}>
        <KeyboardAvoidingView
          style={s.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={s.inner}>
              {/* Logo */}
              <View style={s.logoWrap}>
                <View style={s.logoCircle}>
                  <Ionicons name="map" size={36} color="#fff" />
                </View>
                <Text style={s.appName}>TourGuide</Text>
                <Text style={s.appSub}>Şehri Keşfetmeye Hazır Mısın?</Text>
              </View>

              {/* Card */}
              <View style={s.card}>
                {/* Tab Switch */}
                <View style={s.tabRow}>
                  <TouchableOpacity
                    style={[s.tab, isLogin && s.tabActive]}
                    onPress={() => setMode('login')}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        s.tabText,
                        isLogin ? s.tabTextActive : s.tabTextInactive,
                      ]}
                    >
                      Giriş Yap
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.tab, !isLogin && s.tabActive]}
                    onPress={() => setMode('register')}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        s.tabText,
                        !isLogin ? s.tabTextActive : s.tabTextInactive,
                      ]}
                    >
                      Kayıt Ol
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Full Name — sadece register modunda */}
                {!isLogin && (
                  <View style={s.inputGroup}>
                    <Text style={s.inputLabel}>Ad Soyad</Text>
                    <View
                      style={[
                        s.inputWrap,
                        focusedField === 'fullName' && s.inputWrapFocused,
                      ]}
                    >
                      <Ionicons
                        name="person-outline"
                        size={18}
                        color={theme.colors.textTertiary}
                      />
                      <TextInput
                        style={s.input}
                        placeholder="Adın Soyadın"
                        placeholderTextColor={theme.colors.textPlaceholder}
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="words"
                        returnKeyType="next"
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  </View>
                )}

                {/* E-posta */}
                <View style={s.inputGroup}>
                  <Text style={s.inputLabel}>E-posta</Text>
                  <View
                    style={[
                      s.inputWrap,
                      focusedField === 'email' && s.inputWrapFocused,
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color={theme.colors.textTertiary}
                    />
                    <TextInput
                      style={s.input}
                      placeholder="ornek@email.com"
                      placeholderTextColor={theme.colors.textPlaceholder}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>

                {/* Şifre */}
                <View style={s.inputGroup}>
                  <Text style={s.inputLabel}>Şifre</Text>
                  <View
                    style={[
                      s.inputWrap,
                      focusedField === 'password' && s.inputWrapFocused,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={theme.colors.textTertiary}
                    />
                    <TextInput
                      style={s.input}
                      placeholder={isLogin ? 'Şifren' : 'En az 6 karakter'}
                      placeholderTextColor={theme.colors.textPlaceholder}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!passwordVisible}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <TouchableOpacity
                      style={s.eyeBtn}
                      onPress={() => setPasswordVisible((v) => !v)}
                    >
                      <Ionicons
                        name={
                          passwordVisible ? 'eye-off-outline' : 'eye-outline'
                        }
                        size={18}
                        color={theme.colors.textTertiary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit */}
                <TouchableOpacity
                  style={[s.submitBtn, loading && s.submitBtnDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Text style={s.submitBtnText}>
                        {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
                      </Text>
                      <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Footer switch */}
              <Text style={s.footerText}>
                {isLogin ? 'Hesabın yok mu? ' : 'Zaten hesabın var mı? '}
                <Text
                  style={s.footerLink}
                  onPress={() => setMode(isLogin ? 'register' : 'login')}
                >
                  {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
