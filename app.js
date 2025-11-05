document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATOS (Actualizados a 4 productos de café + descripción) ---
    const productsData = [
        {
            id: 1,
            name: "Prensa Francesa Clásica",
            price: 28.50,
            description: "Prensa de 1L con acabados en acero inoxidable y vidrio de borosilicato resistente al calor.",
            image: "images/prensa-francesa.png", 
            alt: "Elegante cafetera de prensa francesa de vidrio y acero inoxidable."
        },
        {
            id: 2,
            name: "Molinillo de Café Manual",
            price: 34.99,
            description: "Molinillo con muelas cónicas de cerámica para una molienda uniforme y ajustable.",
            image: "images/molinillo.png", // Debes añadir esta imagen
            alt: "Molinillo de café manual de estilo vintage con cuerpo de madera y manivela de metal."
        },
        {
            id: 3,
            name: "Café de Colombia (500g)",
            price: 18.00,
            description: "Granos de café 100% Arábica de tueste medio, con notas de chocolate y cítricos.",
            image: "images/granos-cafe.png", // Debes añadir esta imagen
            alt: "Bolsa de granos de café de Colombia de 500g."
        },
        {
            id: 4,
            name: "Taza de Cerámica Artesanal",
            price: 15.00,
            description: "Taza de 350ml hecha a mano por artesanos locales, ideal para tu café matutino.",
            image: "images/taza.png", // Debes añadir esta imagen
            alt: "Taza de cerámica artesanal con un esmalte rústico en tonos azules y tierra."
        }
    ];

    // --- 2. ESTADO DE LA APLICACIÓN ---
    let cart = [];

    // --- 3. REFERENCIAS AL DOM ---
    const productListContainer = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // --- 4. FUNCIONES DE RENDERIZADO ---

    /**
     * Renderiza la lista de productos en el DOM
     */
    function renderProducts() {
        if (!productListContainer) return; // Salir si el contenedor no existe
        
        productListContainer.innerHTML = ''; // Limpiar lista
        productsData.forEach(product => {
            // Creamos los elementos semánticamente
            const productCard = document.createElement('article');
            productCard.className = 'product-card';
            
            // ACCESIBILIDAD: El 'alt' text es crucial
            // **CAMBIO AQUÍ**: Añadida la <p class="product-description">
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.alt}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price.toFixed(2)} €</p>
                </div>
                
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus" aria-hidden="true"></i>
                    <span>Añadir al carrito</span>
                </button>
            `;
            productListContainer.appendChild(productCard);
        });

        // Añadir listeners a los botones recién creados
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                addToCart(id);
            });
        });
    }

    /**
     * Renderiza los elementos del carrito en el DOM
     */
    function renderCart() {
        if (!cartItemsContainer) return; // Salir si el contenedor no existe

        // Limpiar carrito
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)} €</span>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Actualizar total y contador
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = count;
        
        // ACCESIBILIDAD: Anuncia el cambio en el contador del carrito
        // 'aria-live="polite"' en el HTML hace que esto se lea
        cartCountElement.setAttribute('aria-label', `${count} elementos en el carrito`);
    }

    // --- 5. LÓGICA DE LA APLICACIÓN ---

    /**
     * Añade un producto al carrito
     * @param {number} productId 
     */
    function addToCart(productId) {
        // Encontrar el producto en los datos
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        // Comprobar si ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++; // Aumentar cantidad
        } else {
            cart.push({ ...product, quantity: 1 }); // Añadir nuevo
        }

        // Actualizar la vista
        renderCart();
    }

    // --- 6. INICIALIZACIÓN ---
    renderProducts();
    renderCart();
});
