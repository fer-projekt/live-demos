<!-- ============================================= -->
<!-- ROW 1: TOP PROMO BAR                          -->
<!-- ============================================= -->
<div x-data="{ show: true }" x-show="show" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="bg-dark text-white">
    <div class="max-w-[var(--container-max-width)] mx-auto px-4 flex items-center justify-between py-2.5">
        <!-- Left: Contact -->
        <div class="hidden md:flex items-center gap-6 text-muted-light text-[13px]">
            <a href="tel:+385911234567" class="flex items-center gap-2.5 hover:text-white transition-colors duration-[var(--transition-fast)]">
                <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                +385 91 123 4567
            </a>
            <a href="mailto:info@fershop.hr" class="flex items-center gap-2.5 hover:text-white transition-colors duration-[var(--transition-fast)]">
                <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                info@fershop.hr
            </a>
        </div>

        <!-- Center: Promo -->
        <div class="flex-1 text-center text-[13px] font-medium tracking-wide">
            <span class="text-primary">&#10038;</span>
            Besplatna dostava za narudžbe iznad <strong class="text-primary">50€</strong>
            <span class="text-primary">&#10038;</span>
        </div>

        <!-- Right: Social + Close -->
        <div class="hidden md:flex items-center gap-5">
            <div class="flex items-center gap-4 text-muted-light">
                <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-white transition-all duration-[var(--transition-fast)]">
                    <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-white transition-all duration-[var(--transition-fast)]">
                    <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-white transition-all duration-[var(--transition-fast)]">
                    <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
            </div>
            <div class="w-px h-5 bg-muted/50"></div>
            <button @click="show = false" class="w-8 h-8 flex items-center justify-center rounded-full text-muted-light hover:bg-white/10 hover:text-white transition-all duration-[var(--transition-fast)]" aria-label="Zatvori">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
    </div>
</div>

