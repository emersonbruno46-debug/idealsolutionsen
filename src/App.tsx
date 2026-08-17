import PremiumLanding from "./pages/PremiumLanding";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <PremiumLanding />
    </TooltipProvider>
  );
}

export default App;
