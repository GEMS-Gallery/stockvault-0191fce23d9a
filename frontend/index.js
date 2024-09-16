import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addUpdateBtn = document.getElementById('add-update-btn');
    const symbolInput = document.getElementById('symbol');
    const nameInput = document.getElementById('name');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const stocksList = document.getElementById('stocks');
    const totalValueSpan = document.getElementById('total-value');

    addUpdateBtn.addEventListener('click', async () => {
        const symbol = symbolInput.value;
        const name = nameInput.value;
        const quantity = parseFloat(quantityInput.value);
        const price = parseFloat(priceInput.value);

        if (symbol && name && !isNaN(quantity) && !isNaN(price)) {
            await backend.addOrUpdateStock(symbol, name, quantity, price);
            await updateStockList();
            await updateTotalValue();
            clearInputs();
        } else {
            alert('Please fill in all fields with valid values.');
        }
    });

    async function updateStockList() {
        const stocks = await backend.getAllStocks();
        stocksList.innerHTML = '';
        stocks.forEach(stock => {
            const li = document.createElement('li');
            li.textContent = `${stock.symbol} - ${stock.name}: ${stock.quantity} shares at $${stock.price.toFixed(2)}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', async () => {
                await backend.removeStock(stock.symbol);
                await updateStockList();
                await updateTotalValue();
            });
            li.appendChild(removeBtn);
            stocksList.appendChild(li);
        });
    }

    async function updateTotalValue() {
        const totalValue = await backend.getTotalPortfolioValue();
        totalValueSpan.textContent = totalValue.toFixed(2);
    }

    function clearInputs() {
        symbolInput.value = '';
        nameInput.value = '';
        quantityInput.value = '';
        priceInput.value = '';
    }

    // Initial update
    await updateStockList();
    await updateTotalValue();
});
