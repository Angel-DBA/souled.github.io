document.addEventListener('DOMContentLoaded', () => {
    // Responsive Navigation Menu
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) content.style.display = 'flex'; // Show dropdown on hover
        });
  
        dropdown.addEventListener('mouseleave', () => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) content.style.display = 'none'; // Hide dropdown when not hovering
        });
    });
  
    // Toggle Search Input
    function toggleSearch() {
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.style.display = (searchInput.style.display === "none" || searchInput.style.display === "") ? "block" : "none";
            if (searchInput.style.display === "block") searchInput.focus(); // Focus if shown
        }
    }
  
    // Cart Functionality
    let cartCount = 0; // Initialize cart count
    const cartItems = []; // Array to store added products
  
    // Update Cart Count Display
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount; // Update badge with the new count
        }
    }
  
    // Add Item to Cart
    function addToCart(productName, productPrice) {
        cartItems.push({ name: productName, price: productPrice }); // Store product
        cartCount++; // Increase cart count
        updateCartCount(); // Update the cart count
        alert(`${productName} has been added to your cart at $${productPrice}!`); // Notify user
    }
  
    // Toggle Cart Dropdown
    function toggleCartDropdown(event) {
        const dropdown = document.getElementById('cart-dropdown');
        if (dropdown) {
            dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
            displayCartItems(); // Show cart items
            event.preventDefault(); // Prevent default link behavior
        }
    }
  
    // Display Cart Items
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cartItems.length > 0 ? cartItems.map(item => `<p>${item.name} - $${item.price}</p>`).join('') : "Your cart is empty.";
        }
    }
  
    // Event Listeners for Add to Cart Buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price')); // Get price from data attribute
            addToCart(productName, productPrice);
        });
    });
  
    // Dropdown Setup for Mobile
    function setupDropdown() {
        const menuLinks = document.querySelectorAll('.navbar > li > .dropdown-title');
        
        menuLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const dropdown = item.nextElementSibling; // Get the corresponding dropdown content
                const isVisible = dropdown.style.display === 'flex';
  
                // Hide all dropdowns first
                document.querySelectorAll('.dropdown-content').forEach(drop => {
                    drop.style.display = 'none';
                });
  
                // Show the clicked dropdown if it was not visible
                if (!isVisible) {
                    dropdown.style.display = 'flex'; // Show dropdown
                }
            });
        });
  
        // Hide dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.navbar')) {
                document.querySelectorAll('.dropdown-content').forEach(drop => {
                    drop.style.display = 'none'; // Hide all
                });
            }
        });
    }
  
    // Smooth Scroll for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
  
    // Form Validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !emailInput.value.includes('@')) {
                e.preventDefault(); // Prevent form submission
                alert('Please enter a valid email address.');
            }
        });
    }
  
    // Dynamic Content Loading
    async function fetchData() {
        try {
            const response = await fetch('https://api.example.com/products'); // Update with your API URL
            const data = await response.json();
            // Process and display your data
            console.log(data);
            // Assuming your data structure has a name and price, you can update your UI accordingly
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    fetchData(); // Call the function to fetch data
  
    // Image Gallery with Lightbox Effect
    document.querySelectorAll('.gallery img').forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `<img src="${this.src}" alt="" />`;
            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
            document.body.appendChild(lightbox);
        });
    });
  
    // Toggle Dark/Light Mode
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
  
    // Toggle between Sign In and Sign Up forms
    function toggleForms() {
        const signInForm = document.getElementById("signInForm");
        const signUpForm = document.getElementById("signUpForm");
        
        if (signInForm && signUpForm) {
            signInForm.style.display = signInForm.style.display === "none" ? "block" : "none";
            signUpForm.style.display = signUpForm.style.display === "none" ? "block" : "none";
        }
    }
  
    // Initialize the dropdown behavior for mobile if necessary
    if (window.innerWidth < 768) {
        setupDropdown();
    }
  });
  
  // Function to toggle product list visibility
  function toggleProductList(productListId, button) {
    const productList = document.getElementById(productListId);
    if (productList) {
        const isVisible = productList.style.display === "block";
        productList.style.display = isVisible ? "none" : "block"; // Toggle display
        button.textContent = isVisible ? "See All" : "Hide"; // Update button text
    }
  }
  

