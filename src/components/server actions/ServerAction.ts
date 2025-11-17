
"use server";

export interface LoginFormState {
  email: string;
  password: string;
  success?: string;
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
}

export interface FormProps {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  state: LoginFormState;
}


export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {

    const rawData = {
      email: String(formData.get("email") ?? "") as string,
      password: String(formData.get("password") ?? "") as string,
    };

    const { email, password } = rawData;

    await new Promise((resolve) => setTimeout(resolve, 1000));


    if (email === "test@example.com" && password === "password123") {
      return {
        email: "",
        password: "",
        success: "Login successful! Redirecting...",
      };
    }

    return {
      email,
      password: "",
      error: "Invalid email or password",
    };
  } catch (error) {

    return {
      email: prevState.email,
      password: "",
      error: "An unexpected error occurred. Please try again.",
    };
  }
}