import { useDetailsStore } from "@/app/_hooks/useDetailsStore"
import { FeeI } from "@/app/_interfaces/fee";

export const PriceBreakdown = () => {
  const { price } = useDetailsStore();
  return (
    <div className="grid gap-8">
      <p className="text-slate-600 text-xl font-semibold">Price Breakdown</p>
      <div className="grid gap-4">
        <div className="flex flex-row justify-between">
          <p className="text-slate-600 text-md">Base</p>
          <p className="text-slate-600 text-md">${price?.base} {price?.currency}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-slate-600 text-md font-semibold">Fees</p>
            {price!.fees!.map((fee: FeeI, index: number) => (
              <div key={index} className="flex flex-row justify-between text-xs">
                <p>{fee.type}</p>
                <p className="text-slate-600 text-md">${fee.amount} {price!.currency}</p>
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-blue-600 text-md">Total</p>
          <p className="text-blue-600 text-lg font-semibold">${price?.grandTotal} {price?.currency}</p>
        </div>
      </div>
    </div>
  )
}   