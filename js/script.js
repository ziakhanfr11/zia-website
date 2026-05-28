/* =====================================================
   ZIA WEBSITE - MAIN JAVASCRIPT FILE
   ===================================================== */

// ========== SAMPLE DATA ==========

// Sample Products Data
const products = [
    {
        id: 1,
        name: 'Laptop Pro',
        price: 999,
        image: 'https://via.placeholder.com/250x200?text=Laptop+Pro',
        description: 'High-performance laptop for professionals',
        category: 'electronics'
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        price: 79,
        image: 'https://via.placeholder.com/250x200?text=Headphones',
        description: 'Premium sound quality with noise cancellation',
        category: 'electronics'
    },
    {
        id: 3,
        name: 'Smart Watch',
        price: 199,
        image: 'https://via.placeholder.com/250x200?text=Smart+Watch',
        description: 'Track your fitness and stay connected',
        category: 'electronics'
    },
    {
        id: 4,
        name: 'USB-C Cable',
        price: 15,
        image: 'https://via.placeholder.com/250x200?text=USB-C+Cable',
        description: 'Fast charging and data transfer',
        category: 'accessories'
    },
    {
        id: 5,
        name: 'Phone Stand',
        price: 25,
        image: 'https://via.placeholder.com/250x200?text=Phone+Stand',
        description: 'Adjustable phone holder for any device',
        category: 'accessories'
    },
    {
        id: 6,
        name: 'Power Bank',
        price: 45,
        image: 'https://via.placeholder.com/250x200?text=Power+Bank',
        description: '20000mAh fast charging power bank',
        category: 'accessories'
    }
];

// Sample Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: 'How to Choose the Right Laptop',
        excerpt: 'A comprehensive guide to selecting the perfect laptop for your needs...',
        author: 'Zia Ur Rehman',
        date: '2026-05-25',
        category: 'Tech Tips',
        image: 'https://via.placeholder.com/250x200?text=Blog+1'
    },
    {
        id: 2,
        title: 'Top 10 Web Development Trends in 2026',
        excerpt: 'Discover the latest trends shaping the future of web development...',
        author: 'Zia Ur Rehman',
        date: '2026-05-20',
        category: 'Web Development',
        image: 'https://via.placeholder.com/250x200?text=Blog+2'
    },
    {
        id: 3,
        title: 'Productivity Tips for Remote Workers',
        excerpt: 'Master the art of working from home with these effective strategies...',
        author: 'Zia Ur Rehman',
        date: '2026-05-15',
        category: 'Lifestyle',
        image: 'https://via.placeholder.com/250x200?text=Blog+3'
    }
];

// Sample Portfolio Items Data
const portfolioItems = [
    {
        id: 1,
        title: 'E-Commerce Website',
        description: 'Full-stack e-commerce platform with payment integration',
        image: 'https://via.placeholder.com/250x200?text=Portfolio+1',
        technologies: 'React, Node.js, MongoDB'
    },
    {
        id: 2,
        title: 'Blog Platform',
        description: 'Content management system for bloggers',
        image: 'https://via.placeholder.com/250x200?text=Portfolio+2',
        technologies: 'Next.js, Firebase, Tailwind CSS'
    },
    {
        id: 3,
        title: 'Task Manager App',
        description: 'Collaborative task management application',
        image: 'https://via.placeholder.com/250x200?text=Portfolio+3',
        technologies: 'Vue.js, Express, PostgreSQL'
    }
];

// ========== CART MANAGEMENT ==========

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart(cart);
    alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// ========== PRODUCT RENDERING ==========

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.slice(0, 3);
    
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-card-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        🛒 Add to Cart
                    </button>
                    <button class="btn-view">
                        👁️ View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== BLOG RENDERING ==========

function renderLatestBlogPosts() {
    const container = document.getElementById('latest-posts');
    if (!container) return;
    
    const latest = blogPosts.slice(0, 3);
    
    container.innerHTML = latest.map(post => `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <small style="color: var(--primary-color); font-weight: bold;">${post.category}</small>
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <small>By ${post.author} | ${new Date(post.date).toLocaleDateString()}</small>
                <br><br>
                <a href="blog.html?id=${post.id}" class="btn btn-secondary">Read More</a>
            </div>
        </div>
    `).join('');
}

// ========== PORTFOLIO RENDERING ==========

function renderPortfolioHighlights() {
    const container = document.getElementById('portfolio-items');
    if (!container) return;
    
    const highlights = portfolioItems.slice(0, 3);
    
    container.innerHTML = highlights.map(item => `
        <div class="portfolio-card">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-card-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <small><strong>Tech Stack:</strong> ${item.technologies}</small>
                <br><br>
                <a href="portfolio.html#${item.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// ========== FORM HANDLING ==========

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        alert(`Thank you for subscribing! Check your email at ${email}`);
        event.target.reset();
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form data:', data);
    alert('Thank you for your message! We will contact you soon.');
    event.target.reset();
}

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderFeaturedProducts();
    renderLatestBlogPosts();
    renderPortfolioHighlights();
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// ========== UTILITY FUNCTIONS ==========

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function searchProducts(query) {
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
}

function filterProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function getBlogPostById(id) {
    return blogPosts.find(post => post.id === id);
}

function getPortfolioItemById(id) {
    return portfolioItems.find(item => item.id === id);
}

console.log('✅ Zia Website JavaScript loaded successfully!');
