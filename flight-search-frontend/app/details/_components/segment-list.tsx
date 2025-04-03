'use client'
import { SegmentComponent } from "./segment-card"
import { useDetailsStore } from "@/app/_hooks/useDetailsStore"
import { SegmentI } from "@/app/_interfaces/segment"
import { LayoverBetween } from "./layover-between"

export const SegmentList = () => {
  const { details } = useDetailsStore(); 
  
  const segments = details.itineraries.segments
  console.log(segments)
  return (
      segments !== undefined && segments.length > 0 ? 
      <>
        <div className="flex flex-col justify-start gap-3 h-full bg-white rounded-lg">
          {
          segments.length > 1 ? 
          segments.map((segment: SegmentI, index: number) => (
            <div key={index} className="flex flex-col gap-5 h-fit">
              {
                <>
                  {
                    details.timeBetween[index] !== "N/A" ?
                    <LayoverBetween timeBetween={details.timeBetween[index]} airport={segment.arrival.iataCode}/>
                   : null
                  }
                  <SegmentComponent segment={segment} />
                  
                </>
              }
            </div>
          )) 
          : 
          <SegmentComponent segment={segments[0]} />

        }
        </div>
      </>
      
      :
      null
  )

}