import { useMemo } from "react"
import type { Activity } from "../types"

type CalorieTrackerProps = {
    activities: Activity[]
}

const CalorieTracker = ({activities} :  CalorieTrackerProps) => {

    const caloriesConsumed = useMemo(() => activities.reduce((total,activity) => activity.category === 1 ? total + activity.calories : total,0), [activities])
    const caloresBurned = useMemo(() => activities.reduce((total,activity) => activity.category === 2 ? total + activity.calories : total,0), [activities])
    const caloriesTotal = useMemo(() => caloriesConsumed - caloresBurned, [activities])

    return (
        <>
            <h2 className="text-2xl font-black text-center text-white ">Resumen de Calorias</h2>
            <p className="text-white font-bold rounded-full grid grid-cols-1  text-center"><span className="font-black text-3xl text-orange-500">{caloriesConsumed}</span>Consumidas</p>

            <p className="text-white font-bold rounded-full grid grid-cols-1 text-center"><span className="font-black text-3xl text-orange-500">{caloresBurned}</span>Quemadas</p>

            <p className="text-white font-bold rounded-full grid grid-cols-1 text-center"><span className="font-black text-3xl text-orange-400">{caloriesTotal}</span>Total</p>
        </>
    )
}

export default CalorieTracker
