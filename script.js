
        // Product Data with multiple images
        const products = [
            {
                id: 1,
                name: "Diamond Eternity Ring",
                description: "18K white gold with brilliant cut diamonds",
                price: 125000,
                images: [
                    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=400&fit=crop"
                ]
            },
            {
                id: 2,
                name: "Gold Necklace Set",
                description: "22K gold traditional necklace with matching earrings",
                price: 185000,
                images: [
                    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&h=400&fit=crop"
                ]
            },
            {
                id: 3,
                name: "Ruby Pendant",
                description: "Burmese ruby in platinum setting",
                price: 95000,
                images: [
                    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1588444650921-c2c01cc78ad5?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=400&fit=crop"
                ]
            },
            {
                id: 4,
                name: "Pearl Bracelet",
                description: "Freshwater pearls with diamond clasp",
                price: 65000,
                images: [
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=400&fit=crop"
                ]
            },
            {
                id: 5,
                name: "Emerald Earrings",
                description: "Colombian emerald studs in gold",
                price: 78000,
                images: [
                    "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1535556116002-6281ff3e9f99?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&h=400&fit=crop"
                ]
            },
            {
                id: 6,
                name: "Sapphire Ring",
                description: "Blue sapphire with diamond halo",
                price: 110000,
                images: [
                    "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1614093396763-baabfdf36985?w=500&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop"
                ]
            }
        ];

        // Cart Management
        let cart = [];
        let currentZoomProduct = null;
        let currentZoomImageIndex = 0;

        // Render Products
        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = products.map((product, index) => `
                <div class="product-card" data-product-index="${index}">
                    <div class="product-image-container">
                        ${product.images.map((img, imgIndex) => `
                            <img src="${img}" 
                                 alt="${product.name}" 
                                 class="product-image" 
                                 style="display: ${imgIndex === 0 ? 'block' : 'none'};"
                                 data-img-index="${imgIndex}"
                                 onclick="openZoom(${index}, ${imgIndex})">
                        `).join('')}
                        <button class="image-nav prev" onclick="changeProductImage(${index}, -1, event)">‹</button>
                        <button class="image-nav next" onclick="changeProductImage(${index}, 1, event)">›</button>
                        <div class="image-dots">
                            ${product.images.map((_, dotIndex) => `
                                <span class="image-dot ${dotIndex === 0 ? 'active' : ''}" 
                                      onclick="setProductImage(${index}, ${dotIndex}, event)"></span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Product Image Slider Functions
        let currentProductImages = products.map(() => 0);

        function changeProductImage(productIndex, direction, event) {
            event.stopPropagation();
            const product = products[productIndex];
            const totalImages = product.images.length;
            
            currentProductImages[productIndex] = (currentProductImages[productIndex] + direction + totalImages) % totalImages;
            updateProductImage(productIndex);
        }

        function setProductImage(productIndex, imageIndex, event) {
            event.stopPropagation();
            currentProductImages[productIndex] = imageIndex;
            updateProductImage(productIndex);
        }

        function updateProductImage(productIndex) {
            const card = document.querySelector(`[data-product-index="${productIndex}"]`);
            const images = card.querySelectorAll('.product-image');
            const dots = card.querySelectorAll('.image-dot');
            
            images.forEach((img, index) => {
                img.style.display = index === currentProductImages[productIndex] ? 'block' : 'none';
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentProductImages[productIndex]);
            });
        }

        // Zoom Functions
        function openZoom(productIndex, imageIndex) {
            currentZoomProduct = productIndex;
            currentZoomImageIndex = imageIndex;
            const product = products[productIndex];
            const zoomImage = document.getElementById('zoomImage');
            zoomImage.src = product.images[imageIndex];
            zoomImage.alt = product.name;
            document.getElementById('zoomModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeZoom() {
            document.getElementById('zoomModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        function changeZoomImage(direction) {
            const product = products[currentZoomProduct];
            const totalImages = product.images.length;
            currentZoomImageIndex = (currentZoomImageIndex + direction + totalImages) % totalImages;
            const zoomImage = document.getElementById('zoomImage');
            zoomImage.src = product.images[currentZoomImageIndex];
        }

        // Add to Cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartUI();
            showNotification('Item added to cart!');
        }

        // Update Cart UI
        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                cartTotal.textContent = '₹0';
                return;
            }
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.images[0]}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.quantity}</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
        }

        // Remove from Cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
        }

        // Toggle Cart
        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.toggle('active');
        }

        // Proceed to Checkout
        function proceedToCheckout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            toggleCart();
            document.getElementById('checkoutForm').classList.add('active');
            document.getElementById('checkoutForm').scrollIntoView({ behavior: 'smooth' });
        }

        // Handle Form Submission
        document.getElementById('customerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
            
            console.log('Order Details:', formData);
            
            // Show success message
            document.getElementById('successMessage').classList.add('active');
            
            // Reset
            setTimeout(() => {
                document.getElementById('successMessage').classList.remove('active');
                document.getElementById('checkoutForm').classList.remove('active');
                cart = [];
                updateCartUI();
                document.getElementById('customerForm').reset();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 3000);
        });

        // Slider Functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function goToSlide(index) {
            showSlide(index);
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Auto-advance slider
        setInterval(nextSlide, 5000);

        // Notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, var(--primary), var(--accent));
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                z-index: 3000;
                animation: slideUp 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        // Initialize
        renderProducts();

        // Close zoom modal when clicking outside
        document.getElementById('zoomModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeZoom();
            }
        });

        // Close zoom modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('zoomModal').classList.contains('active')) {
                closeZoom();
            }
        });

        // Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        function closeMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('nav');
            
            if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Prevent body scroll when cart is open
        const cartModal = document.getElementById('cartModal');
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        });
        observer.observe(cartModal, { attributes: true, attributeFilter: ['class'] });
    
    