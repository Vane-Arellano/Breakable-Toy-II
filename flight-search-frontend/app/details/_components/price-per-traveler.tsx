import { useDetailsStore } from "@/app/_hooks/useDetailsStore"

export const PerTraveler = () => {
    const { pricePerTraveler } = useDetailsStore();
    const currency = pricePerTraveler?.currency
    const grandTotal = pricePerTraveler?.grandTotal ? parseFloat(pricePerTraveler?.grandTotal) : 0
    const base = pricePerTraveler?.base ? parseFloat(pricePerTraveler?.base) : 0

    return (
        <div className="bg-neutral-200/25 flex flex-col py-4 px-8 h-1/2 rounded-lg gap-8">
            <p className="text-slate-600 text-lg font-semibold">Per Traveler</p>
            <div className="grid gap-4">
                <div className="flex flex-row justify-between">
                    <p className="text-slate-600 text-md">Base</p>
                    <p className="text-slate-600 text-md">${base} {currency}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-slate-600 text-md">Fees</p>
                    <p className="text-slate-600 text-md">${grandTotal - base} {currency}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-blue-600 text-md">Total</p>
                    <p className="text-blue-600 text-lg font-semibold">${pricePerTraveler?.grandTotal} {currency}</p>
                </div>
            </div>
        </div>
    )
}