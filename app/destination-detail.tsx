import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { LocationBadge } from '@/components/ui/LocationBadge';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { AvatarStack } from '@/components/ui/AvatarStack';

const { width } = Dimensions.get('window');

const thumbnails = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
  'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
];

export default function DestinationDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'description' | 'review'>(
    'description'
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    heroImage: {
      width,
      height: 383,
      backgroundColor: theme.colors.surface,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: theme.spacing.md,
      width: 44,
      height: 44,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    favoriteButton: {
      position: 'absolute',
      top: 314,
      right: theme.spacing.md,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      marginTop: -30,
      paddingBottom: 100,
    },
    thumbnailGallery: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.xl,
      alignSelf: 'center',
      marginTop: -33,
      ...theme.shadows.lg,
    },
    thumbnail: {
      width: 68,
      height: 50,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
    },
    infoSection: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    infoLeft: {
      gap: 4,
    },
    infoRight: {
      alignItems: 'flex-end',
      gap: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    tabsSection: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      gap: 7,
    },
    tabs: {
      flexDirection: 'row',
      gap: 34,
    },
    descriptionText: {
      color: theme.colors.textPlaceholder,
      width: 342,
    },
    readMore: {
      color: theme.colors.primary,
    },
    bookButton: {
      position: 'absolute',
      bottom: 30,
      left: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: 100,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
            }}
            style={styles.heroImage}
          />
          <View style={styles.gradient} />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF6B6B' : theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Thumbnail Gallery */}
          <View style={styles.thumbnailGallery}>
            {thumbnails.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={[styles.thumbnail, index === 1 && { opacity: 0.5 }]}
              />
            ))}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text variant="h4Medium" style={{ color: theme.colors.text }}>
                  Bali
                </Text>
                <LocationBadge location="Indonesia" />
              </View>
              <View style={styles.infoRight}>
                <View style={styles.priceContainer}>
                  <Text
                    variant="bodyXlMid"
                    style={{ color: theme.colors.primary }}
                  >
                    $120.50
                  </Text>
                  <Text
                    variant="bodyXsMid"
                    style={{ color: theme.colors.primary }}
                  >
                    /person
                  </Text>
                </View>
                <RatingBadge rating={4.7} />
              </View>
            </View>

            <AvatarStack
              avatars={[
                'https://i.pravatar.cc/150?img=1',
                'https://i.pravatar.cc/150?img=2',
                'https://i.pravatar.cc/150?img=3',
              ]}
              totalCount={12000}
              size="medium"
            />
          </View>

          {/* Tabs & Description */}
          <View style={styles.tabsSection}>
            <View style={styles.tabs}>
              <TouchableOpacity onPress={() => setSelectedTab('description')}>
                <Text
                  variant="bodyMMid"
                  style={{
                    color:
                      selectedTab === 'description'
                        ? theme.colors.text
                        : theme.colors.textSecondary,
                  }}
                >
                  Description
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('review')}>
                <Text
                  variant="bodyMMid"
                  style={{
                    color:
                      selectedTab === 'review'
                        ? theme.colors.text
                        : theme.colors.textSecondary,
                  }}
                >
                  Review
                </Text>
              </TouchableOpacity>
            </View>

            {selectedTab === 'description' ? (
              <Text variant="bodySRegular" style={styles.descriptionText}>
                Bali is a province of Indonesia and the westernmost of the
                Lesser Sunda Islands. East of Java and west of Lombok, the
                province includes the island....{' '}
                <Text variant="bodySRegular" style={styles.readMore}>
                  Read more
                </Text>
              </Text>
            ) : (
              <Text variant="bodySRegular" style={styles.descriptionText}>
                Reviews coming soon...
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text variant="bodyLMid" style={{ color: '#FFFFFF' }}>
          Book Now!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
