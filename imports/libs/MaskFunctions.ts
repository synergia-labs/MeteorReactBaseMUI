export function mascaraValorMonetario(value: string): string {
    let valor = value

    valor = valor.replace(/\D/g, '')
    valor = (parseInt(valor) / 100).toFixed(2) + ''
    valor = valor.replace('.', ',') //troca o ponto pela vírgula dos centavos

    valor = valor.replace(/(\d)(\d{3})(\d{3})(\d{3}),/g, '$1.$2.$3.$4,')
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,')
    valor = valor.replace(/(\d)(\d{3}),/g, '$1.$2,')

    if (valor == 'NaN' || valor == '0,00') {
        return ''
    } else {
        return 'R$' + valor
    }
}

export function mascaraPontoProporcional(value: string): string {
    let valor = value

    valor = valor.replace(/\D/g, '')
    valor = (parseInt(valor) / 100).toFixed(2) + ''
    valor = valor.replace('.', ',')

    if (valor == 'NaN' || valor == '0,00' || valor.length > 6) {
        return ' '
    } else {
        return valor
    }
}

export function mascaraPontosFixos(value: string | undefined): string {
    if (!value) {
        return ''
    }
    let valor = value

    valor = valor.replace(/\D/g, '')
    valor = valor.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')

    if (valor == 'NaN' || valor == '00' || valor == '0') {
        return ''
    } else {
        return valor
    }
}
