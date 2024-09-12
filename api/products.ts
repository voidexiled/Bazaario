import { supabase } from "@/lib/supabase";

export const getProductsByUserId = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_uuid", id);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
