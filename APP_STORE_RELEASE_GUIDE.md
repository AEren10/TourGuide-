# 🚀 TourGuide - App Store & Google Play Release Guide

**Proje Durumu Özeti:**

- ✅ Expo managed workflow
- ✅ expo-location kullanımı VAR
- ✅ react-native-maps kullanımı VAR
- ❌ Hesap sistemi YOK (şimdilik)
- ❌ Ödeme sistemi YOK (şimdilik)
- ✅ Mock API (gerçek backend entegrasyonu bekleniyor)

---

## A) iOS - Info.plist İzinleri & App Store Requirements

### 🔴 ZORUNLU İzinler (Projenizde Kullanılan)

#### 1. **Konum İzni** (expo-location kullanımı nedeniyle)

```xml
<!-- app.json içinde eklenecek -->
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "TourGuide uses your location to show nearby tours and guide you along your selected route with turn-by-turn navigation.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "TourGuide needs background location access to provide navigation guidance and notify you when you approach tour stops, even when the app is in the background.",
        "NSLocationAlwaysUsageDescription": "TourGuide uses your location in the background to provide continuous navigation and send notifications when you reach tour stops."
      }
    }
  }
}
```

**⚠️ Kritik Notlar:**

- **Sadece "When In Use" istemeniz önerilir** - Background location Apple tarafından sıkı incelemeye tabi
- Background location için **çok güçlü gerekçe** sunmanız gerekir
- Apple'ın önerisi: Önce "When In Use" isteyin, kullanıcı deneyiminden sonra "Always" için prompt gösterin

#### 2. **Kamera İzni** (Gelecekte check-in fotoğrafları için)

```xml
"NSCameraUsageDescription": "TourGuide needs camera access to let you capture and share photos at tour stops for check-ins and reviews."
```

#### 3. **Fotoğraf Kütüphanesi** (Gelecekte fotoğraf yükleme için)

```xml
"NSPhotoLibraryUsageDescription": "TourGuide needs access to your photo library to let you upload photos from tour stops and share your experiences.",
"NSPhotoLibraryAddUsageDescription": "TourGuide would like to save tour photos to your library."
```

### 🟢 HİÇ İSTEMEYİN (Gereksiz Red Sebebi)

- ❌ `NSMicrophoneUsageDescription` - Ses kaydı gereksiz
- ❌ `NSBluetoothAlwaysUsageDescription` - Bluetooth gereksiz
- ❌ `NSCalendarsUsageDescription` - Takvim gereksiz
- ❌ `NSContactsUsageDescription` - Kişiler gereksiz
- ❌ `NSMotionUsageDescription` - Hareket sensörü (şimdilik gereksiz)
- ❌ `NSHealthShareUsageDescription` - Sağlık verileri gereksiz

### 🔴 App Store Review - Sık Red Sebepleri

#### 1. **Guideline 2.1 - App Completeness**

**Risk:** Mock data ile submit etmek
**Çözüm:**

- ✅ Gerçek API entegrasyonu yapın
- ✅ Error handling ekleyin (network fail, empty states)
- ✅ Tüm butonlar çalışır olmalı

#### 2. **Guideline 5.1.1 - Data Collection and Storage**

**Risk:** Privacy Policy olmadan submit
**Çözüm:**

- ✅ Privacy Policy URL'i app.json'a ekleyin
- ✅ Terms of Service URL'i ekleyin

#### 3. **Guideline 2.5.4 - Location Services**

**Risk:** Background location gerekçesiz kullanım
**Çözüm:**

- ✅ Sadece navigasyon sırasında background location kullanın
- ✅ App Review Notes'ta detaylı açıklama yapın
- ✅ Video demo hazırlayın (navigation özelliğini gösteren)

#### 4. **Guideline 4.2 - Minimum Functionality**

**Risk:** Sadece web view veya çok basit uygulama
**Çözüm:**

- ✅ Native özellikler kullanın (harita, konum, offline veri)
- ✅ Unique value proposition gösterin

---

## B) Android - Manifest İzinleri & Google Play

### 🔴 ZORUNLU İzinler (AndroidManifest.xml)

