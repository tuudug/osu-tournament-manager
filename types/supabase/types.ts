export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      client_error_logs: {
        Row: {
          created_at: string;
          error_data: Json;
          error_type: string;
          id: number;
          url: string | null;
          user_agent: string | null;
          user_id: number | null;
        };
        Insert: {
          created_at?: string;
          error_data: Json;
          error_type: string;
          id?: number;
          url?: string | null;
          user_agent?: string | null;
          user_id?: number | null;
        };
        Update: {
          created_at?: string;
          error_data?: Json;
          error_type?: string;
          id?: number;
          url?: string | null;
          user_agent?: string | null;
          user_id?: number | null;
        };
        Relationships: [];
      };
      tournament: {
        Row: {
          acronym: string;
          cohost_ids: number[] | null;
          created_at: string;
          description: string | null;
          end_date: string | null;
          host_id: number | null;
          id: number;
          name: string;
          pooler_ids: number[] | null;
          rank_limit_lower: number | null;
          rank_limit_upper: number | null;
          referee_ids: number[] | null;
          registration_open: boolean | null;
          start_date: string | null;
          status: string | null;
          team_size: number;
          vs_size: number;
        };
        Insert: {
          acronym: string;
          cohost_ids?: number[] | null;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          host_id?: number | null;
          id?: number;
          name: string;
          pooler_ids?: number[] | null;
          rank_limit_lower?: number | null;
          rank_limit_upper?: number | null;
          referee_ids?: number[] | null;
          registration_open?: boolean | null;
          start_date?: string | null;
          status?: string | null;
          team_size: number;
          vs_size: number;
        };
        Update: {
          acronym?: string;
          cohost_ids?: number[] | null;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          host_id?: number | null;
          id?: number;
          name?: string;
          pooler_ids?: number[] | null;
          rank_limit_lower?: number | null;
          rank_limit_upper?: number | null;
          referee_ids?: number[] | null;
          registration_open?: boolean | null;
          start_date?: string | null;
          status?: string | null;
          team_size?: number;
          vs_size?: number;
        };
        Relationships: [];
      };
      tournament_bracket: {
        Row: {
          created_at: string | null;
          id: number;
          stage_name: string;
          stage_order: number;
          tournament_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          stage_name: string;
          stage_order: number;
          tournament_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          stage_name?: string;
          stage_order?: number;
          tournament_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_bracket_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournament";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_mappool: {
        Row: {
          created_at: string;
          created_user_id: number;
          id: number;
          name: string;
          tournament_id: number;
        };
        Insert: {
          created_at?: string;
          created_user_id: number;
          id?: number;
          name: string;
          tournament_id: number;
        };
        Update: {
          created_at?: string;
          created_user_id?: number;
          id?: number;
          name?: string;
          tournament_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_mappool_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournament";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_mappool_map: {
        Row: {
          comment: string | null;
          created_at: string;
          id: number;
          map_data: Json | null;
          map_number: number;
          map_prefix: string;
          mappool_id: number;
          osu_map_id: number;
          pooler_id: number;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          map_data?: Json | null;
          map_number: number;
          map_prefix: string;
          mappool_id: number;
          osu_map_id: number;
          pooler_id: number;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          map_data?: Json | null;
          map_number?: number;
          map_prefix?: string;
          mappool_id?: number;
          osu_map_id?: number;
          pooler_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_mappool_map_mappool_id_fkey";
            columns: ["mappool_id"];
            isOneToOne: false;
            referencedRelation: "tournament_mappool";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_match: {
        Row: {
          created_at: string;
          id: number;
          internal_match_id: number;
          mappool_id: number;
          match_data: Json | null;
          referee_id: number | null;
          room_id: string | null;
          round_name: string | null;
          scheduled_time: string | null;
          score_team1: number | null;
          score_team2: number | null;
          status: string | null;
          team_1_id: number;
          team_2_id: number;
          tournament_id: number;
          winner_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          internal_match_id: number;
          mappool_id: number;
          match_data?: Json | null;
          referee_id?: number | null;
          room_id?: string | null;
          round_name?: string | null;
          scheduled_time?: string | null;
          score_team1?: number | null;
          score_team2?: number | null;
          status?: string | null;
          team_1_id: number;
          team_2_id: number;
          tournament_id: number;
          winner_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          internal_match_id?: number;
          mappool_id?: number;
          match_data?: Json | null;
          referee_id?: number | null;
          room_id?: string | null;
          round_name?: string | null;
          scheduled_time?: string | null;
          score_team1?: number | null;
          score_team2?: number | null;
          status?: string | null;
          team_1_id?: number;
          team_2_id?: number;
          tournament_id?: number;
          winner_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_match_mappool_id_fkey";
            columns: ["mappool_id"];
            isOneToOne: false;
            referencedRelation: "tournament_mappool";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_team_1_id_fkey";
            columns: ["team_1_id"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_team_2_id_fkey";
            columns: ["team_2_id"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournament";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_winner_id_fkey";
            columns: ["winner_id"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_match_map: {
        Row: {
          banned_by: number | null;
          id: number;
          map_id: number | null;
          match_id: number | null;
          order_number: number;
          picked_by: number | null;
          score_team1: number | null;
          score_team2: number | null;
          status: string;
          winner_id: number | null;
        };
        Insert: {
          banned_by?: number | null;
          id?: number;
          map_id?: number | null;
          match_id?: number | null;
          order_number: number;
          picked_by?: number | null;
          score_team1?: number | null;
          score_team2?: number | null;
          status: string;
          winner_id?: number | null;
        };
        Update: {
          banned_by?: number | null;
          id?: number;
          map_id?: number | null;
          match_id?: number | null;
          order_number?: number;
          picked_by?: number | null;
          score_team1?: number | null;
          score_team2?: number | null;
          status?: string;
          winner_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_match_map_banned_by_fkey";
            columns: ["banned_by"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_map_map_id_fkey";
            columns: ["map_id"];
            isOneToOne: false;
            referencedRelation: "tournament_mappool_map";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_map_match_id_fkey";
            columns: ["match_id"];
            isOneToOne: false;
            referencedRelation: "tournament_match";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_map_picked_by_fkey";
            columns: ["picked_by"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_match_map_winner_id_fkey";
            columns: ["winner_id"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_stage: {
        Row: {
          ban_count: number;
          best_of: number;
          created_at: string;
          id: number;
          mappool_id: number;
          name: string;
          tournament_id: number;
        };
        Insert: {
          ban_count: number;
          best_of: number;
          created_at?: string;
          id?: number;
          mappool_id: number;
          name: string;
          tournament_id: number;
        };
        Update: {
          ban_count?: number;
          best_of?: number;
          created_at?: string;
          id?: number;
          mappool_id?: number;
          name?: string;
          tournament_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_stage_mappool_id_fkey";
            columns: ["mappool_id"];
            isOneToOne: false;
            referencedRelation: "tournament_mappool";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_stage_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournament";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_team: {
        Row: {
          captain_id: number;
          created_at: string;
          id: number;
          name: string;
          player_ids: number[] | null;
          status: string | null;
          tournament_id: number;
        };
        Insert: {
          captain_id: number;
          created_at?: string;
          id?: number;
          name: string;
          player_ids?: number[] | null;
          status?: string | null;
          tournament_id: number;
        };
        Update: {
          captain_id?: number;
          created_at?: string;
          id?: number;
          name?: string;
          player_ids?: number[] | null;
          status?: string | null;
          tournament_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_team_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournament";
            referencedColumns: ["id"];
          },
        ];
      };
      tournament_team_invitation: {
        Row: {
          created_at: string | null;
          id: number;
          invitee_id: number;
          inviter_id: number;
          status: string;
          team_id: number | null;
          tournament_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          invitee_id: number;
          inviter_id: number;
          status: string;
          team_id?: number | null;
          tournament_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          invitee_id?: number;
          inviter_id?: number;
          status?: string;
          team_id?: number | null;
          tournament_id?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tournament_team_invitation_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "tournament_team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tournament_team_invitation_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "tournament";
            referencedColumns: ["id"];
          },
        ];
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
