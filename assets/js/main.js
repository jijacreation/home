function openOrderModal(name, price, imgSrc) {
    document.getElementById('modal-product-name').innerText = name;
    document.getElementById('modal-product-price').innerText = price;
    document.getElementById('modal-product-img').src = imgSrc;
    document.getElementById('order-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    document.getElementById('order-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal on background click
document.getElementById('order-modal').addEventListener('click', function(e) {
    if (e.target === this) closeOrderModal();
});

// Filter Logic
document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Update Active Styles
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.remove('bg-primary', 'text-on-primary');
            btn.classList.add('bg-surface-container-high', 'text-secondary');
        });
        button.classList.add('bg-primary', 'text-on-primary');
        button.classList.remove('bg-surface-container-high', 'text-secondary');

        // Filter Products
        document.querySelectorAll('[data-category]').forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

function sendWhatsAppMessage() {
    const productName = document.getElementById('modal-product-name').innerText;
    const productPrice = document.getElementById('modal-product-price').innerText;
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;

    if (!customerName || !customerPhone || !customerAddress) {
        alert('Please fill in all the details.');
        return;
    }

    const message = `*New Order from Artisanal Gallery*\n\n` +
                    `*Product:* ${productName}\n` +
                    `*Price:* ${productPrice}\n\n` +
                    `*Customer Details:*\n` +
                    `- Name: ${customerName}\n` +
                    `- Phone: ${customerPhone}\n` +
                    `- Address: ${customerAddress}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '9987146678';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

const menuToggle = document.getElementById('menu-toggle');
const closeDrawer = document.getElementById('close-drawer');
const sideDrawer = document.getElementById('side-drawer');
const drawerOverlay = document.getElementById('side-drawer-overlay');
const contactLink = document.getElementById('contact-link');

function toggleMenu(isOpen) {
    if (isOpen) {
        sideDrawer.classList.remove('-translate-x-full');
        drawerOverlay.classList.remove('hidden', 'pointer-events-none');
        setTimeout(() => drawerOverlay.classList.add('opacity-100'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        sideDrawer.classList.add('-translate-x-full');
        drawerOverlay.classList.remove('opacity-100');
        setTimeout(() => {
            drawerOverlay.classList.add('hidden', 'pointer-events-none');
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

menuToggle.addEventListener('click', () => toggleMenu(true));
closeDrawer.addEventListener('click', () => toggleMenu(false));
drawerOverlay.addEventListener('click', () => toggleMenu(false));

// Smooth scroll for Contact Us link
contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu(false);
    document.querySelector('#footer-contact').scrollIntoView({ behavior: 'smooth' });
});