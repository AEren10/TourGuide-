# 📦 Eksik Dependencies (Yüklenecek)

App Store/Google Play yayınlamadan önce aşağıdaki package'ları yüklemeniz gerekiyor:

## 🔴 ZORUNLU

### 1. Network Monitoring

```bash
npm install @react-native-community/netinfo
```

**Kullanım:** `useNetworkStatus` hook'u bu package'a bağımlı
**Sebep:** Offline durumunu tespit etmek için gerekli

---

## 🟡 ÇOK ÖNERİLEN

### 2. Crash Reporting

```bash
# Option 1: Sentry (Önerilen)
npx @sentry/wizard@latest -i reactNative

# Option 2: Firebase Crashlytics
npm install @react-native-firebase/app @react-native-firebase/crashlytics
```

**Kullanım:** ErrorBoundary ve global error handler
**Sebep:** Production'da crash'leri takip etmek için kritik

### 3. Analytics

```bash
# Option 1: Expo Analytics
npm install expo-firebase-analytics

# Option 2: Segment
npm install @segment/analytics-react-native
```

**Kullanım:** User behavior tracking (opt-out mekanizması ile)
**Sebep:** Kullanıcı davranışlarını anlamak, app'i geliştirmek

---

## 🟢 OPSIYONEL

### 4. Push Notifications

```bash
npm install expo-notifications
```

**Kullanım:** Tur hatırlatmaları, yakındaki duraklar için bildirim
**Sebep:** User engagement artırır

### 5. Image Picker/Camera

```bash
npm install expo-image-picker
```

**Kullanım:** Check-in fotoğrafları, review fotoğrafları
**Sebep:** User-generated content için gerekli

### 6. Async Storage (Offline Data)

```bash
npm install @react-native-async-storage/async-storage
```

**Kullanım:** Favoriler, preferences, cached data
**Sebep:** Offline mode için gerekli

### 7. Share API

```bash
npm install expo-sharing
```

**Kullanım:** Turları sosyal medyada paylaşma
**Sebep:** Viral growth için önemli

---

## 📋 Yükleme Sırası

Tüm package'ları aşağıdaki sırayla yükleyin:

```bash
# 1. Zorunlu
npm install @react-native-community/netinfo

# 2. Crash Reporting
npx @sentry/wizard@latest -i reactNative

# 3. Analytics (birini seçin)
npm install expo-firebase-analytics
# VEYA
npm install @segment/analytics-react-native

# 4. Diğerleri (ihtiyaç varsa)
npm install expo-notifications expo-image-picker @react-native-async-storage/async-storage expo-sharing

# 5. iOS için pod install
cd ios && pod install && cd ..

# 6. Restart development server
npx expo start --clear
```

---

## ⚠️ Önemli Notlar

1. **Sentry Kurulumu:**
   - `npx @sentry/wizard` otomatik setup yapacak
   - `sentry.properties` dosyası oluşacak (Git'e eklemeyin!)
   - DSN key alacaksınız

2. **Firebase Kurulumu:**
   - Firebase Console'da proje oluşturun
   - `google-services.json` (Android) indirin
   - `GoogleService-Info.plist` (iOS) indirin
   - app.json'a Firebase plugin ekleyin

3. **Version Compatibility:**
   - Expo SDK 54 ile uyumlu versiyonları kullanın
   - `expo install` komutunu kullanarak otomatik uyumlu versiyon yükleyin:
   ```bash
   npx expo install @react-native-community/netinfo
   ```

---

## 🔧 Configuration Örnekleri

### Sentry (src/utils/sentry.ts)

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  enableInExpoDevelopment: false,
  debug: __DEV__,
  environment: __DEV__ ? 'development' : 'production',
  beforeSend(event) {
    // PII temizleme
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },
});
```

### Analytics (src/utils/analytics.ts)

```typescript
import * as Analytics from 'expo-firebase-analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ANALYTICS_KEY = '@analytics_enabled';

export const isAnalyticsEnabled = async () => {
  const value = await AsyncStorage.getItem(ANALYTICS_KEY);
  return value !== 'false'; // Default: enabled
};

export const setAnalyticsEnabled = async (enabled: boolean) => {
  await AsyncStorage.setItem(ANALYTICS_KEY, String(enabled));
  await Analytics.setAnalyticsCollectionEnabled(enabled);
};

export const trackEvent = async (event: string, params?: object) => {
  if (await isAnalyticsEnabled()) {
    await Analytics.logEvent(event, params);
  }
};
```

### Network Status (Already created: src/hooks/useNetworkStatus.ts)

Hook zaten oluşturuldu, sadece package'ı yükleyin.

---

**Not:** Tüm package'ları yükledikten sonra `npm run typecheck` çalıştırarak TypeScript hatalarını kontrol edin.
