import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const handleReturnToResults = async (router: AppRouterInstance) => {
    router.back()
}

