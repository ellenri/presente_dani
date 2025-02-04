/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_META: string
  readonly VITE_AMOUNT: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 