export const PriceBreakdown = () => {
  return (
    <div className="grid gap-8">
      <p className="text-slate-600 text-xl font-semibold">Price Breakdown</p>
      <div className="grid gap-4">
        <div className="flex flex-row justify-between">
          <p className="text-slate-600 text-md">Base</p>
          <p className="text-slate-600 text-md">$600 USD</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-slate-600 text-md">Fees</p>
          <p className="text-slate-600 text-md">$100 USD</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-blue-600 text-md">Total</p>
          <p className="text-blue-600 text-lg font-semibold">$700 USD</p>
        </div>
      </div>
    </div>
  )
}   