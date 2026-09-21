<!--
    SHARED HEAD CONTENT
    Copy this block into the <head> of every new page (after <title>).
    This ensures consistent fonts, styles, and theme across all views.
-->

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Text:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Tailwind CSS v4 -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<style type="text/tailwindcss">
    @theme {
        /* ===== COLORS ===== */
        --color-primary: #f65904;
        --color-primary-hover: #9b3803;
        --color-primary-light: #fff0e6;
        --color-primary-superlight: #3662e40a;
        --color-secondary: #322c45;
        --color-secondary-hover: #221d33;
        --color-cream: #fafafa;
        --color-star: #f59e0b;
        --color-accent: #10b981;
        --color-dark: #111827;
        --color-dark-light: #1f2937;
        --color-light: #f9fafb;
        --color-muted: #6b7280;
        --color-muted-light: #9ca3af;
        --color-border: #e5e7eb;
        --color-white: #ffffff;
        --color-danger: #ef4444;

        /* ===== LAYOUT ===== */
        --container-max-width: 1320px;
        --header-height: 64px;

        /* ===== TYPOGRAPHY ===== */
        --font-heading: 'Google Sans', 'Segoe UI', sans-serif;
        --font-body: 'Google Sans Text', 'Google Sans', 'Segoe UI', sans-serif;

        /* ===== SHADOWS ===== */
        --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
        --shadow-md: 0 4px 16px rgba(0,0,0,0.06);
        --shadow-lg: 0 8px 32px rgba(0,0,0,0.08);
        --shadow-dropdown: 0 10px 40px rgba(0,0,0,0.1);
        --shadow-card: 0 1px 3px rgba(0,0,0,0.03);
        --shadow-card-hover: 0 12px 40px rgba(0,0,0,0.1);

        /* ===== BORDER RADIUS ===== */
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 20px;
        --radius-2xl: 24px;
        --radius-full: 9999px;

        /* ===== TRANSITIONS ===== */
        --transition-fast: 150ms ease;
        --transition-base: 250ms ease;
        --transition-slow: 350ms ease;
    }

    body {
        background-color: var(--color-primary-superlight);
    }

    [x-cloak] { display: none !important; }

    /* All interactive elements get pointer cursor */
    button, [role="button"], summary,
    input[type="submit"], input[type="button"], input[type="reset"] {
        cursor: pointer;
    }

    body {
        font-family: var(--font-body);
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
    }

    /* Badge pulse */
    .badge-pulse {
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    /* Modern card hover lift */
    .card-lift {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card-lift:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
    }

    /* Cart overlay slide-up on hover */
    .card-cart-overlay {
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .group:hover .card-cart-overlay {
        transform: translateY(0);
    }

    /* Scrollbar hide for mobile menu */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>

<!-- Shared App Data -->
<script src="js/app.js"></script>
