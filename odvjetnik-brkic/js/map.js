// Leaflet karta — inicijalizira svaki element s atributom data-map
document.querySelectorAll('[data-map]').forEach(function(el){
  var pos=[44.1152,15.2262];
  var map=L.map(el,{scrollWheelZoom:false}).setView(pos,16);
  L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap'}).addTo(map);
  L.marker(pos,{icon:L.divIcon({className:'',iconSize:[30,37],iconAnchor:[15,37],tooltipAnchor:[0,-38],html:'<div class="w-[30px] h-[30px] flex items-center justify-center bg-navy-900 border-2 border-gold-500 rounded-[50%_50%_50%_0] -rotate-45 shadow-lg"><span class="w-2 h-2 rounded-full bg-gold-400"></span></div>'})}).addTo(map).bindTooltip('Odvjetnički ured Brkić — Široka ulica 14',{direction:'top'});
});
