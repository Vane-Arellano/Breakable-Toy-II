import { EllipsisVertical, Clock } from "lucide-react"

export const LayoverBetween = ({timeBetween, airport}: {timeBetween: string, airport: string}) => {
    return (
        <div className="flex flex-row gap-4 align-center items-center m-5">
            <EllipsisVertical color="blue" className="color-blue" />
            <Clock width={15} height={15}/>
            <p>{timeBetween} layoff in {airport}</p>
        </div>
    )
}