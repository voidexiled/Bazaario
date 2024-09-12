export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean
          message: string
          user_uuid: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          is_read?: boolean
          message: string
          user_uuid: string
        }
        Update: {
          created_at?: string | null
          id?: never
          is_read?: boolean
          message?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_uuid: string
          user_uuid: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_uuid: string
          user_uuid?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_uuid?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_uuid_fkey"
            columns: ["post_uuid"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          id: string
          post_uuid: string
          user_uuid: string
        }
        Insert: {
          id?: string
          post_uuid: string
          user_uuid?: string
        }
        Update: {
          id?: string
          post_uuid?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_uuid_fkey"
            columns: ["post_uuid"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reviews: {
        Row: {
          created_at: string | null
          id: string
          post_uuid: string
          rating: number
          review: string | null
          user_uuid: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_uuid: string
          rating: number
          review?: string | null
          user_uuid?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_uuid?: string
          rating?: number
          review?: string | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reviews_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postreviews_post_uuid_fkey"
            columns: ["post_uuid"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          sale_type: string
          user_uuid: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          sale_type: string
          user_uuid?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          sale_type?: string
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          id: string
          image_url: string
          product_uuid: string
        }
        Insert: {
          id?: string
          image_url: string
          product_uuid: string
        }
        Update: {
          id?: string
          image_url?: string
          product_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_uuid_fkey"
            columns: ["product_uuid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          created_at: string | null
          id: string
          product_uuid: string
          rating: number
          review: string | null
          user_uuid: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_uuid: string
          rating: number
          review?: string | null
          user_uuid?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_uuid?: string
          rating?: number
          review?: string | null
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_uuid_fkey"
            columns: ["product_uuid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productreviews_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: number[] | null
          description: string | null
          id: string
          name: string
          price: number
          user_uuid: string
        }
        Insert: {
          category?: number[] | null
          description?: string | null
          id?: string
          name: string
          price?: number
          user_uuid?: string
        }
        Update: {
          category?: number[] | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          full_name: string | null
          id: string
          no_control: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          full_name?: string | null
          id: string
          no_control?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          full_name?: string | null
          id?: string
          no_control?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      comment_types: "post" | "comment" | "product"
      like_type: "post" | "comment"
      notification_type:
        | "new_post"
        | "new_review"
        | "review_goal"
        | "new_like"
        | "new_comment"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
