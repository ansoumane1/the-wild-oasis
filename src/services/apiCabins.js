import supabase, { supabaseUrl } from "./supabase";

// Function to get all cabins from database
export async function getCabins() {
  // Query database for all cabins
  const { data, error } = await supabase.from("cabins").select("*");

  // If there's an error, log it and throw an error
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // Return all cabins data
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePah = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePah
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1 Create /edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log("Error:", error);
    throw new Error("Could not add cabin");
  }
  // 2. Upload image
  if (hasImagePah) return data;
  
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3 Delete the cabin if there was an error to upload the cabin image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Could not delete Cabin");
  }

  return data;
}
