import consola from "consola";
import bibles from "../out/bibles.json";
import { supabase } from "../../services/supabase";

async function createBibles() {
  const { data, error } = await supabase.from("Bibles").upsert(bibles);
  if (error) consola.error(error);
  return data;
}

createBibles()
  .then((data) => consola.success("Successfully uploaded bibles", data))
  .catch(consola.error);
