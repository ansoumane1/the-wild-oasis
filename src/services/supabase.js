import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lhnlsyxfxrvibaqvaloy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobmxzeXhmeHJ2aWJhcXZhbG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMjkwNzIsImV4cCI6MjAxNTcwNTA3Mn0.mnWpYJcZK_IUQCN58z9SJaXqpiL7Fuey6hYy8UcnAOU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
