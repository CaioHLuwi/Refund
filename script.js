const amount = document.querySelector('#amount');

amount.addEventListener('input', () => {
    let value = amount.value.replace(/\D/g, "");

    value = Number(value) / 100;

    amount.value = formatCurrencyBRL(value);
})


/**
 * 
 * @param {Number} value Valor inserido no campo de valor da despesa.
 * @returns Valor formatado na moeda BRL.
 */
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value;
}

