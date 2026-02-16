# 🚀 TourGuide - Hızlı Release Rehberi

## 📌 Özet Durum

✅ **Tamamlanan:**

- Modern UI komponentleri
- Tema güncellemesi (#ee8c2b)
- Permission configuration (iOS & Android)
- Error handling infrastructure
- Release guide hazırlandı

⚠️ **Yapılması Gereken:**

- Backend entegrasyonu (mock data → real API)
- Dependencies yükleme
- Privacy Policy & Terms yazma
- Testing (TestFlight/Internal)
- Store assets hazırlama

---

## 🎯 Hızlı Başlangıç (3 Adımda Release)

### 1️⃣ Dependencies Yükle

```bash
npm install @react-native-community/netinfo
npx @sentry/wizard@latest -i reactNative
```

### 2️⃣ Backend'i Bağla

```typescript
// src/services/api.ts içinde mockBaseQuery'yi değiştir:
const realBaseQuery = fetchBaseQuery({
  baseUrl: 'https://your-api.com/api',
});
```

### 3️⃣ Build & Submit

```bash
# EAS CLI yükle
npm install -g eas-cli

# Login
eas login

# Build
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit
eas submit --platform ios
eas submit --platform android
```

---

## 📋 Kritik Checklist (30 dk'da)

### ✅ Teknik

- [ ] `npm install @react-native-community/netinfo` çalıştır
- [ ] Mock API → Real API değiştir
- [ ] app.json'da `bundleIdentifier` ve `package` güncelle
- [ ] Privacy Policy URL ekle (app.json veya store listing)
- [ ] Console.log'ları temizle

### ✅ Legal

- [ ] Privacy Policy yaz ve yayınla
- [ ] Terms of Service yaz ve yayınla
- [ ] Data Safety form doldur (Google Play)
- [ ] App Privacy form doldur (App Store)

### ✅ Store Assets

- [ ] App icon hazır (1024x1024)
- [ ] 5 screenshot çek (Ana ekran, Harita, Tur detayı, vb.)
- [ ] Store açıklaması yaz (200-300 kelime)
- [ ] Keywords belirle (travel, tour, guide, city, explore, vb.)

### ✅ Testing

- [ ] iOS TestFlight test (min 3 gün)
- [ ] Android Internal test (min 3 gün)
- [ ] Location permission test
- [ ] Offline scenario test

---

## ⚡ Hızlı Komutlar

```bash
# Geliştirme
npm start

# Type check
npm run typecheck

# Lint
npm run lint

# Build (Development)
eas build --profile development --platform ios

# Build (Production)
eas build --profile production --platform all

# Submit
eas submit --platform all
```

---

## 🔴 ÖNEMLİ UYARILAR

### iOS Red Sebepleri (Önlem)

1. **Mock data kullanma** → Real API kullan
2. **Privacy Policy eksik** → URL ekle
3. **Location justification yetersiz** → App Review Notes'a detaylı açıklama yaz

### Android Red Sebepleri (Önlem)

1. **Data Safety form eksik** → Tüm alanları doldur
2. **Permissions açıklaması yok** → Her permission için açıklama yaz
3. **Crash rate yüksek** → Sentry ile test et

---

## 📞 Yardım

### Dokümantasyon

1. **Detaylı Release Guide:** `APP_STORE_RELEASE_GUIDE.md`
2. **Implementation Checklist:** `IMPLEMENTATION_CHECKLIST.md`
3. **Dependencies:** `DEPENDENCIES_TO_INSTALL.md`

### Expo Docs

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)

---

## 🎉 İlk Release Sonrası

### Hemen Yap

- [ ] Version tracking sistemi kur (Sentry releases)
- [ ] Analytics dashboard'u incele
- [ ] User feedback topla
- [ ] Crash reports kontrol et

### 1 Hafta İçinde

- [ ] Performance metrics analiz et (cold start, API response times)
- [ ] User reviews oku ve yanıtla
- [ ] Bug fix release planla (gerekirse)

### 1 Ay İçinde

- [ ] Feature roadmap belirle
- [ ] A/B testing planla
- [ ] Marketing stratejisi oluştur

---

**TL;DR:** Dependencies yükle → Backend bağla → Privacy Policy yaz → Build al → Test et → Submit et

**Tahmini Süre:** 2-3 hafta (backend hazırsa 1 hafta)
