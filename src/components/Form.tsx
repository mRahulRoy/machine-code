
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { LoginFormState } from "./server actions/ServerAction";


interface LoginFormProps {
    formAction: any;
    isPending: boolean;
    state: LoginFormState;
}

export default function LoginActionForm({ formAction, isPending, state }: LoginFormProps) {
    const { error, success, fieldErrors } = state;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md">
                {/* Global Messages */}
                {error && !fieldErrors && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-green-200 text-sm">{success}</p>
                    </div>
                )}

                <form
                    action={formAction}
                    className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-6"
                >
                    <h2 className="text-2xl font-bold text-white text-center">
                        Sign In
                    </h2>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={state.email}
                            disabled={isPending}
                            className={`w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg outline-none transition-all
                focus:ring-2 focus:ring-blue-500 focus:bg-gray-600
                disabled:opacity-50 disabled:cursor-not-allowed
                ${fieldErrors?.email ? "ring-2 ring-red-500" : ""}
              `}
                            placeholder="you@example.com"
                            aria-invalid={!!fieldErrors?.email}
                            aria-describedby={fieldErrors?.email ? "email-error" : undefined}
                        />
                        {fieldErrors?.email && (
                            <p id="email-error" className="text-red-400 text-sm flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {fieldErrors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            defaultValue={state.password}
                            disabled={isPending}
                            className={`w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg outline-none transition-all
                focus:ring-2 focus:ring-blue-500 focus:bg-gray-600
                disabled:opacity-50 disabled:cursor-not-allowed
                ${fieldErrors?.password ? "ring-2 ring-red-500" : ""}
              `}
                            placeholder="••••••••"
                            aria-invalid={!!fieldErrors?.password}
                            aria-describedby={fieldErrors?.password ? "password-error" : undefined}
                        />
                        {fieldErrors?.password && (
                            <p id="password-error" className="text-red-400 text-sm flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {fieldErrors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}