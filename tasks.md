# TASKS — TourGuide App

> Son güncelleme: 2026-02-20

---

## Genel Durum Özeti

Proje ~80% MVP seviyesinde. Core flow (keşfet → tur detay → favorile → harita navigasyonu) tam çalışıyor.
Supabase entegrasyonu, Auth, Redux/RTK Query, i18n (TR/EN), dark/light tema hepsi aktif.

---

## 0) Repo / Tooling

- [x] Expo proje oluştur (TS) — 2026-02-12
- [x] expo-router kurulum + entry — 2026-02-12
- [x] ESLint + Prettier — 2026-02-12
- [x] Husky + lint-staged — 2026-02-12
- [x] Typecheck script (tsc --noEmit) — 2026-02-12
- [ ] README: kurulum + komutlar + mimari

## 1) Theme Sistemi

- [x] tokens (spacing/radius/typography/colors) — 2026-02-12
- [x] theme (semantic colors) — 2026-02-12
- [x] ThemeProvider (light/dark/auto + hook) — 2026-02-12

## 2) UI Primitives

- [x] Text (variants) — 2026-02-12
- [x] Button (variants + loading) — 2026-02-12
- [x] Card, GlassCard — 2026-02-12
- [x] Input — 2026-02-12
- [x] Divider + Spacer — 2026-02-12
- [x] Skeleton (loading state) — 2026-02-12
- [x] Screen, Header — 2026-02-12
- [x] ErrorState / EmptyState / OfflineState — 2026-02-12
- [x] ImageCarousel, AvatarStack, Badge, RatingBadge, PriceTag — 2026-02-12
- [x] CategoryPill, LocationBadge, ProgressBar, Timeline — 2026-02-12
- [x] FloatingSearchBar, SearchBar — 2026-02-12
- [x] IconButton, StickyFooterButton — 2026-02-12

## 3) State / Data

- [x] Store setup (Redux Toolkit) — 2026-02-12
- [x] RTK Query base api (Supabase) — 2026-02-12
- [x] favoritesSlice (tur + durak favorileri) — 2026-02-12
- [x] activeTourSlice (aktif tur durumu) — 2026-02-12
- [x] RTK Query endpoints (11 adet) — 2026-02-12
  - getNextAdventures, getPopularRoutes, getExploreTours
  - getTourDetails, getStopDetails, getTravelerInsights
  - getRouteNavigation, getFavorites, addFavorite, removeFavorite

## 4) Routing / Screens

- [x] Tabs layout (Home/Explore/Saved/Profile/Settings) — 2026-02-12
- [x] Home ekranı (hero slider, kategoriler, öne çıkan turlar) — 2026-02-12
- [x] Explore ekranı (arama, filtre, slider, liste) — 2026-02-12
- [x] Saved ekranı (kayıtlı turlar, misafir durumu) — 2026-02-12
- [x] Profile ekranı (favori turlar, istatistikler, menü) — 2026-02-12
- [x] Settings ekranı (tema, dil, bildirimler) — 2026-02-12
- [x] Auth ekranı (giriş/kayıt, Supabase) — 2026-02-12
- [x] Tour Detail ekranı — 2026-02-12
- [x] Stop Detail ekranı — 2026-02-12
- [x] Active Route Map ekranı (GPS, harita navigasyonu) — 2026-02-12
- [x] Onboarding ekranı — 2026-02-12
- [x] Paywall ekranı (UI hazır, RevenueCat bekliyor) — 2026-02-12

## 5) Features

### Auth & Onboarding

- [x] Supabase Auth (email/password) — 2026-02-12
- [x] OnboardingContext + AsyncStorage kalıcılığı — 2026-02-12
- [x] AuthContext (user, session, signIn, signOut) — 2026-02-12
- [x] Misafir modu (Home/Explore erişilebilir) — 2026-02-12

### Navigasyon

- [x] BottomNav (floating pill, auth guard) — 2026-02-12
- [x] Expo Router file-based routing — 2026-02-12

### i18n

- [x] i18next kurulumu (TR/EN) — 2026-02-12
- [x] Dil değiştirme + AsyncStorage kalıcılığı — 2026-02-12

### Favoriler

- [x] Redux optimistik güncelleme — 2026-02-12
- [x] Supabase senkronizasyonu — 2026-02-12

### Harita & Navigasyon

- [x] react-native-maps entegrasyonu — 2026-02-12
- [x] Gerçek zamanlı GPS takibi — 2026-02-12
- [x] Durak ilerleme (SwipeableStopCards, RouteProgressBar) — 2026-02-12

---

## 6) Bekleyen / Eksik Özellikler

### Orta Öncelik

- [ ] Sesli rehber player (`expo-av` — DB'de `audio_url` zaten var)
- [ ] Check-in sistemi (durak tamamlama akışı)
- [ ] Değerlendirme yazma (review/rating form)
- [ ] Profil düzenleme ekranı (edit-profile.tsx)
- [ ] Bildirim sistemi (push notification altyapısı)

### Düşük Öncelik / İlerisi

- [ ] RevenueCat in-app purchase entegrasyonu (Paywall)
- [ ] AR View (durak detayında)
- [ ] Kamera özelliği (aktif rota haritasında)
- [ ] Offline harita indirme
- [ ] Tamamlanan tur geçmişi / gerçek istatistikler
- [ ] Harita stili seçimi

### App Store Hazırlık

- [ ] app.json bundle id (iOS/Android)
- [ ] Uygulama ikonu + splash screen (final)
- [ ] Permissions metinleri (konum, kamera vb.)
- [ ] EAS Build config
- [ ] README: kurulum + komutlar + mimari

---

## Changelog

### 2026-02-20 — Oturum 2 Güncellemeleri

**Onboarding Ekranı yeniden yazıldı** (`src/features/onboarding/screens/OnboardingScreen.tsx`)

- Video background → Unsplash fotoğrafları + ImageBackground
- Her slide'a ikon badge eklendi (compass, headset, heart)
- `StyleSheet.create` component dışına taşındı (scope bug giderildi)
- Dot indikatörler dinamik genişlik animasyonu ile iyileştirildi

**Kategori navigasyonu eklendi** (`app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`)

- Home kategorileri → Explore'a map: `brunch→food`, `sunset→nature`, `hidden→all`, `culture→culture`
- `useLocalSearchParams` ile Explore ekranı URL param'dan kategori okuyor

**Native Share API** (`app/tour-detail.tsx`, `app/stop-detail.tsx`)

- Boş handler'lar → `react-native Share` ile native share sheet

**Console.log temizliği** (`app/(tabs)/index.tsx`, `app/stop-detail.tsx`)

- 8 adet debug log kaldırıldı
- `onFilterPress` → Explore'a yönlendirme

**Profil menü handler'ları** (`app/(tabs)/profile.tsx`)

- 9 menü öğesi + "Düzenle" butonu artık çalışıyor
- Dil → Settings, Arkadaşa Öner → native Share, diğerleri → "Yakında" alert

**QuickStartCategories "See All" butonu** (`src/features/home/components/QuickStartCategories.tsx`)

- `onSeeAllPress` prop eklendi → Explore'a yönlendiriyor

---

### 2026-02-12 — Oturum 1 (Proje Temeli)

- TASKS.md oluşturuldu
- Proje temeli kuruldu (TS, expo-router, RTK, Theme, UI primitives)
- Tüm ekranlar, state yönetimi, Supabase entegrasyonu, Auth, i18n tamamlandı
