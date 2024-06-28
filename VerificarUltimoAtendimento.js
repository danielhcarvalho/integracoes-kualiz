function FormatarData()
{
    const data = new Date()
          ano = data.getFullYear(),
          mes = String(data.getMonth() + 1).padStart(2, '0');
          dia = String(data.getDate()).padStart(2, '0')

    return `${ano}${mes}${dia}`;
}

function VerificarUltimoAtendimento()
{
    const dataAtual = new Date(), 
              dataUltimoAtendimento = vars['chat_last_chat_date_YYYYMMDD'];

    let dataFormatada = FormatarData();
    vars['foiAtendido'];

    if (dataFormatada == dataUltimoAtendimento && vars['chat_last_agent_id'] > 0) 
    {
        // Usar uma verificação com variável no Kualiz para saber se a variavel 'foiAtendido' é igual a 'true'
        vars['foiAtendido'] = true;

    } else
    {
        vars['foiAtendido'] = false;
    }
}

VerificarUltimoAtendimento();

