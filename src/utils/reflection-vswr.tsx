 import { complexAddition, complexSubtraction, complexDivide } from "./complex-operation";
 
 export const ReflectionConst = (ZL : ComplexNumber, Z0 : ComplexNumber): ComplexNumber => {
        const numerator = complexSubtraction(ZL, Z0);
        const denominator = complexAddition(ZL, Z0);
        return complexDivide(numerator, denominator);
    };

export const calculateMagnitude = (complex: ComplexNumber): number => {
        return Math.sqrt(complex.real * complex.real + complex.imag * complex.imag);
    };
    
export const calculatePhase = (complex: ComplexNumber): number => {
        return Math.atan2(complex.imag, complex.real);
    };

export const calculateVSWR = (reflectionMagnitude: number): number => {
        return (1 + reflectionMagnitude) / (1 - reflectionMagnitude);
    };