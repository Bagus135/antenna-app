import { MathJax } from "better-react-mathjax";
import { ClientPage } from "./client-page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ClientPage/>
      <main className="container mx-auto px-4 py-8">
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-4">Transmission Line Theory</h3>
          <div className="space-y-4 pl-2">

            <div>
              <h4 className="font-medium text-gray-700">Reflection Coefficient</h4>
              <p className="text-sm text-gray-600 mt-1">
                The reflection coefficient (Γ) is the ratio of the reflected wave to the incident wave.
              </p>
              <p className="font-mono mt-1 pl-5 py-2">
                <MathJax>
                  {
                    '\\(Γ = \\frac{Zₗ - Z₀}{Zₗ + Z₀}\\)'
                  }
                </MathJax>
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">VSWR Definition</h4>
              <p className="text-sm text-gray-600 mt-1">
                VSWR (Voltage Standing Wave Ratio) is a measure of the mismatch between a transmission 
                line and its load. Its the ratio of the maximum to minimum voltage amplitude along the line.
              </p>
              <p className="font-mono mt-1 pl-5 py-2">
                <MathJax>
                  {
                    '\\(VSWR = \\frac{1 + |Γ|}{1 - |Γ|}\\)'
                  }
                </MathJax>
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">Impedance at Distance x</h4>
              <p className="text-sm text-gray-600 mt-1">
                The impedance at a distance x from the load is given by:
              </p>
              <p className="font-mono mt-1 pl-5 py-2">
                <MathJax>
                  {
                  "\\(Z(x) = Z₀ [\\frac{Zₗ + Z₀ × tanh(γx)}{Z₀ + Zₗ × tanh(γx)}]\\)"
                  }
                </MathJax>
              </p>
            </div>
              
            <div>
              <h4 className="font-medium text-gray-700">Propagation Constant</h4>
              <p className="text-sm text-gray-600 mt-1">
                The propagation constant (γ) describes how a wave propagates through a medium.
              </p>
              <p className="font-mono mt-1 pl-5 py-2">γ = α + jβ</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}