<!-- ============================================= -->
<!-- ROW 2: MAIN HEADER                            -->
<!-- ============================================= -->
<header class="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
    <div class="max-w-[var(--container-max-width)] mx-auto px-4">
        <div class="flex items-center justify-between h-[var(--header-height)] gap-4 lg:gap-8">

            <!-- Mobile: Hamburger -->
            <button @click="mobileMenu = !mobileMenu" class="lg:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] hover:bg-light transition-colors duration-[var(--transition-fast)]" aria-label="Menu">
                <svg x-show="!mobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <svg x-show="mobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <!-- Logo -->
            <a href="/" class="flex items-center gap-2 shrink-0">
                <div class="w-9 h-9 bg-primary rounded-[var(--radius-md)] flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <span class="font-heading font-800 text-xl tracking-tight">Fer<span class="text-primary">Shop</span></span>
            </a>

            <!-- Search Bar (Desktop) -->
            <div class="hidden lg:block flex-1 max-w-2xl relative" x-data="{ searchCat: 'Sve kategorije', catOpen: false }">
                <div class="flex w-full rounded-[var(--radius-full)] border-2 border-border focus-within:border-primary transition-colors duration-[var(--transition-base)]">
                    <!-- Category Dropdown Button -->
                    <button @click="catOpen = !catOpen" class="flex items-center gap-2 h-11 px-4 bg-light border-r border-border text-sm font-medium text-muted hover:text-dark transition-colors duration-[var(--transition-fast)] whitespace-nowrap rounded-l-[var(--radius-full)]">
                        <span x-text="searchCat"></span>
                        <svg class="w-4 h-4 transition-transform duration-[var(--transition-fast)]" :class="catOpen && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <!-- Input -->
                    <input type="text" x-model="searchQuery" @focus="searchFocused = true" @blur="setTimeout(() => searchFocused = false, 200)" placeholder="Pretražite proizvode..." class="flex-1 h-11 px-4 text-sm bg-transparent outline-none placeholder:text-muted-light">
                    <!-- Search Button -->
                    <button class="h-11 px-5 bg-primary hover:bg-primary-hover text-white transition-colors duration-[var(--transition-fast)] flex items-center gap-2 rounded-r-[var(--radius-full)]">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </button>
                </div>
                <!-- Category Dropdown List -->
                <div x-show="catOpen" @click.outside="catOpen = false" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-1" class="absolute top-full left-0 mt-2 w-52 bg-white rounded-[var(--radius-lg)] shadow-dropdown border border-border py-2 z-50">
                    <button @click="searchCat = 'Sve kategorije'; catOpen = false" class="w-full text-left px-4 py-2 text-sm hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]" :class="searchCat === 'Sve kategorije' && 'text-primary font-medium'">Sve kategorije</button>
                    <template x-for="cat in categories" :key="cat.slug">
                        <button @click="searchCat = cat.name; catOpen = false" class="w-full text-left px-4 py-2 text-sm hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]" :class="searchCat === cat.name && 'text-primary font-medium'" x-text="cat.name"></button>
                    </template>
                </div>

                <!-- Search Results Dropdown -->
                <div x-show="searchFocused && searchQuery.length >= 2" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-1" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-[var(--radius-lg)] shadow-dropdown border border-border z-50 overflow-hidden">
                    <template x-if="searchResults.length > 0">
                        <div>
                            <div class="px-4 py-2 border-b border-border">
                                <span class="text-xs font-semibold text-muted uppercase tracking-wider">Proizvodi</span>
                            </div>
                            <template x-for="product in searchResults" :key="product.name">
                                <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-light transition-colors duration-[var(--transition-fast)]">
                                    <img :src="product.image" :alt="product.name" class="w-10 h-10 rounded-[var(--radius-md)] object-cover bg-light">
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-dark truncate" x-text="product.name"></p>
                                        <p class="text-xs text-muted" x-text="product.category"></p>
                                    </div>
                                    <div class="text-right shrink-0">
                                        <p class="text-sm font-semibold text-primary" x-text="product.price.toFixed(2) + ' €'"></p>
                                        <p x-show="product.oldPrice" class="text-xs text-muted line-through" x-text="product.oldPrice ? product.oldPrice.toFixed(2) + ' €' : ''"></p>
                                    </div>
                                </a>
                            </template>
                            <a href="#" class="block px-4 py-2.5 text-center text-sm font-semibold text-primary hover:bg-primary-light transition-colors duration-[var(--transition-fast)] border-t border-border">
                                Pogledaj sve rezultate
                            </a>
                        </div>
                    </template>
                    <template x-if="searchResults.length === 0 && searchQuery.length >= 2">
                        <div class="px-4 py-6 text-center">
                            <svg class="w-8 h-8 text-muted-light mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <p class="text-sm text-muted">Nema rezultata za "<span x-text="searchQuery" class="font-medium text-dark"></span>"</p>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Right Icons -->
            <div class="flex items-center gap-1 sm:gap-2">
                <!-- Mobile Search Toggle -->
                <button @click="searchOpen = !searchOpen" class="lg:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] hover:bg-light transition-colors duration-[var(--transition-fast)]" aria-label="Pretraži">
                    <svg class="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>

                <!-- User Account (with dropdown) -->
                <div class="relative" @click.outside="accountOpen = false">
                    <button @click="accountOpen = !accountOpen" class="flex items-center gap-2 px-2 py-2 rounded-[var(--radius-md)] hover:bg-light transition-colors duration-[var(--transition-fast)] group">
                        <svg class="w-5 h-5 text-muted group-hover:text-primary transition-colors duration-[var(--transition-fast)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span class="hidden xl:block text-sm font-medium text-muted group-hover:text-dark transition-colors duration-[var(--transition-fast)]">Račun</span>
                    </button>
                    <!-- Account Dropdown -->
                    <div x-show="accountOpen" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-1" class="absolute top-full right-0 mt-2 w-56 bg-white rounded-[var(--radius-lg)] shadow-dropdown border border-border z-50 overflow-hidden">
                        <div class="p-4 bg-light border-b border-border">
                            <p class="text-sm font-semibold text-dark">Dobrodošli!</p>
                            <p class="text-xs text-muted mt-0.5">Prijavite se za najbolje iskustvo</p>
                        </div>
                        <div class="py-2">
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">
                                <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                                Prijava
                            </a>
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">
                                <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                                Registracija
                            </a>
                        </div>
                        <div class="border-t border-border py-2">
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">
                                <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                                Moje narudžbe
                            </a>
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">
                                <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                                Lista želja
                            </a>
                            <a href="#" class="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">
                                <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                Postavke
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Wishlist -->
                <a href="#" class="relative flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] hover:bg-light transition-colors duration-[var(--transition-fast)] group">
                    <svg class="w-5 h-5 text-muted group-hover:text-primary transition-colors duration-[var(--transition-fast)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    <span class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center badge-pulse">3</span>
                </a>

                <!-- Cart (with dropdown) -->
                <div class="relative" @click.outside="cartOpen = false">
                    <button @click="cartOpen = !cartOpen" class="relative flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-full)] transition-colors duration-[var(--transition-fast)]">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        <span class="hidden sm:block text-sm font-semibold" x-text="cartTotal + ' €'"></span>
                        <span class="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center" x-text="cartCount"></span>
                    </button>
                    <!-- Cart Dropdown -->
                    <div x-show="cartOpen" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-1" class="absolute top-full right-0 mt-2 w-80 bg-white rounded-[var(--radius-lg)] shadow-dropdown border border-border z-50 overflow-hidden">
                        <div class="px-4 py-3 border-b border-border flex items-center justify-between">
                            <span class="text-sm font-semibold text-dark">Košarica</span>
                            <span class="text-xs font-medium text-muted" x-text="cartCount + ' artikala'"></span>
                        </div>
                        <div class="max-h-64 overflow-y-auto">
                            <template x-for="(item, i) in cartItems" :key="i">
                                <div class="flex items-start gap-3 px-4 py-3 border-b border-border last:border-0">
                                    <img :src="item.image" :alt="item.name" class="w-14 h-14 rounded-[var(--radius-md)] object-cover bg-light shrink-0">
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-dark leading-snug" x-text="item.name"></p>
                                        <p class="text-xs text-muted mt-1">Količina: <span x-text="item.qty"></span></p>
                                        <div class="flex items-center gap-2 mt-1">
                                            <span class="text-sm font-semibold text-primary" x-text="item.price.toFixed(2) + ' €'"></span>
                                            <span x-show="item.oldPrice" class="text-xs text-muted line-through" x-text="item.oldPrice ? item.oldPrice.toFixed(2) + ' €' : ''"></span>
                                        </div>
                                    </div>
                                    <button class="shrink-0 w-7 h-7 mt-0.5 flex items-center justify-center rounded-full hover:bg-red-50 text-muted hover:text-danger transition-colors duration-[var(--transition-fast)]">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                        <div class="px-4 py-3 bg-light border-t border-border">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-sm font-medium text-muted">Ukupno:</span>
                                <span class="text-lg font-bold text-dark" x-text="cartTotal + ' €'"></span>
                            </div>
                            <div class="flex gap-2">
                                <a href="#" class="flex-1 text-center py-2.5 text-sm font-semibold border-2 border-border rounded-[var(--radius-full)] text-dark hover:border-primary hover:text-primary transition-colors duration-[var(--transition-fast)]">Košarica</a>
                                <a href="#" class="flex-1 text-center py-2.5 text-sm font-semibold bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-full)] transition-colors duration-[var(--transition-fast)]">Naplata</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Search (Expandable) -->
        <div x-show="searchOpen" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-2" class="lg:hidden pb-3">
            <div class="flex rounded-[var(--radius-full)] border-2 border-primary overflow-hidden">
                <input type="text" x-model="searchQuery" placeholder="Pretražite proizvode..." class="flex-1 h-10 px-4 text-sm bg-transparent outline-none placeholder:text-muted-light">
                <button class="h-10 px-4 bg-primary text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
            </div>
        </div>
    </div>

    <!-- ============================================= -->
    <!-- ROW 3: NAVIGATION BAR                         -->
    <!-- ============================================= -->
    <nav class="hidden lg:block bg-white border-t border-border">
        <div class="max-w-[var(--container-max-width)] mx-auto px-4">
            <div class="flex items-center h-12 gap-0">

                <!-- All Categories (Mega Menu Trigger) -->
                <div class="relative" x-data="{ megaOpen: false }">
                    <button @click="megaOpen = !megaOpen" @keydown.escape="megaOpen = false" class="flex items-center gap-2 h-12 px-5 bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors duration-[var(--transition-fast)]">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        Sve kategorije
                        <svg class="w-4 h-4 transition-transform duration-[var(--transition-fast)]" :class="megaOpen && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>

                    <!-- Mega Menu Dropdown -->
                    <div x-show="megaOpen" @click.outside="megaOpen = false" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-1" class="absolute top-full left-0 w-[900px] bg-white rounded-b-[var(--radius-lg)] shadow-dropdown border border-border border-t-0 z-50">
                        <div class="grid grid-cols-4 gap-0" x-data="{ activeCat: 0 }">
                            <!-- Category List -->
                            <div class="col-span-1 border-r border-border py-2">
                                <template x-for="(cat, index) in categories" :key="cat.slug">
                                    <a href="#" @mouseenter="activeCat = index" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left transition-colors duration-[var(--transition-fast)]" :class="activeCat === index ? 'bg-primary-light text-primary' : 'text-dark hover:bg-light'">
                                        <span x-text="cat.name"></span>
                                        <svg class="w-4 h-4 ml-auto text-muted-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                    </a>
                                </template>
                            </div>

                            <!-- Subcategories (dynamic) -->
                            <div class="col-span-2 p-5">
                                <h4 class="font-heading font-700 text-dark mb-4" x-text="categories[activeCat].name"></h4>
                                <div class="grid grid-cols-2 gap-x-6 gap-y-2">
                                    <template x-for="sub in getSubcategories(activeCat)" :key="sub">
                                        <a href="#" class="text-sm text-muted hover:text-primary transition-colors duration-[var(--transition-fast)] py-1" x-text="sub"></a>
                                    </template>
                                </div>
                                <div class="mt-5 pt-4 border-t border-border">
                                    <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors duration-[var(--transition-fast)]">
                                        Pogledaj sve u <span x-text="categories[activeCat].name" class="ml-1"></span>
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                    </a>
                                </div>
                            </div>

                            <!-- Promo Banner -->
                            <div class="col-span-1 p-4">
                                <div class="relative h-full bg-gradient-to-br from-primary to-primary-hover rounded-[var(--radius-lg)] p-4 flex flex-col justify-end text-white overflow-hidden">
                                    <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                                    <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-6"></div>
                                    <p class="text-xs font-medium text-white/70 uppercase tracking-wider">Posebna ponuda</p>
                                    <p class="font-heading font-700 text-lg mt-1">Do -40% popusta</p>
                                    <p class="text-xs text-white/80 mt-1">Na odabrane kategorije</p>
                                    <a href="#" class="mt-3 inline-flex items-center gap-1 text-xs font-semibold bg-white text-primary px-3 py-1.5 rounded-[var(--radius-full)] hover:bg-light transition-colors duration-[var(--transition-fast)] w-fit">
                                        Kupuj
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Nav Links -->
                <div class="flex items-center h-12 ml-2">
                    <a href="/" class="h-12 flex items-center px-4 text-sm font-semibold text-primary border-b-2 border-primary transition-colors duration-[var(--transition-fast)]">Početna</a>

                    <!-- Shop (Regular Dropdown) -->
                    <div class="relative h-12" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <a href="#" class="h-12 flex items-center gap-1 px-4 text-sm font-medium text-dark hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-[var(--transition-fast)]">
                            Shop
                            <svg class="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </a>
                        <div x-show="open" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0 -translate-y-1" class="absolute top-full left-0 w-48 bg-white rounded-b-[var(--radius-lg)] shadow-dropdown border border-border border-t-0 py-2 z-50">
                            <a href="#" class="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">Svi proizvodi</a>
                            <a href="#" class="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">Novo u ponudi</a>
                            <a href="#" class="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">Akcije</a>
                            <a href="#" class="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">Najprodavanije</a>
                            <a href="#" class="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-primary transition-colors duration-[var(--transition-fast)]">Najbolje ocijenjeno</a>
                        </div>
                    </div>

                    <a href="#" class="h-12 flex items-center px-4 text-sm font-medium text-dark hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-[var(--transition-fast)]">Novo</a>
                    <a href="#" class="h-12 flex items-center px-4 text-sm font-medium text-dark hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-[var(--transition-fast)]">Bestselleri</a>
                    <a href="#" class="h-12 flex items-center px-4 text-sm font-medium text-danger font-semibold border-b-2 border-transparent hover:border-danger transition-colors duration-[var(--transition-fast)]">Akcije</a>
                    <a href="#" class="h-12 flex items-center px-4 text-sm font-medium text-dark hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-[var(--transition-fast)]">Blog</a>
                    <a href="#" class="h-12 flex items-center px-4 text-sm font-medium text-dark hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors duration-[var(--transition-fast)]">Kontakt</a>
                </div>

                <!-- Right side: Free Shipping badge -->
                <div class="ml-auto flex items-center gap-2 text-accent">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                    <span class="text-xs font-semibold">Besplatna dostava</span>
                </div>
            </div>
        </div>
    </nav>
