import { useState , Dispatch, useEffect} from "react"
import {v4 as uuidv4} from 'uuid'
import type { Activity } from "../types"
import { categories } from "../data/categorias"
import { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity= {
    id: uuidv4(),
    category: 1,
    name:'',
    calories: 0
}


const Form = ({dispatch , state}: FormProps) => {
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    },[state.activeId])
   
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity =() => {
        const {name,calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}  })

        setActivity({...initialState,
            id:uuidv4()
        })
    }

  return (
    <form className="space-y-5 bg-white shadow-sm p-10 rounded-lg max-w-4xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoria:</label>
            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
            id="category" 
            value={activity.category} 
            onChange={handleChange}>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ) )}
            </select>
        </div>
      
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name">Actividad:</label>
            <input id="name" type="text" className="border border-slate-300 p-2 rounded-lg" 
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta " 
            value={activity.name}
            onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias:</label>
            <input id="calories" type="number" className="border border-slate-300 p-2 rounded-lg" 
            placeholder="Cantidad de calorias" onChange={handleChange} value={activity.calories}
            />
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio' } disabled={!isValidActivity()}/>
        
    </form>
  )
}

export default Form