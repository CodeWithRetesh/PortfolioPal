import bcrypt from "bcryptjs";
import supabase from "../config/supabase.js";

export const registerService = async (userData) => {

  const { fullName, email, password } = userData;

  if (!fullName || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name: fullName,
        email,
        password_hash: hashedPassword,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    message: "User registered successfully",
    user: data,
  };
};