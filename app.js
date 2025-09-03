document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const numeroSKU = document.getElementById('numeroSKU');
    const valor = document.getElementById('valor');

    registroForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const regexSKU = /^\d{6}$/;
        if (!regexSKU.test(numeroSKU.value)){
            alert('Por favor, insira o SKU corretamente');
            return;
        }

        const regexValor = /^\d{1,}(\.\d{2})?$/;
        if(!regexValor.test(valor.value)){
            alert('Por favor, insira o VALOR corretamente');
            return;
        }
        const numeroSKUValor = numeroSKU.value;
        const valorPeca = valor.value;

        const dadosParaEnvio = {
            sku: numeroSKUValor,
            valor: valorPeca
        };

        fetch('http://localhost:3000/api/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnvio)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('Erro na requisição: ' + resposta.statusText);
        }
        return resposta.json();
    })
    .then(dados => {
        console.log('Dados salvos com sucesso: ', dados);
        alert('Valor registrado com sucesso!');
        registroForm.reset(); 
    })
    .catch(erro => {
        console.error('Erro ao enviar dados: ', erro);
        alert('Erro ao registrar o valor. Tente novamente.');
    });
        
        console.log('SKU:', numeroSKUValor);
        console.log('Valor:', valorPeca);
    });
        
});