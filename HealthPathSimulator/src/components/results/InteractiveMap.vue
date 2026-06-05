<script setup>
import { onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
    institution: Object,
    accommodation: Object,
    nearbyPlaces: Array
});

let map = null;

// Dohvati OSRM rutu — weight kontrolira debljinu linije
async function fetchRoute(from, to, color, weight = 4) {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes?.length > 0) {
        const route = data.routes[0];
        const distanceKm = (route.distance / 1000).toFixed(1);

        L.geoJSON(route.geometry, {
            style: { color, weight, opacity: 0.85, dashArray: '8, 6' }
        }).addTo(map);

        return distanceKm;
    }
    return null;
}

// Kreira marker ikonu s bojom i emoji-jem
function createIcon(color, emoji, size = 40) {
    return L.divIcon({
        html: `<div style="
            background:${color};
            width:${size}px;height:${size}px;
            border-radius:50%;
            border:3px solid white;
            box-shadow:0 3px 10px rgba(0,0,0,0.25);
            display:flex;align-items:center;justify-content:center;
            font-size:${size * 0.45}px;
        ">${emoji}</div>`,
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2 + 6)]
    });
}

// Kreira stiliziran popup sadržaj
function createPopup(title, subtitle, detail, color) {
    return `
        <div style="min-width:160px;">
            <div style="
                background:${color};
                margin:-1px -1px 10px -1px;
                padding:8px 12px;
                border-radius:11px 11px 0 0;
            ">
                <p style="color:white;font-weight:700;font-size:13px;margin:0;">${title}</p>
            </div>
            <div style="padding:0 4px 4px;">
                <p style="color:#6b7280;font-size:12px;margin:0 0 4px;">📍 ${subtitle}</p>
                ${detail ? `<p style="color:#374151;font-size:12px;font-weight:600;margin:0;">${detail}</p>` : ''}
            </div>
        </div>`;
}

onMounted(async () => {
    if (!props.institution) return;

    map = L.map('map', { zoomControl: false }).setView([props.institution.lat, props.institution.lng], 15);

    // Tile slojevi
    const layers = {
        'Street':    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }),
        'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; Esri' }),
        'Terrain':   L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; Esri' }),
        'Light':     L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CartoDB' }),
        'Dark':      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CartoDB' }),
    };

    layers['Light'].addTo(map);

    // Zoom kontrole — donje desno
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer switcher — gornje desno
    L.control.layers(layers, null, { position: 'topright' }).addTo(map);

    // Recenter gumb — gornje lijevo
    const RecenterControl = L.Control.extend({
        onAdd() {
            const btn = L.DomUtil.create('button', 'recenter-btn');
            btn.innerHTML = '🎯';
            btn.title = 'Center on hospital';
            L.DomEvent.on(btn, 'click', () => {
                map.setView([props.institution.lat, props.institution.lng], 15);
            });
            return btn;
        }
    });
    new RecenterControl({ position: 'topleft' }).addTo(map);

    // --- BOLNICA (pulsirajući marker, najveći) ---
    const hospitalIcon = L.divIcon({
        html: `
            <div style="position:relative;width:60px;height:60px;display:flex;align-items:center;justify-content:center;">
                <div class="hospital-pulse-ring"></div>
                <div style="
                    background:#3b82f6;width:44px;height:44px;
                    border-radius:50%;border:3px solid white;
                    box-shadow:0 3px 12px rgba(59,130,246,0.5);
                    display:flex;align-items:center;justify-content:center;
                    font-size:20px;position:relative;z-index:1;
                ">🏥</div>
            </div>`,
        className: '',
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [0, -36]
    });

    const hospitalMarker = L.marker([props.institution.lat, props.institution.lng], { icon: hospitalIcon, zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(createPopup(props.institution.name, props.institution.address, `⭐ ${props.institution.rating} · €${props.institution.price}`, '#3b82f6'), { maxWidth: 220 })
        .bindTooltip(props.institution.name.length > 22 ? props.institution.name.slice(0, 22) + '…' : props.institution.name, {
            permanent: true, direction: 'top', className: 'map-label', offset: [0, -34]
        });

    hospitalMarker.on('mouseover', () => hospitalMarker.openPopup());
    hospitalMarker.on('mouseout', () => hospitalMarker.closePopup());

    // --- SMJEŠTAJ ---
    if (props.accommodation?.lat) {
        const accommodationColor = '#ec4899';
        const distanceKm = await fetchRoute(props.institution, props.accommodation, accommodationColor, 4);

        const hotelMarker = L.marker([props.accommodation.lat, props.accommodation.lng], {
            icon: createIcon(accommodationColor, '🏨', 38), zIndexOffset: 900
        })
            .addTo(map)
            .bindPopup(createPopup(
                props.accommodation.name,
                props.accommodation.address,
                distanceKm ? `🚗 ${distanceKm} km by road` : `🏥 ${props.accommodation.distanceToHospital} km`,
                accommodationColor
            ), { maxWidth: 220 })
            .bindTooltip(props.accommodation.name.length > 20 ? props.accommodation.name.slice(0, 20) + '…' : props.accommodation.name, {
                permanent: true, direction: 'top', className: 'map-label', offset: [0, -26]
            });

        hotelMarker.on('mouseover', () => hotelMarker.openPopup());
        hotelMarker.on('mouseout', () => hotelMarker.closePopup());
    }

    // --- OBLIŽNJE LOKACIJE (manji markeri, tanje linije) ---
    if (props.nearbyPlaces?.length) {
        for (const place of props.nearbyPlaces) {
            fetchRoute(props.institution, place, place.color, 2);

            const placeMarker = L.marker([place.lat, place.lng], { icon: createIcon(place.color, place.icon, 30) })
                .addTo(map)
                .bindPopup(createPopup(place.name, place.address, `📏 ${place.distance} from hospital`, place.color), { maxWidth: 200 });

            placeMarker.on('mouseover', () => placeMarker.openPopup());
            placeMarker.on('mouseout', () => placeMarker.closePopup());
        }
    }
});

