<a :href="'product.html?slug=' + product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')" class="group bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] card-lift overflow-hidden block h-full">
    <!-- Image -->
    <div class="relative aspect-square bg-light overflow-hidden">
        <img :src="product.image.replace('80/80', '400/400')" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">

        <!-- Badges row (top-left) -->
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
            <template x-if="badge === 'novo'">
                <span class="bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-[var(--radius-full)] uppercase tracking-wider">Novo</span>
            </template>
            <template x-if="badge === 'trending'">
                <span class="bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-[var(--radius-full)]">🔥 Trend</span>
            </template>
            <template x-if="badge === 'ranking'">
                <span class="w-7 h-7 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm shrink-0" x-text="'#' + (badgeIdx + 1)"></span>
            </template>
            <template x-if="product.oldPrice">
                <span class="bg-danger text-white text-xs font-bold px-2.5 py-1 rounded-full" x-text="'-' + Math.round((1 - product.price / product.oldPrice) * 100) + '%'"></span>
            </template>
        </div>

        <!-- Quick actions (top-right) -->
        <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button @click.prevent class="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </button>
            <template x-if="showPreview">
                <button @click.prevent class="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </button>
            </template>
        </div>

        <!-- Add to cart overlay -->
        <div class="card-cart-overlay absolute bottom-0 left-0 right-0 p-3">
            <button @click.prevent class="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
                Dodaj u košaricu
            </button>
        </div>
    </div>

    <!-- Info -->
    <div class="p-4">
        <p class="text-xs text-primary font-semibold uppercase tracking-wider mb-1" x-text="product.category"></p>
        <h3 class="font-heading font-semibold text-dark text-sm leading-snug mb-2 line-clamp-2" x-text="product.name"></h3>
        <div class="flex items-center gap-1 mb-2">
            <template x-for="i in 5">
                <svg class="w-3.5 h-3.5 text-star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </template>
        </div>
        <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-lg text-dark" x-text="product.price.toFixed(2) + ' €'"></span>
            <template x-if="product.oldPrice">
                <span class="text-sm text-muted line-through" x-text="product.oldPrice.toFixed(2) + ' €'"></span>
            </template>
        </div>
    </div>
</a>
