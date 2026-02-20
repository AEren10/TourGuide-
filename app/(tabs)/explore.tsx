import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { BottomNav } from '@/components/navigation/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetExploreToursQuery } from '@/services/api';

const CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: 'grid-outline' },
  { id: 'culture', label: 'Kültür', icon: 'business-outline' },
  { id: 'nature', label: 'Doğa', icon: 'leaf-outline' },
  { id: 'food', label: 'Yemek', icon: 'restaurant-outline' },
  { id: 'history', label: 'Tarih', icon: 'time-outline' },
  { id: 'night', label: 'Gece', icon: 'moon-outline' },
] as const;

export default function ExploreScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { category: initialCategory } = useLocalSearchParams<{
    category?: string;
  }>();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchAnim = useRef(new Animated.Value(0)).current;

  // Home'dan gelen kategori parametresini uygula
  useEffect(() => {
    if (initialCategory && CATEGORIES.some((c) => c.id === initialCategory)) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const {
    data: tours = [],
    isLoading,
    isError,
    refetch,
  } = useGetExploreToursQuery({});

  const filteredTours = useMemo(() => {
    const q = searchText.toLowerCase().trim();
    return tours.filter((tour) => {
      const tourCategory: string = ((tour as any).category ?? '').toLowerCase();
      const matchesCategory =
        activeCategory === 'all' ||
        (tourCategory.length > 0 && tourCategory.includes(activeCategory));
      const matchesSearch = !q || tour.title?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [tours, activeCategory, searchText]);

  // Slider sadece "tümü + arama yok" modunda ilk 3 featured turu gösterir
  // Liste her zaman TÜM filtrelenmiş turları gösterir (slider'dan bağımsız)
  const sliderTours = filteredTours.filter((t) => (t as any).badge).slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<ScrollView>(null);

  // Kategori veya search değişince slider'ı başa al
  React.useEffect(() => {
    setActiveSlide(0);
    sliderRef.current?.scrollTo({ x: 0, animated: false });
  }, [activeCategory, searchText]);

  const onSearchFocus = () => {
    setSearchFocused(true);
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onSearchBlur = () => {
    setSearchFocused(false);
    Animated.timing(searchAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  const BADGE_COLORS: Record<string, string> = {
    popular: '#EC4899',
    new: '#10B981',
    featured: '#8B5CF6',
    recommended: '#ee8c2b',
    heritage: '#F59E0B',
    nightTour: '#8B5CF6',
  };

  const getBadgeColor = (badge: string | null | undefined) =>
    badge ? (BADGE_COLORS[badge] ?? '#ee8c2b') : null;

  const getBadgeLabel = (badge: string | null | undefined) => {
    const labels: Record<string, string> = {
      popular: 'Popüler',
      new: 'Yeni',
      featured: 'Öne Çıkan',
      recommended: 'Önerilen',
      heritage: 'Tarihi',
      nightTour: 'Gece Turu',
    };
    return badge ? (labels[badge] ?? badge) : null;
  };

  const s = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      gap: theme.spacing.md,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    filterBtn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchWrapper: {
      borderRadius: 16,
      borderWidth: 1.5,
      overflow: 'hidden',
    },
    searchInner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceLight,
      paddingHorizontal: 16,
      paddingVertical: 13,
      gap: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      color: theme.colors.text,
      padding: 0,
    },
    categoriesContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
    },
    categoriesList: {
      flexDirection: 'row',
      gap: 10,
    },
    categoryPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: 999,
      borderWidth: 1.5,
    },
    categoryText: {
      fontSize: 13,
      fontWeight: '500',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 120,
    },
    sectionHeader: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.3,
    },
    seeAll: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    sectionCount: {
      fontSize: 13,
      color: theme.colors.textTertiary,
      fontWeight: '500',
    },
    // Slider
    sliderContainer: {
      position: 'relative',
    },
    sliderScroll: {
      paddingHorizontal: theme.spacing.md,
      gap: 12,
    },
    sliderDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      marginTop: 10,
    },
    dot: {
      height: 5,
      borderRadius: 3,
    },
    // Featured card
    featuredCard: {
      borderRadius: 20,
      overflow: 'hidden',
      height: 220,
      width: SCREEN_WIDTH - theme.spacing.md * 2 - 12,
      ...theme.shadows.md,
    },
    featuredImage: {
      width: '100%',
      height: '100%',
    },
    featuredGradientBg: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: 'rgba(0,0,0,0.58)',
    },
    featuredBadge: {
      position: 'absolute',
      top: 14,
      left: 14,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },
    featuredBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#fff',
    },
    featuredRating: {
      position: 'absolute',
      top: 14,
      right: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },
    featuredRatingText: {
      fontSize: 13,
      fontWeight: '700',
      color: '#fff',
    },
    featuredContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
    },
    featuredTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#fff',
      letterSpacing: -0.3,
    },
    featuredMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 6,
    },
    featuredMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    featuredMetaText: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.85)',
      fontWeight: '500',
    },
    // Tour Cards — yatay, iyileştirilmiş tasarım
    gridContainer: {
      paddingHorizontal: theme.spacing.md,
      gap: 12,
    },
    tourCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 18,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },
    tourCardImgWrap: {
      width: 100,
      height: 100,
      position: 'relative',
    },
    tourCardImg: {
      width: '100%',
      height: '100%',
    },
    tourCardImgOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.08)',
    },
    tourCardBadge: {
      position: 'absolute',
      bottom: 6,
      left: 6,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 999,
    },
    tourCardBadgeText: {
      fontSize: 9,
      fontWeight: '700',
      color: '#fff',
    },
    tourCardRatingPill: {
      position: 'absolute',
      top: 6,
      right: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      backgroundColor: 'rgba(0,0,0,0.55)',
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 999,
    },
    tourCardRatingText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#fff',
    },
    tourCardBody: {
      flex: 1,
      paddingHorizontal: 14,
      paddingVertical: 12,
      gap: 4,
    },
    tourCardTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.2,
    },
    tourCardDesc: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      lineHeight: 17,
    },
    tourCardMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 2,
    },
    tourCardMetaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    tourCardMetaText: {
      fontSize: 12,
      color: theme.colors.textTertiary,
      fontWeight: '500',
    },
    tourCardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    tourCardPrice: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    tourCardArrow: {
      width: 28,
      height: 28,
      borderRadius: 9,
      backgroundColor: theme.colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tourCardArrowText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    // States
    centerBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 80,
      gap: 12,
    },
    stateIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stateTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    stateSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 40,
    },
    retryBtn: {
      marginTop: 4,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
    },
    retryText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
    },
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={s.centerBox}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={s.stateSubtitle}>Turlar yükleniyor...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={s.centerBox}>
          <View style={s.stateIcon}>
            <Ionicons
              name="cloud-offline-outline"
              size={28}
              color={theme.colors.textTertiary}
            />
          </View>
          <Text style={s.stateTitle}>Bağlantı hatası</Text>
          <Text style={s.stateSubtitle}>Turlar yüklenemedi. Tekrar dene.</Text>
          <TouchableOpacity style={s.retryBtn} onPress={() => refetch()}>
            <Text style={s.retryText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredTours.length === 0) {
      return (
        <View style={s.centerBox}>
          <View style={s.stateIcon}>
            <Ionicons
              name="search-outline"
              size={28}
              color={theme.colors.textTertiary}
            />
          </View>
          <Text style={s.stateTitle}>Sonuç bulunamadı</Text>
          <Text style={s.stateSubtitle}>
            Farklı bir kategori veya arama terimi dene
          </Text>
        </View>
      );
    }

    const showSlider =
      activeCategory === 'all' && !searchText && sliderTours.length > 0;

    return (
      <>
        {showSlider && (
          <>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Öne Çıkan</Text>
            </View>
            <View style={s.sliderContainer}>
              <ScrollView
                ref={sliderRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.sliderScroll}
                snapToInterval={SCREEN_WIDTH - theme.spacing.md * 2 - 12 + 12}
                decelerationRate="fast"
                onScroll={(e) => {
                  const cardWidth =
                    SCREEN_WIDTH - theme.spacing.md * 2 - 12 + 12;
                  const idx = Math.round(
                    e.nativeEvent.contentOffset.x / cardWidth
                  );
                  setActiveSlide(Math.min(idx, sliderTours.length - 1));
                }}
                scrollEventThrottle={16}
              >
                {sliderTours.map((item) => {
                  const badgeLabelFt = getBadgeLabel((item as any).badge);
                  const badgeColorFt = getBadgeColor((item as any).badge);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={s.featuredCard}
                      activeOpacity={0.92}
                      onPress={() => router.push(`/tour-detail?id=${item.id}`)}
                    >
                      {item.imageUrl ? (
                        <Image
                          source={{ uri: item.imageUrl }}
                          style={s.featuredImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View
                          style={[
                            s.featuredImage,
                            { backgroundColor: theme.colors.surfaceLight },
                          ]}
                        />
                      )}
                      <View style={s.featuredGradientBg} />

                      {badgeLabelFt && (
                        <View
                          style={[
                            s.featuredBadge,
                            { backgroundColor: badgeColorFt! },
                          ]}
                        >
                          <Text style={s.featuredBadgeText}>
                            {badgeLabelFt}
                          </Text>
                        </View>
                      )}

                      <View style={s.featuredRating}>
                        <Ionicons name="star" size={12} color="#FBBF24" />
                        <Text style={s.featuredRatingText}>{item.rating}</Text>
                      </View>

                      <View style={s.featuredContent}>
                        <Text style={s.featuredTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <View style={s.featuredMeta}>
                          {(item as any).duration && (
                            <View style={s.featuredMetaItem}>
                              <Ionicons
                                name="time-outline"
                                size={12}
                                color="rgba(255,255,255,0.8)"
                              />
                              <Text style={s.featuredMetaText}>
                                {(item as any).duration}
                              </Text>
                            </View>
                          )}
                          {(item as any).distance && (
                            <View style={s.featuredMetaItem}>
                              <Ionicons
                                name="navigate-outline"
                                size={12}
                                color="rgba(255,255,255,0.8)"
                              />
                              <Text style={s.featuredMetaText}>
                                {(item as any).distance}
                              </Text>
                            </View>
                          )}
                          <View style={s.featuredMetaItem}>
                            <Ionicons
                              name="pricetag-outline"
                              size={12}
                              color="rgba(255,255,255,0.8)"
                            />
                            <Text style={s.featuredMetaText}>
                              {(item as any).price}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Dot indicators */}
              {sliderTours.length > 1 && (
                <View style={s.sliderDots}>
                  {sliderTours.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        s.dot,
                        {
                          width: i === activeSlide ? 20 : 6,
                          backgroundColor:
                            i === activeSlide
                              ? theme.colors.primary
                              : theme.colors.border,
                        },
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
          </>
        )}

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>
            {activeCategory === 'all' && !searchText
              ? 'Tüm Turlar'
              : `${filteredTours.length} tur bulundu`}
          </Text>
          <Text style={s.sectionCount}>{filteredTours.length} tur</Text>
        </View>

        <View style={s.gridContainer}>
          {filteredTours.map((tour) => {
            const badgeLabel = getBadgeLabel((tour as any).badge);
            const badgeColor = getBadgeColor((tour as any).badge);
            return (
              <TouchableOpacity
                key={tour.id}
                style={s.tourCard}
                activeOpacity={0.88}
                onPress={() => router.push(`/tour-detail?id=${tour.id}`)}
              >
                {/* Görsel */}
                <View style={s.tourCardImgWrap}>
                  {tour.imageUrl ? (
                    <Image
                      source={{ uri: tour.imageUrl }}
                      style={s.tourCardImg}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[
                        s.tourCardImg,
                        { backgroundColor: theme.colors.surfaceLight },
                      ]}
                    />
                  )}
                  <View style={s.tourCardImgOverlay} />
                  {badgeLabel && (
                    <View
                      style={[
                        s.tourCardBadge,
                        { backgroundColor: badgeColor! },
                      ]}
                    >
                      <Text style={s.tourCardBadgeText}>{badgeLabel}</Text>
                    </View>
                  )}
                  <View style={s.tourCardRatingPill}>
                    <Ionicons name="star" size={9} color="#FBBF24" />
                    <Text style={s.tourCardRatingText}>{tour.rating}</Text>
                  </View>
                </View>

                {/* İçerik */}
                <View style={s.tourCardBody}>
                  <Text style={s.tourCardTitle} numberOfLines={1}>
                    {tour.title}
                  </Text>

                  <View style={s.tourCardMeta}>
                    {(tour as any).duration && (
                      <View style={s.tourCardMetaItem}>
                        <Ionicons
                          name="time-outline"
                          size={12}
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
                          size={12}
                          color={theme.colors.textTertiary}
                        />
                        <Text style={s.tourCardMetaText}>
                          {(tour as any).distance}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={s.tourCardFooter}>
                    <Text style={s.tourCardPrice}>{(tour as any).price}</Text>
                    <View style={s.tourCardArrow}>
                      <Ionicons
                        name="chevron-forward"
                        size={15}
                        color={theme.colors.primary}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safeArea} edges={['top']}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <View>
              <Text style={s.headerTitle}>Keşfet</Text>
              <Text style={s.headerSubtitle}>Yeni rotalar bul</Text>
            </View>
            <View style={s.filterBtn}>
              <Ionicons
                name="options-outline"
                size={20}
                color={theme.colors.textTertiary}
              />
            </View>
          </View>

          {/* Search */}
          <Animated.View style={[s.searchWrapper, { borderColor }]}>
            <View style={s.searchInner}>
              <Ionicons
                name="search"
                size={18}
                color={
                  searchFocused
                    ? theme.colors.primary
                    : theme.colors.textPlaceholder
                }
              />
              <TextInput
                style={s.searchInput}
                placeholder="Tur ara..."
                placeholderTextColor={theme.colors.textPlaceholder}
                value={searchText}
                onChangeText={setSearchText}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={theme.colors.textTertiary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </View>

        {/* Categories */}
        <View style={s.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.categoriesList}
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    s.categoryPill,
                    {
                      backgroundColor: active
                        ? theme.colors.primary
                        : theme.colors.surfaceLight,
                      borderColor: active ? 'transparent' : theme.colors.border,
                    },
                  ]}
                  onPress={() => setActiveCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={14}
                    color={active ? '#fff' : theme.colors.textSecondary}
                  />
                  <Text
                    style={[
                      s.categoryText,
                      { color: active ? '#fff' : theme.colors.textSecondary },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Content */}
        <ScrollView
          style={s.content}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </SafeAreaView>

      <BottomNav />
    </View>
  );
}
