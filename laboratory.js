/**
 * Problem 14: Shopping Cart System - JavaScript Implementation
 *
 * Requirements:
 * - Cart item structure: { name: string, quantity: number, price: number }
 * - Functions required: Total Value, Filter by Price, Find Most Expensive, 
 * Group by Quantity, Simulate Asynchronous Fetch.
 */

class ShoppingCart {
    /**
     * Initializes the cart with an array of items.
     * @param {Array<{name: string, quantity: number, price: number}>} initialItems 
     */
    constructor(initialItems = []) {
        this.items = initialItems;
        console.log("ShoppingCart initialized.");
    }

    // Utility function to add an item (useful for the async simulation)
    addItem(item) {
        this.items.push(item);
    }

    /**
     * 1. Calculates the total monetary value of all items in the cart.
     * (quantity * price) for each item, summed up.
     * @returns {number} The total value.
     */
    calculateTotalValue() {
        return this.items.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);
    }

    /**
     * 2. Filters items where the unit price is greater than the given amount.
     * @param {number} minPrice - The minimum unit price to include.
     * @returns {Array<{name: string, quantity: number, price: number}>} Filtered items.
     */
    filterByMinPrice(minPrice) {
        return this.items.filter(item => item.price > minPrice);
    }

    /**
     * 3. Finds the single most expensive item based on unit price.
     * @returns {{name: string, quantity: number, price: number} | null} The item object or null.
     */
    findMostExpensiveItem() {
        if (this.items.length === 0) {
            return null;
        }

        return this.items.reduce((mostExpensive, currentItem) => {
            return currentItem.price > mostExpensive.price ? currentItem : mostExpensive;
        });
    }

    /**
     * 4. Groups items into quantity categories (e.g., Small, Medium, Large).
     * @returns {Object.<string, Array<{name: string, quantity: number, price: number}>>} Grouped items.
     */
    groupByQuantity() {
        return this.items.reduce((groups, item) => {
            let range;
            if (item.quantity <= 1) {
                range = 'Single Item (Qty=1)';
            } else if (item.quantity <= 5) {
                range = 'Small Batch (Qty=2-5)';
            } else {
                range = 'Large Batch (Qty>5)';
            }

            // Initialize the array for the range if it doesn't exist
            if (!groups[range]) {
                groups[range] = [];
            }
            groups[range].push(item);

            return groups;
        }, {});
    }

    /**
     * 5. Simulates fetching additional items asynchronously using a Promise and setTimeout.
     * @param {number} [delay=1500] - The time in milliseconds for the simulation.
     * @returns {Promise<Array<{name: string, quantity: number, price: number}>>} Resolves with the new items.
     */
    fetchAdditionalItemsAsync(delay = 1500) {
        console.log('\n-- Simulating, API call for more items... (Wait ${delay}ms) --');
        const newItems = [
            { name: 'Power Bank', quantity: 2, price: 35.00 },
            { name: 'Earbuds', quantity: 1, price: 79.99 }
        ];

        return new Promise(resolve => {
            setTimeout(() => {
                newItems.forEach(item => this.addItem(item));
                console.log('--- Async fetch successful. Items added. ---');
                resolve(newItems);
            }, delay);
        });
    }
}


// --- DEMONSTRATION / EXECUTION ---

const cartItems = [
    { name: 'Laptop', quantity: 1, price: 1200.00 },
    { name: 'Keyboard', quantity: 2, price: 75.50 },
    { name: 'Pens', quantity: 15, price: 1.25 },
    { name: 'Monitor', quantity: 1, price: 299.99 },
];

const myCart = new ShoppingCart(cartItems);

console.log('\n--- Synchronous Operations ---');

// 1. Total Value
const total = myCart.calculateTotalValue();
console.log('Total, Cart, Value : $${total.toFixed(2)}');

// 2. Filter by Price (> $50)
const expensive = myCart.filterByMinPrice(50.00);
console.log('\nItems with Unit Price > $50.00:', expensive);

// 3. Most Expensive Item
const mostExpensive = myCart.findMostExpensiveItem();
console.log('\nMost Expensive Item (Unit Price):', mostExpensive);

// 4. Group by Quantity
const grouped = myCart.groupByQuantity();
console.log('\nItems Grouped by Quantity:', grouped);

// 5. Asynchronous Fetch
async function runDemo() {
    try {
        const fetchedItems = await myCart.fetchAdditionalItemsAsync(1000); // 1 second delay
        console.log('\nFetched items added:', fetchedItems);
        
        const finalTotal = myCart.calculateTotalValue();
        console.log('Final ,Total, Cart, Value (after, async, fetch): $${finalTotal,toFixed,(2)}');
    } catch (error) {
        console.error('Error during async fetch:', error);
    }
}

runDemo();