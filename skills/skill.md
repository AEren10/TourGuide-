# TOUR APP — SKILLS (Expo + expo-router + RTK + RTK Query)

Amaç: App Store’a çıkacak tur/gezinti uygulaması için **temiz**, **ölçeklenebilir**, **tek tip UI** ve **kontrollü mimari**.

Bu dosya, AI agent’ın (Claude/Cursor/Antigravity) projede nasıl çalışacağını belirler.
**Kurallar ihlal edilirse değişiklik kabul edilmez.**

---

## 0) En Büyük Kural

Bu repo’da “hızlı hack” yok.
Bugün hızlı görünen şey, yarın 10 kat süre kaybettirir.

---

## 1) Mimari Kuzey Yıldızı (North Star)

Öncelikler:

1. UI her yerde aynı dilde (theme + primitive’ler)
2. Data akışı tek yerden (RTK Query)
3. Ekranlar ince, mantık feature içinde
4. Lint/typecheck kırılmadan ilerleme
5. TASKS.md güncel: ne yaptık, ne kaldı

---

## 2) Zorunlu Dosyalar

- `skills.md` (bu dosya)
- `TASKS.md` (ortak görev takibi — AI her değişiklikte güncelleyecek)
- `README.md` (kurulum + komutlar + mimari)

---

## 3) Klasör Sahipliği (Nereye ne konur?)

- `app/` : sadece routing (expo-router) ve en minimal wiring
- `src/theme/` : token’lar + ThemeProvider + useTheme
- `src/components/ui/` : UI primitive’ler (Text, Button, Card…)
- `src/components/layout/` : layout parçaları (Screen, Header, Empty/Error…)
- `src/features/*` : feature’a özel component/hook/type/mock
- `src/services/` : RTK Query base api + storage + entegrasyonlar
- `src/store/` : store config + typed hooks
- `src/utils/` : saf helper fonksiyonlar

**Ekran dosyalarında (app/**) iş mantığı yazmak YASAK.\*\*

---

## 4) UI Sistemi (Dağılmayı önleyen kısım)

### 4.1 Theme-Only Style Kuralı

- Rastgele hex renk YOK
- “magic number” spacing YOK (4, 7, 13 gibi)
- Radius/typography rastgele YOK

Her şey:

- `tokens.spacing.*`
- `tokens.radius.*`
- `Text` variant’ları
- `theme.colors.*` (semantic)

### 4.2 UI Primitive Listesi (Minimum)

`src/components/ui/` içinde:

- Text (variants: title, h1, h2, body, caption)
- Button (primary/secondary/ghost + loading/disabled)
- Card
- Input
- Divider
- Spacer
- Skeleton

`src/components/layout/` içinde:

- Screen (SafeArea + padding + background)
- Header
- EmptyState
- ErrorState

**Yeni UI ihtiyacı çıkarsa önce primitive ile çöz.**
2+ yerde kullanılacaksa primitive yap, tek yerde ise feature içinde bırak.

---

## 5) Data & State (RTK + RTK Query)

- Server state: RTK Query
- Local/UI state: RTK slice (Saved, Session vb.)

Kurallar:

- API çağrısı component içinde yapılmaz.
- Endpoint’ler `src/services/api.ts` içinde tanımlanır.
- Feature tipleri `features/*/types.ts` içinde tutulur.
- “Saved” gibi şeylerde tüm objeyi taşımak yerine **ID listesi** tut (mümkünse).

---

## 6) Ekran Standardı: Loading / Error / Empty

Her ekran için zorunlu:

- Loading → Skeleton
- Error → ErrorState + retry
- Empty → EmptyState

“Bu ekranda gerek yok” diye bir şey yok.

---

## 7) İsimlendirme & Kod Stili

- Component dosyaları: `PascalCase.tsx`
- Utility dosyaları: `camelCase.ts`
- `any` YASAK
- Export tercihi: named export (mümkün olduğunca)
- Büyük callback/logic render içinde yazma, fonksiyon çıkar
- Style: `StyleSheet.create` kullan, theme değerlerini oradan besle

---

## 8) Lint / Format / Typecheck Disiplini

Her değişiklik sonunda:

- `npm run lint`
- `npm run typecheck`
- (varsa) `npm test`

Eğer kırılıyorsa “kırık şekilde bırakma”, düzelt.

---

## 9) TASKS.md Sistemi (ÇOK ÖNEMLİ)

Bu projede tek gerçek ilerleme göstergesi `TASKS.md`.

### 9.1 Zorunlu Davranış

AI agent şunları HER işte yapacak:

1. Değişiklikten önce TASKS.md’de ilgili başlığı bulacak
2. Yapılan işi işaretleyecek / yeni alt task ekleyecek
3. Tarih atacak (YYYY-MM-DD)
4. Eğer yeni feature başladıysa yeni başlık açacak
5. Eğer scope değiştiyse “Notlar” kısmına yazacak

### 9.2 Format (Başlık başlık, düzenli)

- Başlıklar sabit kalmalı
- Her başlık altında checkbox listeleri olmalı
- Her tamamlanan işte kısa not düşülmeli

---

## 10) Token Tasarrufu Kuralları (Sen söylemeden yapma)

AI agent şu kurallara uyar:

### 10.1 Asla Yapma (sen istemeden)

- Gereksiz açıklama/uzun roman yazma
- Sayfa sayfa dosya okuma / “şimdi projeyi tarıyorum” tripleri
- Kod içine gereksiz yorum satırı ekleme
- 20 alternatif öneri sıralama
- “Refactor festival” (çalışanı bozup estetik düzeltme)

### 10.2 Yapılması Gereken Minimum İletişim

Yanıt formatı:

1. **Plan (max 5 madde)**
2. **Değiştirilen dosyalar listesi**
3. **Kod**
4. **TASKS.md güncellemesi (diff veya tam bölüm)**

### 10.3 Yorum Satırı Politikası

- Sadece kritik yerlerde (neden var?) 1 satır yorum
- “Bu bir button component” gibi salak yorum YOK

### 10.4 Okuma Politikası

- Projeyi baştan sona tarama YOK
- Sadece ihtiyaç olan dosyaları aç
- Bir hata log’u gelirse sadece o alanı incele

---

## 11) Definition of Done (Bitmiş Sayılması İçin)

Bir feature/screen “bitti” sayılmaz, ta ki:

- [ ] Theme-only style
- [ ] Loading/Error/Empty tamam
- [ ] Tipler eksiksiz (no any)
- [ ] Screen ince, mantık feature içinde
- [ ] Lint geçiyor
- [ ] Typecheck geçiyor
- [ ] TASKS.md güncellendi

---

## 12) Bu Repo İçin Default Akış

- Expo Router ile routing
- RTK Query ile data
- Theme + primitive ile UI
- TASKS.md ile ilerleme takibi

DOSYA YAPISINI BOZMA VE ONA UYGUN İLERLE
OLABİLDİĞİNDE MODÜLER VE KÜÇÜK PARÇALAR İLE İLERLE
RESPONSİVE TASARIMA UY
