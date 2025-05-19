'use client';
import { calculateMagnitude, calculatePhase, calculateVSWR, ReflectionConst } from "@/utils/reflection-vswr";
import Link from "next/link";
import { useState, MouseEvent, JSX } from "react";


export const ZinputToNumber = (Z : ComplexNumberInput) : ComplexNumber => {
  const values = Object.values(Z);
  const numericValues = values.map(value => Number(value));
  const complexNumber : ComplexNumber = {
    real: numericValues[0],
    imag: numericValues[1],
  };
  return complexNumber;
};

const numberRegex = /^-?\d*\.?\d*$/;

export default function VSWRTabs(): JSX.Element {
    const [Z0, setZ0] = useState<ComplexNumberInput>({
        real: '', 
        imag: '',
    });
    
    const [ZL, setZL] = useState<ComplexNumberInput>({
        real: '',
        imag: '',
    });
      
    const [result, setResult] = useState<ResultType>(null);

    function handleSanitizedInputChange(value: string, setter: (val: string) => void) {
        if (value === '' || numberRegex.test(value)) {
            setter(value);
        }
    }

    const handleCalculate = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const [ZLnumber, Z0number] = [ZinputToNumber(ZL), ZinputToNumber(Z0)];
        const reflection = ReflectionConst(ZLnumber, Z0number);
        setResult(reflection);
    };

    const reflectionMagnitude: number | null = result ? calculateMagnitude(result) : null;
    const reflectionPhase: number | null = result ? calculatePhase(result) : null;
    const vswr: number | null = reflectionMagnitude !== null ? calculateVSWR(reflectionMagnitude) : null;
    const phaseDegrees: number | null = reflectionPhase !== null ? (reflectionPhase * 180 / Math.PI) : null;

    const isInputValid = ()=>{
        const fields = [Z0.imag, Z0.real, ZL.imag, ZL.real]
        return fields.every(field => field !== '' && numberRegex.test(field));
    } 

    return (
        <>
            <div>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Characteristic Impedance (Z₀)</label>
                        <div className="flex flex-wrap md:flex-nowrap gap-2">
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-l-md peer invalid:border-red-500"
                                    placeholder="Real part"
                                    pattern={numberRegex.source}
                                    required
                                    value={Z0.real}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZ0(prev =>({...prev, real : val})))}
                                />
                                <span className="flex items-center bg-gray-200 px-3 border-t border-r border-b border-gray-300">
                                    Ω
                                </span>
                            </div>
                            <div className="flex items-center mx-2">+</div>
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-l-md  invalid:border-red-500"
                                    placeholder="Imaginary part"
                                    pattern={numberRegex.source}
                                    required
                                    value={Z0.imag}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZ0(prev => ({...prev, imag : val})))}
                                />
                                <span className="flex items-center bg-gray-200 px-3 rounded-r-md border-t border-r border-b border-gray-300">
                                    jΩ
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Load Impedance (Zₗ)</label>
                        <div className="flex flex-wrap md:flex-nowrap gap-2">
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-l-md  invalid:border-red-500"
                                    placeholder="Real part"
                                    required
                                    pattern={numberRegex.source}
                                    value={ZL.real}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZL(prev => ({...prev, real : val})))}
                                />
                                <span className="flex items-center bg-gray-200 px-3 border-t border-r border-b border-gray-300">
                                    Ω
                                </span>
                            </div>
                            <div className="flex items-center mx-2">+</div>
                            <div className="flex flex-1">
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-l-md  invalid:border-red-500"
                                    placeholder="Imaginary part"
                                    required
                                    pattern={numberRegex.source}
                                    value={ZL.imag}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value , val => setZL(prev => ({...prev, imag : val})))}
                                />
                                <span className="flex items-center bg-gray-200 px-3 rounded-r-md border-t border-r border-b border-gray-300">
                                    jΩ
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCalculate}
                        disabled={!isInputValid()}
                        className={`w-full ${isInputValid() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white font-medium rounded-md transition duration-300`}
                        >
                        <Link href={'#result'} className="py-3 px-4 flex w-full justify-center"> 
                            Calculate
                        </Link>
                    </button>
                </div>
            </div>
            {result &&                    
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200" id="result">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                        <h4 className="font-medium text-gray-700">VSWR</h4>
                        <p className="text-2xl font-bold text-blue-600">
                            {vswr && !isNaN(vswr) && isFinite(vswr) ? vswr.toFixed(4) : "∞"}
                        </p>
                    </div>
                
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                        <h4 className="font-medium text-gray-700">Reflection Coefficient (Γ)</h4>
                        <p className="text-xl font-semibold text-blue-600">
                            {result.real.toFixed(4)} {result.imag >= 0 ? "+" : ""}{result.imag.toFixed(4)}j
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                                <h5 className="text-sm text-gray-500">Magnitude</h5>
                                <p className="font-medium">{reflectionMagnitude !== null ? reflectionMagnitude.toFixed(4) : ""}</p>
                            </div>
                            <div>
                                <h5 className="text-sm text-gray-500">Phase</h5>
                                <p className="font-medium">
                                    {reflectionPhase !== null ? `${reflectionPhase.toFixed(4)} rad` : ""} 
                                    {phaseDegrees !== null ? `(${phaseDegrees.toFixed(2)}°)` : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}
