import consola from "consola";
import chapters from "../out/chapters.json";
import { supabase } from "../../services/supabase";

async function createChapters() {
  const { data, error } = await supabase
    .from("Chapters")
    .upsert(chapters)
    .select();
  if (error) throw error;
  return data;
}

createChapters()
  .then((data) => consola.success("Successfully uploaded chapters", data))
  .catch(consola.error);
