import { EllipsisVertical, Clock } from "lucide-react"

export const LayoverBetween = () => {
    return (
        <div className="flex flex-row gap-4 align-center items-center p-5">
            <EllipsisVertical color="blue" className="color-blue" />
            <Clock width={15} height={15}/>
            <p>2h 30min layoff in Amsterdam - AMS</p>
        </div>
    )
}