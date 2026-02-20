import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { BottomNav } from '@/components/navigation/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/hooks/redux';
import { selectFavoriteTours } from '@/store/slices/favoritesSlice';
import { useGetExploreToursQuery } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

const MENU_ITEMS = [
  {
    section: 'Hesabım',
    items: [
      { icon: 'person-outline', label: 'Profili Düzenle', arrow: true },
      { icon: 'notifications-outline', label: 'Bildirimler', arrow: true },
      {
        icon: 'shield-checkmark-outline',
        label: 'Gizlilik & Güvenlik',
        arrow: true,
      },
    ],
  },
  {
    section: 'Uygulama',
    items: [
      { icon: 'language-outline', label: 'Dil', value: 'Türkçe', arrow: true },
      {
        icon: 'map-outline',
        label: 'Harita Stili',
        value: 'Varsayılan',
        arrow: true,
      },
      { icon: 'download-outline', label: 'Offline Haritalar', arrow: true },
    ],
  },
  {
    section: 'Destek',
    items: [
      { icon: 'help-circle-outline', label: 'Yardım & SSS', arrow: true },
      { icon: 'star-outline', label: 'Uygulamayı Oyla', arrow: true },
      { icon: 'share-outline', label: 'Arkadaşa Öner', arrow: true },
    ],
  },
];

