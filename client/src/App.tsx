// App.tsx
import HeatMap from "./components/Maps/HeatMap";
import TestRegistroDeCaso from "./test/TestRegistroDeCaso";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa Interativo</h1>

      <HeatMap/>
      <TestRegistroDeCaso></TestRegistroDeCaso>

    </div>
  );
}

export default App; 