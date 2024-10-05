document.addEventListener('DOMContentLoaded', () => {
    const productsSection = document.querySelector('.products');  // Selecciona el contenedor de productos
    const cartItems = [];

    const products = [
        { id: 1, name: 'Sombrero en Caña Flecha Tipico', price: 300, section: 'electronics', img: 'images/sombrero1.jpg', description: 'Sombrero en Caña Flecha Tipico' },
        { id: 2, name: 'Monedero Pequeño en Caña Flecha', price: 60, section: 'fashion', img: 'images/monedero.png', description: 'Monedero en Caña Flecha' },
        { id: 3, name: 'Bolso Mediano en Caña Flecha', price: 120, section: 'home', img: 'images/bolso.jpg', description: 'Bolso mediano en Caña flecha' },
        { id: 4, name: 'Sombreto en Caña Flecha', price: 20, section: 'electronics', img: 'images/sombrero1.jpg', description: 'Sombrero en Caña Flecha' },
        { id: 5, name: 'Aretes en Caña Flecha', price: 40, section: 'fashion', img: 'images/arete.jpg', description: 'Variedad de Aretes en Caña Flecha ' },
        { id: 6, name: 'Monedero de Colores', price: 40, section: 'fashion', img: 'images/monedero1.jpg', description: 'Monederos de Colores en Caña Flecha' },
    ];

    const renderProducts = (section) => {
        productsSection.innerHTML = '';  // Limpia los productos anteriores
        products
            .filter(product => product.section === section)  // Filtra los productos por sección
            .forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.dataset.id = product.id;
                productElement.dataset.name = product.name;
                productElement.dataset.price = product.price;
                productElement.dataset.section = product.section;
                productElement.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart">Agregar al Carrito</button>
                `;
                productsSection.appendChild(productElement);  // Añade el producto al contenedor
            });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const product = event.target.closest('.product');
                const productId = product.dataset.id;
                const productName = product.dataset.name;
                const productPrice = parseFloat(product.dataset.price);

                cartItems.push({ id: productId, name: productName, price: productPrice });
                updateCart();
            });
        });
    };

    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', (event) => {
            const section = event.currentTarget.dataset.section;
            renderProducts(section);  // Renderiza los productos de la categoría seleccionada
        });
    });

    const updateCart = () => {
        const cartList = document.getElementById('cart-items');
        cartList.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
            cartList.appendChild(listItem);
        });
        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
        document.getElementById('cart-count').textContent = cartItems.length;
    };

    document.querySelector('.checkout').addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        const message = `Pedido: ${cartItems.map(item => `${item.name} - $${item.price}`).join(', ')}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=3012092463&text=${encodeURIComponent(message)}%0ATotal:%20$${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Mostrar u ocultar el botón de desplazamiento hacia arriba
window.addEventListener('scroll', function() {
    const scrollTopButton = document.getElementById('scroll-top');
    if (window.scrollY > 200) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

// Función para desplazar hacia arriba
document.getElementById('scroll-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
