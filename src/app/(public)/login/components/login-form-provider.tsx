"use client"

import { login } from "@/actions/login"
import { FormStateProvider } from "@/components/forms/form-state-provider"
import { schema } from "@/types/requests/login"
import type { PropsWithChildren } from "react"

export const LoginFormProvider = ({children}: PropsWithChildren) => {
    return <FormStateProvider action={login} schema={schema}>{children}</FormStateProvider>
}