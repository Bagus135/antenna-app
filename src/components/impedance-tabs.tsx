'use client';
import { impedanceZx, PropagationConst } from "@/utils/impedanceZx";
import { useState, JSX } from "react";
import { ZinputToNumber } from "./vswr-tabs";
import { calculateMagnitude, calculatePhase, calculateVSWR, ReflectionConst } from "@/utils/reflection-vswr";
import Link from "next/link";

const numberRegex = /^-?\d*\.?\d*$/;

type ComplexNumberInput = {
    real: string;
    imag: string;
};

type ComplexNumber = {
    real: number;
    imag: number;
};

type ResultType = {
    Zx: ComplexNumber;
    normalizeZx: ComplexNumber;
    reflectionConst: ComplexNumber;
};

export default function ImpedanceTabs(): JSX.Element {
    const [Z0, setZ0] = useState<ComplexNumberInput>({
        real: '',
        imag: '',
    });

    const [ZL, setZL] = useState<ComplexNumberInput>({
        real: '',
        imag: '',
    });

    const [freq, setFreq] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [unit, setUnit] = useState({
        freq: "GHz",
        distance: 'm'
    });

    const [result, setResult] = useState<ResultType | null>(null);

    function handleSanitizedInputChange(value: string, setter: (val: string) => void) {
        if (value === '' || numberRegex.test(value)) {
            setter(value);
        }
    }

    const frequencyInHz = (): number => {
        const freqValue = Number(freq);
        switch (unit.freq) {
            case "Hz": return freqValue;
            case "kHz": return freqValue * 1e3;
            case "MHz": return freqValue * 1e6;
            case "GHz": return freqValue * 1e9;
            default: return freqValue;
        }
    };

    const distanceInMeters = (): number => {
        const distanceValue = Number(distance);
        switch (unit.distance) {
            case "lambda": return (distanceValue * 3 * (10 ** 8) ) / frequencyInHz();
            case "mm": return distanceValue * 1e-3;
            case "cm": return distanceValue * 1e-2;
            case "m": return distanceValue;
            case "km": return distanceValue * 1e3;
            default: return distanceValue;
        }
    };

    const isInputValid = (): boolean => {
        const fields = [Z0.real, Z0.imag, ZL.real, ZL.imag, freq, distance];
        return fields.every(field => field !== '' && numberRegex.test(field));
    };

    const handleCalculate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!isInputValid()) return; // Safety check

        const ZLnumber = ZinputToNumber(ZL);
        const Z0number = ZinputToNumber(Z0);
        const b = PropagationConst(frequencyInHz());
        const x = distanceInMeters();
        const reflectionConst = ReflectionConst(ZLnumber, Z0number);
        const [normalizedZx, Zx] = impedanceZx(ZLnumber, Z0number, b, x);
        setResult({
            normalizeZx: normalizedZx,
            reflectionConst: reflectionConst,
            Zx: Zx
        });
    };

    const reflectionMagnitude: number | null = result ? calculateMagnitude(result.reflectionConst) : null;
    const reflectionPhase: number | null = result ? calculatePhase(result.reflectionConst) : null;
    const vswr: number | null = reflectionMagnitude !== null ? calculateVSWR(reflectionMagnitude) : null;
    const phaseDegrees: number | null = reflectionPhase !== null ? (reflectionPhase * 180 / Math.PI) : null;

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
                                    className="w-full p-3 border border-gray-300 rounded-l-md invalid:border-red-500"
                                    placeholder="Real part"
                                    required
                                    value={Z0.real}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZ0(prev => ({ ...prev, real: val })))}
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
                                    value={Z0.imag}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZ0(prev => ({ ...prev, imag: val })))}
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
                                    value={ZL.real}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZL(prev => ({ ...prev, real: val })))}
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
                                    value={ZL.imag}
                                    onChange={(e) => handleSanitizedInputChange(e.target.value, val => setZL(prev => ({ ...prev, imag: val })))}
                                />
                                <span className="flex items-center bg-gray-200 px-3 rounded-r-md border-t border-r border-b border-gray-300">
                                    jΩ
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Frequency</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={freq}
                                onChange={(e) => handleSanitizedInputChange(e.target.value, setFreq)}
                                className="w-full p-3 border border-gray-300 rounded-l-md  invalid:border-red-500"
                                placeholder="Enter frequency"
                                required
                            />
                            <select
                                value={unit.freq}
                                onChange={(e) => setUnit({ ...unit, freq: e.target.value })}
                                className="p-3 border border-gray-300 rounded-r-md bg-white  invalid:border-red-500"
                            >
                                <option value="Hz">Hz</option>
                                <option value="kHz">kHz</option>
                                <option value="MHz">MHz</option>
                                <option value="GHz">GHz</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Distance from Zₗ</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={distance}
                                onChange={(e) => handleSanitizedInputChange(e.target.value, setDistance)}
                                className="w-full p-3 border border-gray-300 rounded-l-md  invalid:border-red-500"
                                placeholder="Enter distance"
                                required
                            />
                            <select
                                value={unit.distance}
                                onChange={(e) => setUnit({ ...unit, distance: e.target.value })}
                                className="p-3 border border-gray-300 rounded-r-md bg-white"
                            >
                                <option value="lambda">λ</option>
                                <option value="mm">mm</option>
                                <option value="cm">cm</option>
                                <option value="m">m</option>
                                <option value="km">km</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleCalculate}
                        disabled={!isInputValid()}
                        className={`w-full p-0 ${isInputValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white font-medium rounded-md transition duration-300`}
                        >
                        <Link href={'#result'} className="w-full flex justify-center rounded-md py-3 px-4">
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
                            <h4 className="font-medium text-gray-700">Propagation Constant (β)</h4>
                            <p className="text-2xl font-bold text-blue-600">
                                {PropagationConst(frequencyInHz()).toFixed(6)} rad/m
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <h4 className="font-medium text-gray-700">Reflection Coefficient (Γ)</h4>
                            <p className="text-xl font-semibold text-blue-600">
                                {result.reflectionConst.real.toFixed(4)} {result.reflectionConst.imag >= 0 ? "+" : ""}{result.reflectionConst.imag.toFixed(4)}j
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

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <h4 className="font-medium text-gray-700">VSWR</h4>
                            <p className="text-2xl font-bold text-blue-600">
                                {vswr && !isNaN(vswr) && isFinite(vswr) ? vswr.toFixed(4) : "∞"}
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <h4 className="font-medium text-gray-700">Normalized Impedance at {distance} {unit.distance}</h4>
                            <p className="text-xl font-semibold text-blue-600">
                                {result.normalizeZx ? `${result.normalizeZx.real.toFixed(4)} ${result.normalizeZx.imag >= 0 ? "+" : ""}${result.normalizeZx.imag.toFixed(4)}j` : ""}
                            </p>

                            <h4 className="font-medium text-gray-700 mt-3">Impedance at {distance} {unit.distance}</h4>
                            <p className="text-xl font-semibold text-blue-600">
                                {result.Zx ? `${result.Zx.real.toFixed(4)} ${result.Zx.imag >= 0 ? "+" : ""}${result.Zx.imag.toFixed(4)}j Ω` : ""}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};