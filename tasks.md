# TASKS — Tour App

> Son güncelleme: 2026-02-12

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
- [x] ThemeProvider (light/dark + hook) — 2026-02-12

## 2) UI Primitives

- [x] Text (variants) — 2026-02-12
- [x] Button (variants + loading) — 2026-02-12
- [x] Card — 2026-02-12
- [ ] Input
- [ ] Divider + Spacer
- [x] Spacer — 2026-02-12
- [ ] Skeleton
- [x] Screen — 2026-02-12
- [ ] Header
- [ ] ErrorState / EmptyState

## 3) State / Data

- [x] Store setup (RTK) — 2026-02-12
- [x] RTK Query base api — 2026-02-12
- [x] Mock baseQuery — 2026-02-12
- [ ] Places endpoints (list/detail)

## 4) Routing / Screens

- [x] Tabs layout (Home/Explore/Saved/Profile) — 2026-02-12
- [x] Home: placeholder screen — 2026-02-12
- [x] Explore: placeholder screen — 2026-02-12
- [x] Saved: placeholder screen — 2026-02-12
- [x] Profile: placeholder screen — 2026-02-12
- [ ] Home: featured list
- [ ] Explore: search + filter
- [ ] Place detail: [id]
- [ ] Saved: saved list

## 5) Features

### Places

- [ ] types
- [ ] mock data
- [ ] PlaceCard
- [ ] PlacesList

### Saved

- [ ] savedSlice (toggle/remove)
- [ ] UI entegrasyonu (card + detail)

## 6) App Store Hazırlık

- [ ] app.json/app.config.ts bundle id
- [ ] icons/splash
- [ ] permissions metinleri (location vs)
- [ ] eas build config

## Notlar / Kararlar

- TypeScript + expo-router + RTK yapısı kuruldu
- Theme sistemi oluşturuldu (light/dark mode hazır)
- Temel UI primitive'ler hazır (Text, Button, Card, Spacer, Screen)
- Tabs navigation yapısı kuruldu (4 tab: Home/Explore/Saved/Profile)
- Lint ve typecheck çalışıyor

## Changelog

- 2026-02-12: TASKS.md oluşturuldu
- 2026-02-12: Proje temeli kuruldu (TS, expo-router, RTK, Theme, UI primitives)
