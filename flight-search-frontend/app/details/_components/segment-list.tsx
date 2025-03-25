'use client'
import { SegmentComponent } from "./segment-card"
import { Segment, Segments } from "../_consts/Segment"

export const SegmentList = () => {

  return (
    <div className="flex flex-col justify-start gap-3 p-10 h-full bg-white rounded-lg">
      {
      Segments.length > 1 ? 
      Segments.map((segment: Segment, index: number) => (
        <div key={index} className="h-1/5">
          {
            <SegmentComponent segment={segment} />
           
          }
        </div>
      )) 
      : 
      <SegmentComponent segment={Segments[0]} />

    }
    </div>
  )

}