onUnmounted(() => {
    if (map) map.remove();
});
</script>

<template>
    <div class="bg-white rounded-2xl p-6 mb-4 shadow-sm">

        <!-- Naslov -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span class="text-blue-500 text-lg">🗺️</span>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-800">Interactive Location Map</h3>
                    <p class="text-gray-400 text-sm">All your important locations in one place</p>
                </div>
            </div>

            <!-- Google Maps gumb — u headeru -->
            <a v-if="institution && accommodation"
                :href="`https://www.google.com/maps/dir/${institution.lat},${institution.lng}/${accommodation.lat},${accommodation.lng}`"
                target="_blank"
                class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors shadow-sm">
                <span>↗</span> Open in Google Maps
            </a>
        </div>

        <!-- Stats traka -->
        <div v-if="institution" class="grid grid-cols-3 gap-3 mb-3">
            <div class="bg-blue-50 rounded-xl p-3 flex items-center gap-2">
                <span class="text-xl">🏥</span>
                <div>
                    <p class="text-xs text-gray-400">Medical Center</p>
                    <p class="text-xs font-semibold text-blue-700 truncate max-w-[100px]">{{ institution.city }}</p>
                </div>
            </div>
            <div class="bg-pink-50 rounded-xl p-3 flex items-center gap-2">
                <span class="text-xl">🏨</span>
                <div>
                    <p class="text-xs text-gray-400">Accommodation</p>
                    <p class="text-xs font-semibold text-pink-600 truncate max-w-[100px]">{{ accommodation?.name ?? '—' }}</p>
                </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                <span class="text-xl">📍</span>
                <div>
                    <p class="text-xs text-gray-400">Nearby Places</p>
                    <p class="text-xs font-semibold text-gray-700">{{ nearbyPlaces?.length ?? 0 }} locations</p>
                </div>
            </div>
        </div>

        <!-- Mapa -->
        <div id="map" class="w-full rounded-xl overflow-hidden" style="height: 420px;"></div>

        <!-- Legenda -->
        <div class="flex flex-wrap gap-3 mt-3">
            <div class="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Medical Center
            </div>
            <div class="flex items-center gap-1.5 bg-pink-50 text-pink-600 text-xs font-medium px-3 py-1.5 rounded-full">
                <span class="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block"></span>Accommodation
            </div>
            <div class="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>Pharmacy
            </div>
            <div class="flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1.5 rounded-full">
                <span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>Restaurant
            </div>
            <div class="flex items-center gap-1.5 bg-purple-50 text-purple-600 text-xs font-medium px-3 py-1.5 rounded-full">
                <span class="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>Grocery
            </div>
        </div>

    </div>
</template>

<style>
/* Pulse animacija bolnice */
@keyframes hospitalPulse {
    0%   { transform: scale(1); opacity: 0.55; }
    100% { transform: scale(2.6); opacity: 0; }
}
.hospital-pulse-ring {
    position: absolute;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: #3b82f6;
    animation: hospitalPulse 2s ease-out infinite;
}

/* Labele ispod markera */
.map-label {
    background: white !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 6px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #374151 !important;
    padding: 3px 7px !important;
    white-space: nowrap;
}
.map-label::before { display: none !important; }

/* Stiliziran popup */
.leaflet-popup-content-wrapper {
    border-radius: 14px !important;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
    padding: 0 !important;
    overflow: hidden;
    border: 1px solid #f3f4f6;
}
.leaflet-popup-content {
    margin: 0 !important;
}
.leaflet-popup-tip-container {
    margin-top: -1px;
}

/* Recenter gumb */
.recenter-btn {
    width: 34px; height: 34px;
    background: white;
    border: 2px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    margin-top: 8px;
    transition: background 0.2s;
}
.recenter-btn:hover { background: #f0f9ff; }

/* Sakrij default Leaflet zoom na originalnoj poziciji */
.leaflet-top.leaflet-left .leaflet-control-zoom { display: none; }
</style>