export default function ProfileScreen() {
  const { theme, isDark, setMode } = useTheme();
  const toggleTheme = () => setMode(isDark ? 'light' : 'dark');
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'tours' | 'stats'>('tours');
  const [loggingOut, setLoggingOut] = useState(false);

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gezgin';
  const username = '@' + (user?.email?.split('@')[0] || 'kullanici');
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=ee8c2b&color=fff&size=200`;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
    } catch {
      // AuthContext'ten çıkış yapar, router _layout tarafından auth'a yönlendirir
    } finally {
      setLoggingOut(false);
    }
  };

  const handleMenuPress = async (label: string) => {
    switch (label) {
      case 'Profili Düzenle':
        Alert.alert(
          'Yakında',
          'Profil düzenleme özelliği çok yakında geliyor!'
        );
        break;
      case 'Bildirimler':
        Alert.alert('Yakında', 'Bildirim ayarları çok yakında geliyor!');
        break;
      case 'Gizlilik & Güvenlik':
        Alert.alert('Yakında', 'Gizlilik ayarları çok yakında geliyor!');
        break;
      case 'Dil':
        router.push('/(tabs)/settings');
        break;
      case 'Harita Stili':
        Alert.alert('Yakında', 'Harita stili seçimi çok yakında geliyor!');
        break;
      case 'Offline Haritalar':
        Alert.alert('Yakında', 'Offline harita indirme çok yakında geliyor!');
        break;
      case 'Yardım & SSS':
        Alert.alert('Yakında', 'Yardım merkezi çok yakında geliyor!');
        break;
      case 'Uygulamayı Oyla':
        Alert.alert(
          'Teşekkürler! ⭐',
          'Değerlendirmen bizim için çok önemli. Yakında mağaza sayfamız aktif olacak!'
        );
        break;
      case 'Arkadaşa Öner':
        await Share.share({
          title: 'TourGuide',
          message:
            'TourGuide ile şehrindeki gizli hazineleri keşfet! 🗺️ Sesli rehberli turlar, kültür rotaları ve çok daha fazlası.',
        });
        break;
      default:
        break;
    }
  };

  const favoriteIds = useAppSelector(selectFavoriteTours);
  const { data: allTours = [], isLoading: toursLoading } =
    useGetExploreToursQuery({});
  const favoriteTours = allTours.filter((t) => favoriteIds.includes(t.id));

  // Stats hesabı: favori tur sayısı gerçek, diğerleri ilerisi için 0
  const stats = {
    tours: favoriteTours.length,
    km: 0,
    hours: 0,
  };

  const s = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 120,
    },
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.4,
    },
    settingsBtn: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    profileCard: {
      marginHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 24,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },
    profileTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    avatarWrapper: {
      position: 'relative',
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    onlineDot: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#10B981',
      borderWidth: 2,
      borderColor: theme.colors.surfaceElevated,
    },
    profileInfo: {
      flex: 1,
      gap: 3,
    },
    profileName: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.3,
    },
    profileUsername: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    profileBio: {
      fontSize: 12,
      color: theme.colors.textTertiary,
      marginTop: 2,
    },
    editBtn: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      alignSelf: 'flex-start',
    },
    editBtnText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.md,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
      gap: 4,
    },
    statValue: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: 11,
      color: theme.colors.textTertiary,
      fontWeight: '500',
    },
    statDivider: {
      width: 1,
      height: 32,
      backgroundColor: theme.colors.border,
      alignSelf: 'center',
    },
    tabsContainer: {
      flexDirection: 'row',
      marginHorizontal: theme.spacing.md,
      marginTop: theme.spacing.md,
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: 14,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 11,
    },
    tabActive: {
      backgroundColor: theme.colors.surfaceElevated,
      ...theme.shadows.sm,
    },
    tabText: {
      fontSize: 13,
      fontWeight: '600',
    },
    tabTextActive: {
      color: theme.colors.text,
    },
    tabTextInactive: {
      color: theme.colors.textSecondary,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.2,
    },
    sectionCount: {
      fontSize: 13,
      color: theme.colors.textTertiary,
      fontWeight: '500',
    },
    toursContainer: {
      paddingHorizontal: theme.spacing.md,
      gap: 14,
    },
    // Tour card — yeni tasarım
    tourCard: {
      borderRadius: 18,
      overflow: 'hidden',
      backgroundColor: theme.colors.surfaceElevated,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },
    tourCardImageWrap: {
      height: 130,
      position: 'relative',
    },
    tourCardImage: {
      width: '100%',
      height: '100%',
    },
    tourCardOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%',
      backgroundColor: 'rgba(0,0,0,0.45)',
    },
    tourCardRatingPill: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },
    tourCardRatingText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#fff',
    },
    completedPill: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: '#10B98122',
      borderWidth: 1,
      borderColor: '#10B98155',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },
    completedPillText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#10B981',
    },
    tourCardBody: {
      padding: 14,
      gap: 8,
    },
    tourCardTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.2,
    },
    tourCardMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    tourCardMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    tourCardMetaText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    tourCardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 10,
      marginTop: 2,
    },
    tourCardPrice: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    tourCardBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    tourCardBtnText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    // Empty state
    emptyState: {
      alignItems: 'center',
      paddingVertical: 48,
      gap: 12,
    },
    emptyIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
    },
    emptySubtitle: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 32,
      lineHeight: 19,
    },
    emptyBtn: {
      marginTop: 4,
      paddingHorizontal: 22,
      paddingVertical: 11,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
    },
    emptyBtnText: {
      fontSize: 13,
      fontWeight: '700',
      color: '#fff',
    },
    // Stats tab
    statsGrid: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      gap: 12,
    },
    statsGridRow: {
      flexDirection: 'row',
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 18,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: 8,
    },
    statCardIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statCardValue: {
      fontSize: 26,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    statCardLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    // Dark mode
    darkModeSection: {
      marginHorizontal: theme.spacing.md,
      marginTop: theme.spacing.md,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    darkModeIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: isDark
        ? theme.colors.primaryLight
        : theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    darkModeLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
    },
    logoutBtn: {
      marginHorizontal: theme.spacing.md,
      marginTop: theme.spacing.md,
      paddingVertical: 14,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.colors.error + '40',
      backgroundColor: theme.colors.error + '08',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    logoutText: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.error,
    },
    // Menu sections
    menuSection: {
      marginHorizontal: theme.spacing.md,
      marginTop: theme.spacing.md,
    },
    menuSectionTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textTertiary,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      marginBottom: 6,
      paddingHorizontal: 4,
    },
    menuCard: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 14,
      gap: 12,
    },
    menuItemBorder: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    menuItemIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItemLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
    },
    menuItemValue: {
      fontSize: 13,
      color: theme.colors.textTertiary,
      fontWeight: '500',
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.colors.textTertiary,
      marginTop: theme.spacing.md,
    },
  });

  const renderToursTab = () => {
    if (toursLoading) {
      return (
        <View style={s.emptyState}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      );
    }

    if (favoriteTours.length === 0) {
      return (
        <View style={s.emptyState}>
          <View style={s.emptyIcon}>
            <Ionicons
              name="map-outline"
              size={28}
              color={theme.colors.textTertiary}
            />
          </View>
          <Text style={s.emptyTitle}>Henüz favori tur yok</Text>
          <Text style={s.emptySubtitle}>
            Keşfet sayfasından turları favorilere ekleyerek burada görebilirsin.
          </Text>
          <TouchableOpacity
            style={s.emptyBtn}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <Text style={s.emptyBtnText}>Tur Keşfet</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={s.toursContainer}>
        {favoriteTours.map((tour) => (
          <TouchableOpacity
            key={tour.id}
            style={s.tourCard}
            activeOpacity={0.88}
            onPress={() => router.push(`/tour-detail?id=${tour.id}`)}
          >
            {/* Image section */}
            <View style={s.tourCardImageWrap}>
              {(tour as any).imageUrl ? (
                <Image
                  source={{ uri: (tour as any).imageUrl }}
                  style={s.tourCardImage}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    s.tourCardImage,
                    { backgroundColor: theme.colors.surfaceLight },
                  ]}
                />
              )}
              <View style={s.tourCardOverlay} />

              {/* Rating pill */}
              {(tour as any).rating > 0 && (
                <View style={s.tourCardRatingPill}>
                  <Ionicons name="star" size={11} color="#FBBF24" />
                  <Text style={s.tourCardRatingText}>
                    {(tour as any).rating}
                  </Text>
                </View>
              )}

              {/* Completed pill */}
              <View style={s.completedPill}>
                <Ionicons name="checkmark-circle" size={11} color="#10B981" />
                <Text style={s.completedPillText}>Favorilendi</Text>
              </View>
            </View>

            {/* Body */}
            <View style={s.tourCardBody}>
              <Text style={s.tourCardTitle} numberOfLines={1}>
                {(tour as any).title ?? (tour as any).name}
              </Text>

              <View style={s.tourCardMeta}>
                {(tour as any).duration && (
                  <View style={s.tourCardMetaItem}>
                    <Ionicons
                      name="time-outline"
                      size={13}
                      color={theme.colors.textTertiary}
                    />
                    <Text style={s.tourCardMetaText}>
                      {(tour as any).duration}
                    </Text>
                  </View>
                )}
                {(tour as any).distance && (
                  <View style={s.tourCardMetaItem}>
                    <Ionicons
                      name="navigate-outline"
                      size={13}
                      color={theme.colors.textTertiary}
                    />
                    <Text style={s.tourCardMetaText}>
                      {(tour as any).distance}
                    </Text>
                  </View>
                )}
                {(tour as any).difficulty && (
                  <View style={s.tourCardMetaItem}>
                    <Ionicons
                      name="trending-up-outline"
                      size={13}
                      color={theme.colors.textTertiary}
                    />
                    <Text style={s.tourCardMetaText}>
                      {(tour as any).difficulty}
                    </Text>
                  </View>
                )}
              </View>

              <View style={s.tourCardFooter}>
                <Text style={s.tourCardPrice}>
                  {(tour as any).price === 0 || (tour as any).price === null
                    ? 'Ücretsiz'
                    : typeof (tour as any).price === 'number'
                      ? `₺${(tour as any).price}`
                      : (tour as any).price}
                </Text>
                <View style={s.tourCardBtn}>
                  <Text style={s.tourCardBtnText}>Detaylar</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={theme.colors.textSecondary}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safeArea} edges={['top']}>
        {/* Header */}
        <View style={s.headerBar}>
          <Text style={s.headerTitle}>Profil</Text>
          <TouchableOpacity
            style={s.settingsBtn}
            onPress={() => router.push('/(tabs)/settings')}
          >
            <Ionicons
              name="settings-outline"
              size={18}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Card */}
          <View style={s.profileCard}>
            <View style={s.profileTop}>
              <View style={s.avatarWrapper}>
                <Image source={{ uri: avatarUrl }} style={s.avatar} />
                <View style={s.onlineDot} />
              </View>
              <View style={s.profileInfo}>
                <Text style={s.profileName}>{displayName}</Text>
                <Text style={s.profileUsername}>{username}</Text>
                <Text style={s.profileBio}>{user?.email || ''}</Text>
              </View>
              <TouchableOpacity
                style={s.editBtn}
                onPress={() => handleMenuPress('Profili Düzenle')}
              >
                <Text style={s.editBtnText}>Düzenle</Text>
              </TouchableOpacity>
            </View>

            <View style={s.divider} />

            <View style={s.statsRow}>
              <View style={s.statItem}>
                <Text style={s.statValue}>{stats.tours}</Text>
                <Text style={s.statLabel}>Favori</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <Text style={s.statValue}>{stats.km}</Text>
                <Text style={s.statLabel}>Kilometre</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statItem}>
                <Text style={s.statValue}>{stats.hours}</Text>
                <Text style={s.statLabel}>Saat</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={s.tabsContainer}>
            <TouchableOpacity
              style={[s.tab, activeTab === 'tours' && s.tabActive]}
              onPress={() => setActiveTab('tours')}
            >
              <Text
                style={[
                  s.tabText,
                  activeTab === 'tours' ? s.tabTextActive : s.tabTextInactive,
                ]}
              >
                Favorilerim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.tab, activeTab === 'stats' && s.tabActive]}
              onPress={() => setActiveTab('stats')}
            >
              <Text
                style={[
                  s.tabText,
                  activeTab === 'stats' ? s.tabTextActive : s.tabTextInactive,
                ]}
              >
                İstatistikler
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'tours' ? (
            <>
              <View style={s.sectionHeader}>
                <Text style={s.sectionTitle}>Favori Turlarım</Text>
                {favoriteTours.length > 0 && (
                  <Text style={s.sectionCount}>{favoriteTours.length} tur</Text>
                )}
              </View>
              {renderToursTab()}
            </>
          ) : (
            <View style={s.statsGrid}>
              <View style={s.statsGridRow}>
                <View style={s.statCard}>
                  <View
                    style={[
                      s.statCardIcon,
                      { backgroundColor: theme.colors.primary + '20' },
                    ]}
                  >
                    <Ionicons
                      name="heart"
                      size={18}
                      color={theme.colors.primary}
                    />
                  </View>
                  <Text style={s.statCardValue}>{stats.tours}</Text>
                  <Text style={s.statCardLabel}>Favori Tur</Text>
                </View>
                <View style={s.statCard}>
                  <View
                    style={[s.statCardIcon, { backgroundColor: '#10B98120' }]}
                  >
                    <Ionicons name="navigate" size={18} color="#10B981" />
                  </View>
                  <Text style={s.statCardValue}>{stats.km} km</Text>
                  <Text style={s.statCardLabel}>Toplam Mesafe</Text>
                </View>
              </View>
              <View style={s.statsGridRow}>
                <View style={s.statCard}>
                  <View
                    style={[s.statCardIcon, { backgroundColor: '#8B5CF620' }]}
                  >
                    <Ionicons name="time" size={18} color="#8B5CF6" />
                  </View>
                  <Text style={s.statCardValue}>{stats.hours}s</Text>
                  <Text style={s.statCardLabel}>Keşif Süresi</Text>
                </View>
                <View style={s.statCard}>
                  <View
                    style={[s.statCardIcon, { backgroundColor: '#F59E0B20' }]}
                  >
                    <Ionicons name="trophy" size={18} color="#F59E0B" />
                  </View>
                  <Text style={s.statCardValue}>—</Text>
                  <Text style={s.statCardLabel}>Tamamlanan Tur</Text>
                </View>
              </View>
            </View>
          )}

          {/* Menu Sections */}
          {MENU_ITEMS.map((group) => (
            <View key={group.section} style={s.menuSection}>
              <Text style={s.menuSectionTitle}>{group.section}</Text>
              <View style={s.menuCard}>
                {group.items.map((item, idx) => (
                  <TouchableOpacity
                    key={item.label}
                    style={[s.menuItem, idx > 0 && s.menuItemBorder]}
                    activeOpacity={0.7}
                    onPress={() => handleMenuPress(item.label)}
                  >
                    <View style={s.menuItemIcon}>
                      <Ionicons
                        name={item.icon as any}
                        size={18}
                        color={theme.colors.primary}
                      />
                    </View>
                    <Text style={s.menuItemLabel}>{item.label}</Text>
                    {item.value && (
                      <Text style={s.menuItemValue}>{item.value}</Text>
                    )}
                    {item.arrow && (
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={theme.colors.textTertiary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Dark mode toggle */}
          <View style={s.darkModeSection}>
            <View style={s.darkModeIcon}>
              <Ionicons
                name={isDark ? 'moon' : 'sunny-outline'}
                size={18}
                color={theme.colors.primary}
              />
            </View>
            <Text style={s.darkModeLabel}>
              {isDark ? 'Karanlık Mod' : 'Aydınlık Mod'}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[s.logoutBtn, loggingOut && { opacity: 0.6 }]}
            activeOpacity={0.8}
            onPress={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <ActivityIndicator size="small" color={theme.colors.error} />
            ) : (
              <>
                <Ionicons
                  name="log-out-outline"
                  size={18}
                  color={theme.colors.error}
                />
                <Text style={s.logoutText}>Çıkış Yap</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={s.versionText}>TourGuide v1.0.0</Text>
        </ScrollView>
      </SafeAreaView>

      <BottomNav />
    </View>
  );
}
