import { SearchForm } from "./_components/search-form"

export default function SearchPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-radial-[at_25%_25%] from-blue-200/25 to-cyan-500/25 to-100% p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SearchForm/>
      </div>
    </div>
  )
}
