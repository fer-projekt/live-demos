document.addEventListener('alpine:init', () => {
      Alpine.data('counter', (to = 0, duration = 1600) => ({
        to, shown: 0,
        run() {
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            this.shown = Math.round(this.to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
      }));
    });
