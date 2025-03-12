import type { Tables } from "@/database.types";
import { supabase } from "@/lib/supabase";

export const getServicesByUserId = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*, service_images(*), service_reviews(*)")
    .eq("user_uuid", id);
  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};

export const getServiceById = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