```xml
<!-- app.json içinde eklenecek -->
{
  "expo": {
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ],
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

### ⚡ Runtime Permission Stratejisi

**Kodda Eklenecek (expo-location zaten hallediyor):**

```typescript
// src/hooks/useLocationPermission.ts (oluşturulacak)
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocationPermission = () => {
  const [status, setStatus] = useState<'granted' | 'denied' | 'undetermined'>(
    'undetermined'
  );

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setStatus(status);
  };

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
    return status === 'granted';
  };

  return { status, requestPermission };
};
```

### 🔴 Google Play Policy Riskleri

#### 1. **Location Permission - High Risk**

**Problem:** Background location çok hassas
**Çözüm:**

- ✅ Play Console'da "Location" permission için detaylı form doldurun
- ✅ "Why does your app need location?" - **Navigation** seçin
- ✅ Video demo ekleyin

#### 2. **Data Safety Form**

**Problem:** Eksik veya yanlış bilgi = otomatik red
**Çözüm:** Aşağıdaki C bölümüne bakın

---

## C) Gizlilik - Privacy Policy & Data Safety

### 📋 Privacy Policy Taslağı Başlıkları

**Zorunlu URL:** https://yourwebsite.com/privacy-policy

```markdown
# Privacy Policy - TourGuide

## 1. Information We Collect

- Location data (GPS coordinates)
- Usage data (tours viewed, favorites, check-ins)
- Device information (OS version, device model)
- Optional: Photos (user-uploaded for check-ins)

## 2. How We Use Your Information

- Provide navigation and tour guidance
- Show nearby tours and points of interest
- Improve app performance and user experience
- Send notifications about tour progress

## 3. Data Sharing

- We DO NOT sell your data
- Google Maps API (for map display)
- Analytics providers (anonymized data)

## 4. Data Storage

- Location data: Stored temporarily during active tours
- User preferences: Stored locally on device
- Cloud backup: [If applicable]

## 5. Your Rights

- Access your data
- Delete your data
- Opt-out of analytics
- Disable location services

## 6. Contact

support@tourguide.com
```

### 📊 Data Safety Tablosu (Google Play & Apple App Privacy)

| Veri Türü             | Toplanan Mı? | Amaç                                   | Üçüncü Tarafla Paylaşılıyor Mu? | Saklama Süresi         |
| --------------------- | ------------ | -------------------------------------- | ------------------------------- | ---------------------- |
| **Konum (Kesin)**     | ✅ Evet      | Navigasyon, yakındaki turları gösterme | ✅ Evet (Google Maps API)       | Tur sırasında geçici   |
| **Konum (Yaklaşık)**  | ✅ Evet      | Şehir bazlı tur önerileri              | ❌ Hayır                        | 30 gün                 |
| **Fotoğraflar**       | ⚠️ Opsiyonel | Check-in, kullanıcı incelemeleri       | ❌ Hayır                        | Kullanıcı silene kadar |
| **Kullanım Verileri** | ✅ Evet      | Uygulama iyileştirme                   | ⚠️ Anonim (Analytics)           | 90 gün                 |
| **Cihaz Kimliği**     | ✅ Evet      | Crash reporting                        | ⚠️ Anonim (Sentry/Crashlytics)  | 30 gün                 |
| **İsim/Email**        | ❌ Henüz Yok | -                                      | -                               | -                      |
| **Ödeme Bilgileri**   | ❌ Hayır     | -                                      | -                               | -                      |

### 🍎 Apple App Privacy Form (App Store Connect)

**Data Used to Track You:** ❌ NO

**Data Linked to You:**

- ✅ Location (Precise Location)
- ✅ User Content (Photos - optional)

**Data Not Linked to You:**

- ✅ Usage Data
- ✅ Diagnostics

---

## D) Hesap Sistemi (Gelecek Özellik)

### ⚠️ Apple & Google Zorunlulukları

**Apple Kuralı:** Hesap oluşturma varsa → **Hesap silme** (in-app) ZORUNLU

**Google Kuralı:** 2024'ten itibaren aynı kural

### 🔄 Hesap Silme Akış Önerisi

```typescript
// src/features/profile/screens/DeleteAccountScreen.tsx

