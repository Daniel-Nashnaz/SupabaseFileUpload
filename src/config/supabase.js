import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "";
const supabaseKey = "";
let supabaseClient = null;
try {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.log("Error: " + error);
}
export const supabase = supabaseClient;