</header>

<!-- ============================================= -->
<!-- MOBILE OFF-CANVAS MENU                        -->
<!-- ============================================= -->
<!-- Overlay -->
<div x-show="mobileMenu" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" @click="mobileMenu = false" class="fixed inset-0 bg-dark/50 z-50 lg:hidden cursor-pointer"></div>

<!-- Sidebar -->
<div x-show="mobileMenu" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="-translate-x-full" x-transition:enter-end="translate-x-0" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="translate-x-0" x-transition:leave-end="-translate-x-full" class="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-50 lg:hidden flex flex-col no-scrollbar overflow-y-auto">

    <!-- Mobile Header -->
    <div class="flex items-center justify-between p-4 border-b border-border">
        <a href="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-[var(--radius-md)] flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </div>
            <span class="font-heading font-800 text-lg">Fer<span class="text-primary">Shop</span></span>
        </a>
        <button @click="mobileMenu = false" class="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-light transition-colors duration-[var(--transition-fast)]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
    </div>

    <!-- Mobile User -->
    <div class="p-4 bg-light border-b border-border">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div>
                <p class="text-sm font-semibold text-dark">Dobrodošli!</p>
                <a href="#" class="text-xs text-primary font-medium">Prijava / Registracija</a>
            </div>
        </div>
    </div>

    <!-- Mobile Nav -->
    <div class="flex-1 py-2" x-data="{ expanded: null }">
        <a href="/" class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary bg-primary-light border-l-3 border-primary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Početna
        </a>

        <!-- Categories expandable -->
        <div>
            <button @click="expanded = expanded === 'cat' ? null : 'cat'" class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-dark hover:bg-light transition-colors duration-[var(--transition-fast)]">
                <span class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                    Kategorije
                </span>
                <svg class="w-4 h-4 text-muted transition-transform duration-[var(--transition-fast)]" :class="expanded === 'cat' && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div x-show="expanded === 'cat'" x-transition class="bg-light">
                <template x-for="cat in categories" :key="cat.slug">
                    <a href="#" class="block px-4 pl-12 py-2.5 text-sm text-muted hover:text-primary transition-colors duration-[var(--transition-fast)]" x-text="cat.name"></a>
                </template>
            </div>
        </div>

        <a href="#" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark hover:bg-light transition-colors duration-[var(--transition-fast)]">
            <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            Shop
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark hover:bg-light transition-colors duration-[var(--transition-fast)]">
            <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
            Novo
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark hover:bg-light transition-colors duration-[var(--transition-fast)]">
            <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            Bestselleri
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-danger hover:bg-red-50 transition-colors duration-[var(--transition-fast)]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>
            Akcije
        </a>

        <div class="border-t border-border mt-2 pt-2">
            <a href="#" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark hover:bg-light transition-colors duration-[var(--transition-fast)]">
                <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                Blog
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark hover:bg-light transition-colors duration-[var(--transition-fast)]">
                <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Kontakt
            </a>
        </div>
    </div>

    <!-- Mobile Footer -->
    <div class="p-4 border-t border-border">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-muted text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                +385 91 123 4567
            </div>
            <div class="flex items-center gap-3 text-muted">
                <a href="#" class="hover:text-primary transition-colors duration-[var(--transition-fast)]"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
                <a href="#" class="hover:text-primary transition-colors duration-[var(--transition-fast)]"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
        </div>
    </div>
</div>
