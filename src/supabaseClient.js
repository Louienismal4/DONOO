import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uepwulaevwcwqywtmyul.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcHd1bGFldndjd3F5d3RteXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MTc2ODQsImV4cCI6MjA0NDA5MzY4NH0.TBHsshxqrcXcpMoMn6SXDvzhzshYRRu9Vv54vXEK52o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
