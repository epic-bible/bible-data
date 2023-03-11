import consola from "consola";
import verses from "../out/verses.json";
import { supabase } from "../../services/supabase";

async function createVerses() {
  const { data, error } = await supabase.from("Verses").upsert(verses).select();
  if (error) throw error;
  return data;
}

createVerses()
  .then((data) => consola.success("Successfully uploaded verses", data))
  .catch(consola.error);