1. Kullanıcıya uyarı göster:
   "⚠️ Hesabınızı silmek istiyor musunuz?"
   "Bu işlem geri alınamaz. Tüm verileriniz silinecek."

2. Onay için şifre/email doğrulama iste

3. Backend'e DELETE request gönder:
   POST /api/account/delete
   - Tüm kullanıcı verileri sil (GDPR uyumlu)
   - Konum geçmişi sil
   - Favoriler, check-in'ler sil

4. Başarılı silme sonrası:
   - Lokal verileri temizle
   - Onboarding ekranına yönlendir
   - "Hesabınız başarıyla silindi" mesajı

5. Email confirmation gönder (opsiyonel)
```

**Kritik:** Hesap silme butonu ayarlarda **kolay erişilebilir** olmalı, gizli menülerde olmamalı.

---

## E) Ödeme Sistemi (Gelecek Özellik)

### 🍎 iOS - In-App Purchase (IAP) ZORUNLU

**Apple Kuralı:** Dijital içerik satışı → %100 IAP kullanmalısınız

**Yasak:**

- ❌ External payment links (Stripe, PayPal)
- ❌ "Web sitemizden satın alın" yönlendirmeleri
- ❌ Uygulama içinde kredi kartı formu

**İzin Verilen:**

- ✅ Fiziksel ürünler (tur paketleri değil, turistik eşya ise)
- ✅ Gerçek dünya hizmetleri (tur rehberi rezervasyonu - tartışmalı)

### 📱 Abonelik Ekranı Gereksinimleri

**Apple Guideline 3.1.2 - Subscription Requirements:**

```typescript
// Abonelik ekranında ZORUNLU bilgiler:

1. Fiyat (açık, net)
   "Premium: $9.99/month"

2. Deneme süresi (varsa)
   "7-day free trial, then $9.99/month"

3. Otomatik yenileme uyarısı
   "Subscription automatically renews unless cancelled"

4. İptal yöntemi
   "Cancel anytime in Settings > Subscriptions"

5. Restore Purchases butonu
   <Button>Restore Purchases</Button>

6. Privacy Policy & Terms linki
   Required by Apple
```

**Örnek Kod:**

```typescript
// src/features/subscription/SubscriptionScreen.tsx
import * as StoreReview from 'expo-store-review';

<View>
  <Text>Premium - $9.99/month</Text>
  <Text style={{ fontSize: 12, color: 'gray' }}>
    7-day free trial. Cancel anytime. Subscription renews automatically.
  </Text>
  <Button onPress={subscribe}>Start Free Trial</Button>
  <Button onPress={restorePurchases}>Restore Purchases</Button>
  <Link href="/privacy">Privacy Policy</Link>
  <Link href="/terms">Terms of Service</Link>
</View>
```

### 🔴 RİSKLİ Yaklaşımlar (KAÇININ)

1. ❌ "External Payment" button - **Kesin Red**
2. ❌ Email'de ödeme linki göndermek - Apple bunu fark ederse ban
3. ❌ "Reader" app exception iddiası (sizin durumunuz için geçersiz)

---

## F) Teknik Kalite - Crash-Free Checklist

### ✅ Error Handling

**Şu anda EKSİK - Eklenecek:**

```typescript
// src/utils/errorHandler.ts (oluşturulacak)
import * as Sentry from '@sentry/react-native'; // opsiyonel

export const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // Sentry.captureException(error); // production'da
  }
  return 'Something went wrong. Please try again.';
};

// src/components/layout/ErrorBoundary.tsx (oluşturulacak)
import React, { Component, ReactNode } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState title="Something went wrong" />;
    }
    return this.props.children;
  }
}
```

### 🌐 Offline Handling

**Şu anda EKSİK - Eklenecek:**

```typescript
// src/hooks/useNetworkStatus.ts (oluşturulacek)
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
    return unsubscribe;
  }, []);

  return isOnline;
};

// Kullanım:
const HomeScreen = () => {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return <OfflineState />;
  }
  // ...
};
```

### 🔒 Logging PII (Kişisel Veri) - YASAK

**KESİNLİKLE loglama yapmayın:**

- ❌ Kesin konum koordinatları (console.log'da)
- ❌ Email adresleri
- ❌ İsimler
- ❌ Fotoğraf URL'leri

**Güvenli log örneği:**

```typescript
// ❌ YANLIŞ
console.log('User location:', userLocation);

