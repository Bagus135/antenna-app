import { complexAddition, complexDivide, complexMultiply } from "./complex-operation";

export  const PropagationConst = (f : number): number => {
    const c = 3 * (10 ** 8); 
    return 2 * Math.PI * f / c;
};

export const jZMultiply = (Z : ComplexNumber,  b : number, x:number) : ComplexNumber =>{
    const tanFactor = Math.tan(b* x)
    return {
        real : Z.imag * -1 *tanFactor,
        imag : Z.real * tanFactor,
    }
}


export const impedanceZx = (ZL : ComplexNumber, Z0 : ComplexNumber, b : number, x:number) : [ComplexNumber, ComplexNumber] => {
    const jZ0 = jZMultiply(Z0, b,x)
    const jZL = jZMultiply(ZL, b, x)

    const numerator = complexAddition(ZL, jZ0)
    const denumerator = complexAddition(Z0, jZL)

    const normalizedZx = complexDivide(numerator, denumerator)
    const Zx = complexMultiply(Z0, normalizedZx) 
    
    return [normalizedZx, Zx]
}