function VerificarArquivo(mimetype) {
    let tiposAnexo = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
        "image/tiff",
        "image/x-icon",
        "image/svg+xml",
        "image/heif",
        "image/heic",
        "application/pdf"
    ];
    vars['verificacaoArquivo'];
    vars['tiposPermitidos'] = `
.jpeg,
.jpg,
.png,
.gif,
.bmp,
.webp,
.tiff,
.tif,
.ico,
.svg,
.heif,
.heic,
.pdf
`;

    for (let i = 0; i < tiposAnexo.length; i++) 
    {
        // Salvar a variável 'mimetype' no Kualiz com o valor do 'message_file.file_mimetype'
        if (mimetype == tiposAnexo[i])
        {
            // Usar uma verificação com variável no Kualiz para saber se o 'verificacaoArquivo' é igual a 'true'
            vars['verificacaoArquivo'] = true;

            break;

        } else
        {
            vars['verificacaoArquivo'] = false;
        }
    }
}

VerificarArquivo(/*vars['mimetype']*/);
