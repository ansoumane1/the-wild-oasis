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

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1 Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log("Error:", error);
    throw new Error("Could not add cabin");
  }
  // 2. Upload image
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
