import { Card, CardContent } from "@/components/ui/card"
import { Amenity, Segment } from "../_consts/Segment"
import { LayoverBetween } from "./layover-between"

export const SegmentComponent = (props: {segment: Segment}) => {
  return (
    <><Card className="w-full border bg-white h-full">
      <CardContent className="flex flex-row justify-between gap-4 h-full">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between gap-2">
            <p className="font-semibold">{props.segment.flight_number}</p>
            <p className="font-semibold">{props.segment.aircraft_type}</p>
            <p className="font-semibold">{props.segment.airline}</p>
          </div>
          <p>{props.segment.departure_date} {props.segment.departure_time} - {props.segment.arrival_date} {props.segment.arrival_time}</p>
          <p>{props.segment.departure_airport} - {props.segment.arrival_airport}</p>
          <div className="flex flex-row gap-5">
          </div>
        </div>
        <div className="border border-blue-200 rounded-lg p-2 flex flex-col justify-between max-h-full w-fit overflow-y-scroll gap-1 px-8">
          <p className="text-sm font-semibold">
            Travelers Fare Details
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-sm">Cabin</p>
            <p className="text-sm">{props.segment.cabin}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm">Class</p>
            <p className="text-sm">{props.segment.class}</p>
          </div>
          <p className="text-sm font-semibold">
            Amenities
          </p>
          {props.segment.amenities.map((amenity: Amenity, index: number) => (
            <div key={index} className="flex flex-row justify-between">
              <p className="text-sm">{amenity.amenity}</p>
              <p className="text-sm">{amenity.chargable}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    <LayoverBetween />
    </>

  )
}