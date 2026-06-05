import { createClient } from '@supabase/supabase-js';

// Try to use VITE_ prefixed vars first, fallback to NEXT_PUBLIC_ if that's what was provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing! Make sure you created the .env.local file.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