// ✅ DOĞRU
console.log('User location:', { lat: 'REDACTED', lng: 'REDACTED' });
```

### 📊 Analytics Opt-Out

**Zorunlu özellik:**

```typescript
// src/utils/analytics.ts
import * as Analytics from 'expo-analytics'; // veya tercih ettiğiniz

export const trackEvent = (event: string, params?: object) => {
  const analyticsEnabled = getAnalyticsConsent(); // AsyncStorage'dan
  if (analyticsEnabled) {
    Analytics.logEvent(event, params);
  }
};

// Settings ekranında:
<Switch
  value={analyticsEnabled}
  onValueChange={setAnalyticsConsent}
/>
<Text>Share anonymous usage data</Text>
```

### ⚡ Performans

**Cold Start Optimizasyonu:**

- ✅ Expo'da zaten optimize
- ⚠️ Heavy imports'u lazy load edin
- ✅ Splash screen 2-3 saniye içinde kapansın

**Bundle Size:**

```bash
# Check bundle size
npx expo export --platform ios --output-dir dist
du -sh dist # macOS/Linux
```

### ♿ Accessibility

**Eklenmesi Gerekenler:**

```typescript
// Her interaktif elemente:
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Start tour"
  accessibilityHint="Begins the guided tour"
>
```

### 🌓 Dark Mode

**✅ MEVCUT** - Projenizde zaten var (useTheme hook'u)

### 📱 Farklı Ekranlar

**Test Edilmeli:**

- iPhone SE (küçük ekran)
- iPhone 15 Pro Max (büyük ekran)
- iPad (tablet - destekleniyor mu?)
- Android - farklı aspect ratio'lar

### 🚫 Network Fail States

**✅ MEVCUT** - ErrorState komponenti var
**⚠️ Eksik:** Loading states bazı yerlerde

---

## G) Release Checklist

### 📦 1. Versioning

```json
// app.json
{
  "expo": {
    "version": "1.0.0", // User-facing
    "ios": {
      "buildNumber": "1" // Internal (her build'de artırın)
    },
    "android": {
      "versionCode": 1 // Internal (her build'de artırın)
    }
  }
}
```

**Versioning kuralı:**

- Major.Minor.Patch (1.0.0)
- Her feature → Minor artır (1.1.0)
- Bugfix → Patch artır (1.0.1)
- Breaking changes → Major artır (2.0.0)

### 🔑 2. Signing

**iOS:**

```bash
# EAS Build kullanarak (önerilen)
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios --profile production
```

**Android:**

```bash
# Keystore oluştur (sadece ilk kez)
keytool -genkeypair -v -keystore tourguide.keystore -alias tourguide -keyalg RSA -keysize 2048 -validity 10000

# EAS Build
eas build --platform android --profile production
```

**⚠️ Kritik:** Keystore'u GİZLİ tutun, asla Git'e commit atmayın!

### 🧪 3. TestFlight / Internal Testing

**iOS - TestFlight:**

1. EAS build ile IPA oluşturun
2. App Store Connect'e yükleyin
3. Export Compliance: "No" (şifreleme yok)
4. Internal testers ekleyin
5. En az 1 hafta test edin

**Android - Internal Testing:**

1. Google Play Console → Testing → Internal testing
2. AAB dosyası yükleyin
3. Test grubu oluşturun
4. En az 1 hafta test edin

### 📸 4. Screenshots

**iOS (Gerekli boyutlar):**

- 6.7" (iPhone 15 Pro Max): 1290 x 2796
- 6.5" (iPhone 14 Plus): 1242 x 2688
- 5.5" (iPhone 8 Plus): 1242 x 2208

**Android:**

- Phone: 1080 x 1920 minimum
- Tablet: 1920 x 1080 (opsiyonel)

**İçerik önerileri:**

1. Ana ekran (hero card + tours)
2. Harita navigasyon
3. Tur detayı
4. Quick actions (check-in vb.)
5. Favoriler

**Araç:** Expo'nun screenshot helper'ı veya manual device capture

### ✍️ 5. Store Listing Metinleri

**App Name:**

- TourGuide (veya benzersiz isim)
- Max 30 karakter (iOS), 50 karakter (Android)

**Subtitle (iOS):**

- "Explore cities with guided tours"
- Max 30 karakter

**Short Description (Android):**

- "Discover hidden gems with self-guided tours"
- Max 80 karakter

**Description (Her iki platform):**

```
🗺️ TourGuide - Your Personal Travel Companion

