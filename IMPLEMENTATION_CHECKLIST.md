# 📋 TourGuide - Implementation Checklist (App Store Yayın Öncesi)

## ✅ Tamamlandı

### Modern UI Components

- [x] GlassCard komponenti
- [x] FloatingSearchBar komponenti
- [x] HeroCard komponenti
- [x] QuickStartCategories komponenti
- [x] FeaturedTourCard komponenti
- [x] QuickActionsBar komponenti
- [x] HomeHeader modernize edildi
- [x] Home screen yeni tasarımla güncellendi
- [x] Stop detail sayfası güncellendi

### Tema & Stil

- [x] Primary renk #ee8c2b olarak güncellendi
- [x] Dark mode renkleri HTML tasarımına uygun
- [x] Glassmorphism efektleri eklendi

### App Store Hazırlık

- [x] app.json permission'ları eklendi
- [x] iOS Info.plist açıklamaları yazıldı
- [x] Android permissions tanımlandı
- [x] EAS Build konfigürasyonu (eas.json)
- [x] Detaylı release guide hazırlandı

### Error Handling & Network

- [x] ErrorBoundary komponenti
- [x] OfflineState komponenti
- [x] useNetworkStatus hook'u
- [x] useLocationPermission hook'u

---

## ⚠️ Yapılması Gerekenler (Yayın Öncesi ZORUNLU)

### 1. Backend Entegrasyonu

- [ ] Mock API'yi gerçek backend ile değiştir
- [ ] API base URL'i environment variable olarak ayarla
- [ ] Error handling için try-catch blokları ekle
- [ ] Loading states tüm ekranlarda mevcut olmalı

### 2. Network Monitoring

- [ ] `@react-native-community/netinfo` package'ını yükle:
  ```bash
  npm install @react-native-community/netinfo
  ```
- [ ] Ana ekranlara useNetworkStatus hook'u ekle
- [ ] Offline durumunda OfflineState göster

### 3. Location Services

- [ ] Uygulama açılışında location permission iste
- [ ] Permission denied durumunda kullanıcıyı bilgilendir
- [ ] Background location sadece navigasyon sırasında kullan

### 4. Privacy & Legal

- [ ] Privacy Policy yazıp web sitesine yükle
- [ ] Terms of Service yazıp web sitesine yükle
- [ ] Privacy Policy URL'ini app.json'a ekle
- [ ] Data Safety formunu doldur (Google Play Console)
- [ ] App Privacy formunu doldur (App Store Connect)

### 5. Analytics & Crash Reporting

- [ ] Sentry veya Firebase Crashlytics entegre et
- [ ] Analytics opt-out mekanizması ekle (Settings)
- [ ] PII (kişisel veri) loglama yapmadığından emin ol

### 6. Testing

- [ ] iOS TestFlight'ta en az 1 hafta test
- [ ] Android Internal Testing'de en az 1 hafta test
- [ ] Farklı cihazlarda test (küçük ekran, büyük ekran, tablet)
- [ ] Dark mode test
- [ ] Offline scenario test
- [ ] Location permission scenarios test

### 7. Store Assets

- [ ] App icon hazırla (1024x1024)
- [ ] Screenshots çek (her gerekli boyut için)
  - iOS: 6.7", 6.5", 5.5"
  - Android: 1080x1920 minimum
- [ ] Store listing metinlerini yaz
- [ ] Keywords belirle (iOS)
- [ ] Short description yaz (Android)

### 8. Build & Sign

- [ ] Bundle identifier/package name'i güncelle (app.json)
- [ ] iOS signing certificate oluştur
- [ ] Android keystore oluştur ve GÜVENLİ ŞEKİLDE sakla
- [ ] EAS Build ile production build al
- [ ] Build'i test et

### 9. App Review Preparation

- [ ] Test account oluştur (eğer login gerekiyorsa)
- [ ] App Review Notes hazırla
- [ ] Video demo hazırla (özellikle location özelliği için)
- [ ] Tüm butonların çalıştığından emin ol

---

## 🔧 Opsiyonel (Önerilen)

### Kullanıcı Deneyimi

- [ ] Onboarding ekranı ekle (ilk açılışta)
- [ ] Tour tutorial'ı ekle
- [ ] Push notification desteği (tur hatırlatmaları için)
- [ ] Offline mode (cached tours)

### Özellikler

- [ ] Audio guide entegrasyonu
- [ ] Fotoğraf check-in özelliği
- [ ] Review/rating sistemi
- [ ] Social sharing (Facebook, Instagram)

### Performans

- [ ] Image lazy loading
- [ ] Map tile caching
- [ ] Bundle size optimizasyonu
- [ ] Cold start time optimizasyonu (<2 saniye)

### Accessibility

- [ ] Tüm TouchableOpacity'lere accessibilityLabel ekle
- [ ] Voice Over test (iOS)
- [ ] TalkBack test (Android)
- [ ] Color contrast check

---

## 📦 Dependencies Eksikler

Aşağıdaki package'ları yüklemeniz gerekiyor:

```bash
# Network monitoring
npm install @react-native-community/netinfo

# Crash reporting (opsiyonel ama önerilen)
npm install @sentry/react-native

# Analytics (opsiyonel)
npm install expo-firebase-analytics
# veya
npm install @segment/analytics-react-native
```

---

## 🚀 Release Komuları

### Development Build

```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Preview (TestFlight/Internal)

```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

### Production

```bash
# iOS
eas build --profile production --platform ios
eas submit --platform ios

# Android
eas build --profile production --platform android
eas submit --platform android
```

---

## 📝 Son Kontrol (Submit Öncesi)

- [ ] Version number güncellendi
- [ ] Build number artırıldı
- [ ] Bundle identifier doğru
- [ ] Privacy Policy link aktif
- [ ] Terms of Service link aktif
- [ ] Test account bilgileri hazır
- [ ] Screenshots yüklendi
- [ ] Store listing tamamlandı
- [ ] App Review Notes yazıldı
- [ ] Real API kullanılıyor (mock data yok)
- [ ] Tüm console.log'lar temizlendi (veya sadece **DEV** modunda)
- [ ] Crash reporting aktif
- [ ] Analytics çalışıyor

---

## 🆘 Sorun Giderme

### Build Hatası

```bash
# Cache temizle
npx expo start --clear

# Node modules yeniden yükle
rm -rf node_modules
npm install

# iOS pods yeniden yükle
cd ios && pod install && cd ..
```

### Permission Hatası (iOS)

- Info.plist açıklamalarını kontrol et
- Xcode'da manuel olarak ekle (gerekirse)

### Google Maps Hatası (Android)

- Google Maps API key'i app.json'a eklenmiş mi kontrol et
- Google Cloud Console'da API enabled mi kontrol et

---

**Son Güncelleme:** 2026-02-16
