document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const numeroSKU = document.getElementById('numeroSKU');
    const valor = document.getElementById('valor');

    registroForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const regexSKU = /^(\d{6}|\d{13})$/;
        if (!regexSKU.test(numeroSKU.value)){
            alert('Por favor, insira o SKU corretamente');
            return;
        }

        const regexValor = /^\d{1,}(\.\d{2})?$/;
        if(!regexValor.test(valor.value)){
            alert('Por favor, insira o VALOR corretamente');
            return;
        }
        
        
        const dadosParaEnvio = {
            sku: numeroSKU.value,
            valor: valor.value
        };

        fetch('http://192.168.88.53:3000/api/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(dadosParaEnvio)
        })
        .then(resposta => {
            if (!resposta.ok) {
                return resposta.json().then(err => {
                    throw new Error(err.error || 'Erro desconhecido ao salvar os dados');
                });
            }
            return resposta.json();
        })
        .then(dados => {
            console.log('Dados salvos com sucesso: ', dados);
            alert(dados.message);
            registroForm.reset(); 
        })
        .catch(erro => {
            console.error('Erro ao enviar dados: ', erro.message);
            alert(erro.message);
        });
    });
});
