// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/
export function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function () {
            return cpfEnviado.replace(/\D+/g, '');
        },
    });
}

ValidaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criaDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += regressivo * Number(val);
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

ValidaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

export const applyCPFMask = (inputValue) => {
    const mask = '###.###.###-##';
    let text = '';
    const data = inputValue;
    let c;

    let m;

    let i;

    let x;

    let valueCharCount = 0;
    for (i = 0, x = 1; x && i < mask.length; ++i) {
        c = data.charAt(valueCharCount);
        m = mask.charAt(i);

        if (valueCharCount >= data.length) {
            // console.log("break;");
            break;
        }

        switch (mask.charAt(i)) {
            case '9': // Number
            case '#': // Number
                if (/\d/.test(c)) {
                    text += c;
                    valueCharCount++;
                    // console.log("text += c;");
                } else {
                    x = 0;
                    // console.log("x = 0;");
                }
                break;

            case '8': // Alphanumeric
            case 'A': // Alphanumeric
                if (/[a-z]/i.test(c)) {
                    text += c;
                    valueCharCount++;
                } else {
                    x = 0;
                }
                break;

            case '7': // Number or Alphanumerica
            case 'N': // Number or Alphanumerica
                if (/[a-z0-9]/i.test(c)) {
                    text += c;
                    valueCharCount++;
                } else {
                    x = 0;
                }
                break;

            case '6': // Any
            case 'X': // Any
                text += c;
                valueCharCount++;

                break;

            default:
                if (m === c) {
                    text += m;
                    valueCharCount++;
                } else {
                    text += m;
                }

                break;
        }
    }
    return text;
};

/*
const cpf = new ValidaCPF('509.486.670-28');

if(cpf.valida()) {
  console.log('Cpf válido');
} else {
  console.log('Cpf inválido');
}
*/
