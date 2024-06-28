let tipo;

function TipoDocumento(documento) 
{
    documento = documento.replace(/\D/g, '');

    if (documento.length == 11)
    {
        tipo = 'CPF';
    } 
    else if (documento.length == 14) 
    {
        tipo = 'CNPJ';
    } 
    else 
    {
        tipo = 'Documento inválido';
    }

    /*vars['tipo'] = tipo*/
    return documento;

}

function ValidarCPF(cpf) 
{
    let digitoCPF = '', soma = 0;

    const digitoVerificador = (length) => 
    {
        let constante;

        for (let i = 0; i < length; i++) 
        {
            constante = length + 1 - i;
            soma += Number(cpf.charAt(i)) * constante;
        }

        let digitoVerificador = String(11 - (soma % 11));
        soma = 0;
        return digitoVerificador >= 10 ? '0' : digitoVerificador;

    };

    digitoCPF = digitoVerificador(9) + digitoVerificador(10);

    for (let i = 0; i < cpf.length; i++) 
    {
        soma += Number(cpf.charAt(i))
    }
    if (soma != Number(cpf.charAt(0)) * 11 && digitoCPF == cpf.charAt(9) + cpf.charAt(10)) return true;
    else return false;
}

function ValidarCNPJ(cnpj) 
{
    let digitoCNPJ = '', soma = 0;

    const digitoVerificador = (length) =>
    {
        let constante, cnpjInvertido = cnpj.substring(0, length).split('').reverse().join('');;

        for (let i = 0; i < length; i++)
        {
            constante = i + 2;

            if (constante > 9)
            {
                constante = constante - 8
            }
            soma += Number(cnpjInvertido.charAt(i)) * constante;    
        }
        
        let digitoVerificador = String(11 - (soma % 11));
        soma = 0
        return digitoVerificador >= 10 ? '0' : digitoVerificador;
    };

    digitoCNPJ = digitoVerificador(12) + digitoVerificador(13);
    
    for (let i = 0; i < cnpj.length; i++) 
    {
        soma += Number(cnpj.charAt(i))
    }
    if (soma !== Number(cnpj.charAt(0)) * 14 && digitoCNPJ == cnpj.charAt(12) + cnpj.charAt(13)) return true;
    else return false;

}

let documento = TipoDocumento(/*vars['documentoCliente']*/);
if (tipo === 'CPF') /*vars['isValid'] =*/ ValidarCPF(documento);
else if (tipo === 'CNPJ') /*vars['isValid'] =*/ValidarCNPJ(documento);
else console.log(tipo) /*, vars['isValid'] = true*/;