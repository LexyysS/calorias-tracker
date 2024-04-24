
import { useEffect, useMemo } from "react" 
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from "./hooks/useActivity"

function App() {
  
  const { state, dispatch} = useActivity()

  useEffect(()=> {
    localStorage.setItem('activities',JSON.stringify(state.activities))
  },[state.activities])

  const RestartApp = () => useMemo(()=>state.activities.length > 0 ,[state.activities])

  return (
    <>
      <header className=" bg-lime-400 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorias</h1>

          <button className="bg-gray-800 rounded-md hover:bg-gray-900 py-2 px-3 font-bold uppercase text-white cursor-pointer text-sm disabled:opacity-10"
          disabled={!RestartApp()} onClick={()=>dispatch({type: 'restart-app'})}>
            Reiniciar App
          </button>

        </div>
      </header>

      <section className=" bg-lime-300 p-5 ">
        <div className="mx-auto max-w-4xl grid md:grid-cols-3 grid-cols-1 gap-0 md:gap-2">

          <div className="w-full col-span-2 mx-auto ">
            <Form/>
          </div>

          <div className="w-full col-span-1 p-5 mx-auto  rounded-lg bg-gray-900  grid grid-cols-1 items-center ">
            <CalorieTracker />
          </div>

        </div>
        

      </section>
      
      <section className=" p-10 mx-auto max-w-4xl">
        <ActivityList />
      </section>
    </>
  )
}

export default App
