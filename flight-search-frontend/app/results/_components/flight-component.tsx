import { Card, CardContent } from "@/components/ui/card"
import { PlaneIcon, PlaneTakeoffIcon, PlaneLandingIcon } from "lucide-react"
import { Flight } from "@/app/_interfaces/flights-general"
import { Stop } from "@/app/_interfaces/flights-general"

export const FlightComponent = (props: {flight: Flight}) => {
    return (
        <Card className="w-full bg-zinc-200/25 h-fit hover:bg-slate-300/25">
            <CardContent className="flex flex-col justify-between gap-4">
                <div className="flex flex-row justify-between">
                    <div className="departure text-left">
                        <PlaneTakeoffIcon size={20} className="text-blue-500"/>
                        <p className="text-xl font-semibold">{props.flight.deperture_time}</p>
                        <p>{props.flight.deperture_city} {props.flight.deperture_code}</p>
                    </div>
                    <div className="middle-space flex flex-row justify-center items-center gap-4">
                        <div className="w-50 h-[2px] bg-blue-800/25"></div>
                        <div className="flex flex-col justify-center items-center">
                            <PlaneIcon size={30} className="text-blue-800/50"/>
                            <p>{props.flight.airline}</p>
                        </div>
                        <div className="w-50 h-[2px] bg-blue-800/25"></div>

                    </div>
                    <div className="arrival flex flex-col text-right items-right">
                        <PlaneLandingIcon size={20} className="text-blue-500 self-end"/>
                        <p className="text-xl font-semibold">{props.flight.arraival_time}</p>
                        <p>{props.flight.arraival_city} {props.flight.arraival_code}</p>
                    </div>
                </div>
                <div className="bottom-section flex flex-row justify-between">
                    <div className="flex flex-col text-left text-sm text-slate-600/75">
                        <p>{props.flight.total_price} ({props.flight.number_stops} stops)</p>
                        
                        {
                            props.flight.stops ? 
                            props.flight.stops.map((stop: Stop, index: number) => (
                                <p key={index}>{stop.stop_time} in {stop.stop_airport}</p>
                            ))
                            : null
                        }
                    </div>
                    <div className="flex flex-row justify-start gap-8">
                        <div className="flex flex-col">
                            <p className="font-bold text-lg text-blue-800">{props.flight.total_price} {props.flight.currency}</p>
                            <p className="text-sm text-slate-600/75">total</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-lg text-blue-800">{props.flight.price_per_person} {props.flight.currency}</p>
                            <p className="text-sm text-slate-600/75">per person</p>
                        </div>
                    </div>
                    
                </div>
                
                
            </CardContent>
        </Card>
    )
}