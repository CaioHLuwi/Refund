const form = document.querySelector('form');
const amount = document.querySelector('#amount');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');
const expenseArea = document.querySelector('#expense-area');

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

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense);

    amount.value = '';
    expense.value = '';
    category.value = '';
})

function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense');

        const imageExpense = document.createElement('img');
        imageExpense.setAttribute("src", `img/${newExpense.category_id}.svg`);
        imageExpense.setAttribute("alt", `${newExpense.category_name}`);

        expenseItem.appendChild(imageExpense);

        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('expense-info');

        const expenseTitle = document.createElement('strong');
        expenseTitle.textContent = newExpense.expense;

        const expenseCategory = document.createElement('span');
        expenseCategory.textContent = newExpense.category_name;

        expenseItem.appendChild(expenseInfo);

        expenseInfo.appendChild(expenseTitle);
        expenseInfo.appendChild(expenseCategory);

        const expenseAmount = document.createElement('span');
        expenseAmount.classList.add('expense-amount');

        const expenseValue = document.createElement('small');
        expenseValue.textContent = newExpense.amount;

        expenseItem.appendChild(expenseAmount);

        expenseAmount.appendChild(expenseValue);

        const deleteIcon = document.createElement('img');
        deleteIcon.classList.add('remove-icon');
        deleteIcon.setAttribute("src", "img/remove.svg");
        deleteIcon.setAttribute("alt", "remover");

        expenseItem.appendChild(deleteIcon);

        expenseArea.appendChild(expenseItem);

        deleteIcon.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        })
    } catch(error) {
        alert('Não foi possível atualizar a lista de despesas');
        console.log(error);
    }
}