Explore cities like a local with curated, self-guided tours.

✨ FEATURES:
• 📍 GPS-based navigation
• 🎧 Audio guides for each stop
• 📸 Check-in and share photos
• ⭐ Save your favorite tours
• 🌙 Works in 20+ cities

🚶 PERFECT FOR:
Solo travelers, couples, families, and anyone who loves to explore

📱 EASY TO USE:
1. Choose a tour
2. Start walking
3. Follow your route
4. Learn and discover

Download now and start your adventure! 🌍
```

**Keywords (iOS):**

- travel, tour, guide, walking, city, explore, navigation, tourism, sightseeing, trip
- Max 100 karakter (virgülle ayrılmış)

### 🔞 6. Age Rating

**iOS:**

- Rating: 4+ (herkes için)
- Content: None (şiddet, cinsellik yok)

**Android:**

- Rating: Everyone
- Content: None

### ⚠️ 7. Content Warnings

**Konum kullanımı için:**

- ✅ App Store Connect → App Privacy → Location
- ✅ Google Play Console → Data Safety → Location

**Üçüncü taraf içerik varsa:**

- User-generated content uyarısı ekleyin

---

## 🚀 Son Adımlar (Submit Öncesi)

### ✅ Final Checklist

- [ ] Privacy Policy yayında (public URL)
- [ ] Terms of Service yayında
- [ ] Tüm permissions tanımlı (iOS + Android)
- [ ] Error handling tamamlandı
- [ ] Offline state handling var
- [ ] Analytics opt-out var
- [ ] TestFlight/Internal testing tamamlandı
- [ ] Screenshots hazır (her boyut)
- [ ] Store listing metinleri yazıldı
- [ ] App icons hazır (1024x1024)
- [ ] Splash screen hazır
- [ ] Real API entegre (mock data kaldırıldı)
- [ ] Crash reporting entegre (Sentry/Crashlytics)
- [ ] Beta test feedback'leri düzeltildi
- [ ] App Review Notes hazır

### 📝 App Review Notes Şablonu

```
Dear App Review Team,

TourGuide is a self-guided tour application that helps travelers explore cities.

LOCATION USAGE:
We use location services to:
1. Show nearby tours and points of interest
2. Provide turn-by-turn navigation during active tours
3. Notify users when approaching tour stops

To test navigation features:
1. Login with test account: test@tourguide.com / Test123!
2. Select "Kyoto Hidden Alleys" tour
3. Tap "Start Tour"
4. Allow location access
5. Simulate location to test navigation

TEST ACCOUNT:
Email: test@tourguide.com
Password: Test123!

VIDEO DEMO:
[Upload a video showing key features]

Thank you for reviewing our app!
```

---

## 🆘 Red Alırsanız (Rejection)

### Ortak Red Sebepleri & Çözümler

**1. "Guideline 2.1 - App not functional"**

- Çözüm: Mock data'yı kaldırın, real API kullanın

**2. "Guideline 5.1.1 - Privacy Policy missing"**

- Çözüm: Privacy Policy URL'i ekleyin

**3. "Guideline 2.5.4 - Location services not justified"**

- Çözüm: App Review Notes'ta detaylı açıklama + video demo

**4. "Guideline 4.2 - Minimum functionality"**

- Çözüm: Daha fazla unique feature ekleyin (offline maps, audio guides vb.)

### 📧 Appeal Süreci

1. Resolution Center'da yanıt verin
2. Detaylı açıklama + screenshot/video ekleyin
3. Değişiklikleri yaptıktan sonra yeniden submit edin

---

## 📚 Ek Kaynaklar

- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)
- [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [App Privacy Form Guide](https://developer.apple.com/app-store/app-privacy-details/)

---

**Son Güncelleme:** 2026-02-16
**Hazırlayan:** Claude Code Assistant
