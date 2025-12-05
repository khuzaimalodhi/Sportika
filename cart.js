// CART SCRIPT
$(document).ready(function () {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart button click
    $('.add-to-cart').click(function (e) {
        e.preventDefault();
        const name = $(this).data('name');
        const price = parseFloat($(this).data('price'));

        // Check if product already exists in cart
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} added to cart!`);
    });

    // Update cart count in navbar
    function updateCartCount() {
        let count = cart.reduce((sum, item) => sum + item.qty, 0);
        $('#cartCount').text(count);
    }

    // Load cart page
    if ($('#cart-items').length) {
        displayCart();
    }

    // Remove item
    $(document).on('click', '.remove-item', function () {
        const name = $(this).data('name');
        cart = cart.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    });

    // Change quantity
    $(document).on('change', '.item-qty', function () {
        const name = $(this).data('name');
        const qty = parseInt($(this).val());
        const item = cart.find(i => i.name === name);
        if (item) {
            item.qty = qty;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartCount();
        }
    });

    // Display cart
    function displayCart() {
        const $cart = $('#cart-items');
        $cart.empty();
        if (cart.length === 0) {
            $cart.html('<p>Your cart is empty!</p>');
            $('#total-price').text('0.00');
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const subtotal = item.price * item.qty;
            total += subtotal;
            $cart.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><input type="number" min="1" class="form-control item-qty" data-name="${item.name}" value="${item.qty}" style="width:80px;"></td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Remove</button></td>
                </tr>
            `);
        });
        $('#total-price').text(total.toFixed(2));
    }
});


