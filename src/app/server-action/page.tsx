
"use client";

import { useActionState } from "react";

import { loginAction, LoginFormState } from "@/components/server actions/ServerAction";
import LoginActionForm from "@/components/Form";

const initialState: LoginFormState = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState
    );

    return <LoginActionForm formAction={formAction} state={state} isPending={isPending} />;
}