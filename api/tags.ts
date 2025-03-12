import { supabase } from "@/lib/supabase";

export const getTagsByArrayId = async (ids: number[] | null) => {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .in("id", ids!);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getTags = async () => {
  const { data, error } = await supabase.from("tags").select("*");
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
