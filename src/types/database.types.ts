export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string | null;
          created_at?: string;
        };
      };
      tours: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          duration: number | null;
          distance: number | null;
          difficulty: 'easy' | 'moderate' | 'hard' | null;
          price: number | null;
          rating: number | null;
          category_id: string | null;
          badge: string | null;
          audio_url: string | null;
          is_active: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          duration?: number | null;
          distance?: number | null;
          difficulty?: 'easy' | 'moderate' | 'hard' | null;
          price?: number | null;
          rating?: number | null;
          category_id?: string | null;
          badge?: string | null;
          audio_url?: string | null;
          is_active?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          duration?: number | null;
          distance?: number | null;
          difficulty?: 'easy' | 'moderate' | 'hard' | null;
          price?: number | null;
          rating?: number | null;
          category_id?: string | null;
          badge?: string | null;
          audio_url?: string | null;
          is_active?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stops: {
        Row: {
          id: string;
          tour_id: string | null;
          name: string;
          description: string | null;
          latitude: number;
          longitude: number;
          audio_url: string | null;
          image_urls: string[] | null;
          order_index: number;
          duration: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tour_id?: string | null;
          name: string;
          description?: string | null;
          latitude: number;
          longitude: number;
          audio_url?: string | null;
          image_urls?: string[] | null;
          order_index: number;
          duration?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tour_id?: string | null;
          name?: string;
          description?: string | null;
          latitude?: number;
          longitude?: number;
          audio_url?: string | null;
          image_urls?: string[] | null;
          order_index?: number;
          duration?: number | null;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          is_premium: boolean | null;
          premium_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean | null;
          premium_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean | null;
          premium_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string | null;
          tour_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          tour_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          tour_id?: string | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string | null;
          tour_id: string | null;
          rating: number | null;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          tour_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          tour_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
