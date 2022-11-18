
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getAllBreeds } from "./features/dogsSlice";
import BreedSelectorBox from "./pages/Dog";

function App() {
  const dispatch = useAppDispatch()
useEffect(()=>{
  dispatch(getAllBreeds())
},[])
  return (
    <div className="App">
      <BreedSelectorBox />
    </div>
  );
}

export default App;
