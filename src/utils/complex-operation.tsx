type ComplexType = {
    real : number,
    imag : number,
}

export const complexAddition = (a: ComplexType, b : ComplexType ) => {
    return {
    real : a.real + b.real,
    imag : a.imag  + b.imag,
    }
};

export const complexSubtraction = (a: ComplexType, b : ComplexType ) => {
    return {
    real :  a.real - b.real,
    imag : a.imag - b.imag,
    }
}

export  const complexDivide = (num: ComplexType, denum: ComplexType): ComplexType => {
    const denominator = denum.real * denum.real + denum.imag * denum.imag;
    return {
      real: (num.real * denum.real + num.imag * denum.imag) / denominator,
      imag: (num.imag * denum.real - num.real * denum.imag) / denominator
    };
  };
  
export const complexMultiply = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
    return {
        real: a.real * b.real - a.imag * b.imag,
        imag: a.real * b.imag + a.imag * b.real,
    }
};