import consola from "consola";
import books from "../out/books.json";
import { supabase } from "../../services/supabase";

async function createBooks() {
  // @ts-ignore
  const { data, error } = await supabase.from("Books").upsert(books);
  // .select();
  if (error) throw error;
  return data;
}

createBooks()
  .then((data) => consola.success("Successfully uploaded books", data))
  .catch(consola.error);
