import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

let supabaseClient = null;
try {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.log("Error: " + error);
}
export const supabase = supabaseClient;
