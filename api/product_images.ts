import { supabase } from "@/lib/supabase";

export const getProductImagesByProductId = async (id: string) => {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_uuid", id);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
