/**
 * Injects the product-card template into an x-for wrapper element
 * and initializes Alpine.js on its children.
 * Usage: x-init="$nextTick(() => mountCard($el))"
 */
function mountCard(el) {
    const html = (window.componentTemplates || {})['product-card'];
    if (!html) { console.error('[FerShop] product-card template not loaded'); return; }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    while (tmp.firstChild) el.appendChild(tmp.firstChild);
    Array.from(el.children).forEach(child => Alpine.initTree(child));
}

function appData() {
    return {
        mobileMenu: false,
        searchOpen: false,
        searchQuery: '',
        searchFocused: false,
        accountOpen: false,
        cartOpen: false,

        // ========== SHARED DATA ==========
        categories: [
            {
                name: 'Elektronika', slug: 'elektronika',
                subcategories: ['Mobiteli i tableti', 'Laptopi', 'TV i Audio', 'Gaming', 'Fotografija', 'Pametni satovi', 'Kućanski aparati', 'Dodaci i oprema']
            },
            {
                name: 'Odjeća', slug: 'odjeca',
                subcategories: ['Majice', 'Hlače i traperice', 'Jakne i kaputi', 'Haljine', 'Sportska odjeća', 'Donje rublje', 'Pidžame', 'Dodaci']
            },
            {
                name: 'Obuća', slug: 'obuca',
                subcategories: ['Tenisice', 'Cipele', 'Čizme', 'Sandale', 'Sportska obuća', 'Papuče', 'Dječja obuća', 'Umetci i dodaci']
            },
            {
                name: 'Kuća i vrt', slug: 'kuca-i-vrt',
                subcategories: ['Namještaj', 'Dekoracije', 'Kuhinja', 'Kupaonica', 'Vrtni alati', 'Rasvjeta', 'Tekstil', 'Organizacija']
            },
            {
                name: 'Sport', slug: 'sport',
                subcategories: ['Fitness oprema', 'Biciklizam', 'Trčanje', 'Plivanje', 'Kampiranje', 'Timski sportovi', 'Yoga i pilates', 'Prehrana i suplementi']
            },
            {
                name: 'Ljepota i zdravlje', slug: 'ljepota-i-zdravlje',
                subcategories: ['Njega lica', 'Njega tijela', 'Parfemi', 'Šminka', 'Njega kose', 'Vitamini', 'Osobna higijena', 'Aparati za ljepotu']
            },
            {
                name: 'Igračke', slug: 'igracke',
                subcategories: ['LEGO', 'Plišane igračke', 'Društvene igre', 'Puzzle', 'RC modeli', 'Lutke', 'Edukativne igračke', 'Igračke za bebe']
            },
            {
                name: 'Knjige', slug: 'knjige',
                subcategories: ['Beletristika', 'Stručne knjige', 'Dječje knjige', 'Kuharice', 'Biografije', 'Stripovi', 'Udžbenici', 'E-čitači']
            },
        ],

        products: [
            { name: 'Apple iPhone 15 Pro Max 256GB', price: 1299.99, oldPrice: 1449.99, image: 'https://picsum.photos/seed/iphone/80/80', category: 'Elektronika', subcategory: 'Mobiteli i tableti' },
            { name: 'Samsung Galaxy S24 Ultra', price: 1199.99, oldPrice: null, image: 'https://picsum.photos/seed/samsung/80/80', category: 'Elektronika', subcategory: 'Mobiteli i tableti' },
            { name: 'Sony WH-1000XM5 Slušalice', price: 349.99, oldPrice: 399.99, image: 'https://picsum.photos/seed/sony/80/80', category: 'Elektronika', subcategory: 'TV i Audio' },
            { name: 'MacBook Air M3 15"', price: 1599.99, oldPrice: 1799.99, image: 'https://picsum.photos/seed/macbook/80/80', category: 'Elektronika', subcategory: 'Laptopi' },
            { name: 'Samsung 65" OLED TV', price: 1899.99, oldPrice: 2199.99, image: 'https://picsum.photos/seed/tv/80/80', category: 'Elektronika', subcategory: 'TV i Audio' },
            { name: 'PlayStation 5 Slim', price: 499.99, oldPrice: null, image: 'https://picsum.photos/seed/ps5/80/80', category: 'Elektronika', subcategory: 'Gaming' },
            { name: 'Canon EOS R6 Mark II', price: 2499.99, oldPrice: null, image: 'https://picsum.photos/seed/canon/80/80', category: 'Elektronika', subcategory: 'Fotografija' },
            { name: 'Apple Watch Ultra 2', price: 899.99, oldPrice: 949.99, image: 'https://picsum.photos/seed/watch/80/80', category: 'Elektronika', subcategory: 'Pametni satovi' },
            { name: 'Levi\'s 501 Original Jeans', price: 89.99, oldPrice: null, image: 'https://picsum.photos/seed/levis/80/80', category: 'Odjeća', subcategory: 'Hlače i traperice' },
            { name: 'Nike Dri-FIT Majica', price: 34.99, oldPrice: 44.99, image: 'https://picsum.photos/seed/nikeshirt/80/80', category: 'Odjeća', subcategory: 'Majice' },
            { name: 'The North Face Jakna', price: 249.99, oldPrice: null, image: 'https://picsum.photos/seed/northface/80/80', category: 'Odjeća', subcategory: 'Jakne i kaputi' },
            { name: 'Nike Air Max 90', price: 149.99, oldPrice: null, image: 'https://picsum.photos/seed/nike/80/80', category: 'Obuća', subcategory: 'Tenisice' },
            { name: 'Adidas Ultraboost 22', price: 179.99, oldPrice: 199.99, image: 'https://picsum.photos/seed/adidas/80/80', category: 'Obuća', subcategory: 'Sportska obuća' },
            { name: 'Dr. Martens 1460 Čizme', price: 189.99, oldPrice: null, image: 'https://picsum.photos/seed/drmartens/80/80', category: 'Obuća', subcategory: 'Čizme' },
            { name: 'Dyson V15 Detect Usisavač', price: 699.99, oldPrice: null, image: 'https://picsum.photos/seed/dyson/80/80', category: 'Kuća i vrt', subcategory: 'Kuhinja' },
            { name: 'IKEA KALLAX Regal', price: 79.99, oldPrice: null, image: 'https://picsum.photos/seed/ikea/80/80', category: 'Kuća i vrt', subcategory: 'Namještaj' },
            { name: 'Philips Hue Starter Kit', price: 129.99, oldPrice: 149.99, image: 'https://picsum.photos/seed/hue/80/80', category: 'Kuća i vrt', subcategory: 'Rasvjeta' },
            { name: 'Garmin Forerunner 265', price: 449.99, oldPrice: null, image: 'https://picsum.photos/seed/garmin/80/80', category: 'Sport', subcategory: 'Trčanje' },
            { name: 'Yoga Mat Premium', price: 39.99, oldPrice: 49.99, image: 'https://picsum.photos/seed/yoga/80/80', category: 'Sport', subcategory: 'Yoga i pilates' },
            { name: 'Optimum Nutrition Whey', price: 54.99, oldPrice: null, image: 'https://picsum.photos/seed/whey/80/80', category: 'Sport', subcategory: 'Prehrana i suplementi' },
            { name: 'La Roche-Posay Effaclar', price: 19.99, oldPrice: 24.99, image: 'https://picsum.photos/seed/laroche/80/80', category: 'Ljepota i zdravlje', subcategory: 'Njega lica' },
            { name: 'Dior Sauvage EDT 100ml', price: 89.99, oldPrice: null, image: 'https://picsum.photos/seed/dior/80/80', category: 'Ljepota i zdravlje', subcategory: 'Parfemi' },
            { name: 'Dyson Airwrap Complete', price: 549.99, oldPrice: 599.99, image: 'https://picsum.photos/seed/airwrap/80/80', category: 'Ljepota i zdravlje', subcategory: 'Aparati za ljepotu' },
            { name: 'LEGO Technic Ferrari', price: 59.99, oldPrice: 79.99, image: 'https://picsum.photos/seed/lego/80/80', category: 'Igračke', subcategory: 'LEGO' },
            { name: 'Monopoly Classic', price: 24.99, oldPrice: null, image: 'https://picsum.photos/seed/monopoly/80/80', category: 'Igračke', subcategory: 'Društvene igre' },
            { name: 'Ravensburger Puzzle 1000', price: 14.99, oldPrice: 19.99, image: 'https://picsum.photos/seed/puzzle/80/80', category: 'Igračke', subcategory: 'Puzzle' },
            { name: 'Harry Potter Box Set', price: 49.99, oldPrice: 69.99, image: 'https://picsum.photos/seed/hp/80/80', category: 'Knjige', subcategory: 'Beletristika' },
            { name: 'Jamie Oliver Kuharica', price: 29.99, oldPrice: null, image: 'https://picsum.photos/seed/jamie/80/80', category: 'Knjige', subcategory: 'Kuharice' },
            { name: 'Kindle Paperwhite', price: 139.99, oldPrice: 149.99, image: 'https://picsum.photos/seed/kindle/80/80', category: 'Knjige', subcategory: 'E-čitači' },
        ],

        cartItems: [
            { name: 'Sony WH-1000XM5 Slušalice', price: 349.99, oldPrice: 399.99, qty: 1, image: 'https://picsum.photos/seed/sony/60/60' },
            { name: 'Nike Air Max 90', price: 149.99, oldPrice: null, qty: 1, image: 'https://picsum.photos/seed/nike/60/60' },
        ],

        get cartTotal() {
            return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
        },

        get cartCount() {
            return this.cartItems.reduce((sum, item) => sum + item.qty, 0);
        },

        get searchResults() {
            if (this.searchQuery.length < 2) return [];
            const q = this.searchQuery.toLowerCase();
            return this.products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5);
        },

        getSubcategories(index) {
            return this.categories[index]?.subcategories || [];
        },

        get categoryNames() {
            return this.categories.map(c => c.name);
        },

        getProductSlug(product) {
            const m = product.image.match(/seed\/([^/]+)\//);
            return m ? m[1] : '';
        },

        addToCart(product, qty = 1) {
            const existing = this.cartItems.find(i => i.name === product.name);
            if (existing) {
                existing.qty += qty;
            } else {
                this.cartItems.push({
                    name: product.name,
                    price: product.price,
                    oldPrice: product.oldPrice,
                    qty: qty,
                    image: product.image.replace(/\/\d+\/\d+$/, '/60/60'),
                });
            }
        },
    }
}
