interface amenities {
    name: string, 
    chargable: boolean
}
export interface segment {
    segments: flightDetails []
}
export interface flightDetails {
    segmentId: number,
    cabin: string, 
    classType: string,
    deperture_time: string,
    amanities: amenities[], 

}