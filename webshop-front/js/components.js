/**
 * FerShop Component Loader
 * Loads HTML components (header, footer, etc.) into placeholder elements,
 * then initializes Alpine.js after all components are injected.
 *
 * Usage: Add data-include="componentName" to any element.
 * The loader will fetch components/componentName.html and inject its content.
 */
(function () {
    // Resolve base path relative to this script's location
    const scriptTag = document.currentScript;
    const scriptSrc = scriptTag ? scriptTag.src : '';
    const basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/')) + '/';

    async function loadComponent(el) {
        const name = el.getAttribute('data-include');
        if (!name) return;

        try {
            const response = await fetch(basePath + 'components/' + name + '.tpl');
            if (!response.ok) throw new Error('Failed to load component: ' + name);
            const html = await response.text();

            // <template data-include="..."> → store for dynamic use via mountCard()
            if (el.tagName === 'TEMPLATE') {
                window.componentTemplates = window.componentTemplates || {};
                window.componentTemplates[name] = html;
                el.parentNode.removeChild(el);
                return;
            }

            // Regular element → inject HTML directly into DOM
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            while (wrapper.firstChild) {
                el.parentNode.insertBefore(wrapper.firstChild, el);
            }
            el.parentNode.removeChild(el);
        } catch (err) {
            console.error('[FerShop]', err.message);
        }
    }

    async function loadAllComponents() {
        const placeholders = document.querySelectorAll('[data-include]');
        await Promise.all(Array.from(placeholders).map(loadComponent));
    }

    function loadAlpine() {
        return new Promise(function (resolve) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    // Main: wait for DOM, load components, then start Alpine
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    async function init() {
        await loadAllComponents();
        await loadAlpine();
    }
})();
