'use strict';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches, active = 'orbit';
const tabs = [...document.querySelectorAll('[data-select]')];
function selectConcept(id, updateHash = true) {
  if (id === 'zvonko') id = 'prism';
  if (!tabs.some(t => t.dataset.select === id)) id = 'orbit';
  active = id;
  document.body.dataset.concept = id;
  document.querySelectorAll('.scene').forEach(s => {s.hidden = s.id !== id; s.classList.toggle('active', s.id === id);});
  tabs.forEach(t => {const selected = t.dataset.select === id;t.setAttribute('aria-selected', selected);t.tabIndex = selected ? 0 : -1;});
  if (updateHash) history.replaceState(null, '', '#' + id);
  requestAnimationFrame(() => worlds.forEach(w => w.resize()));
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectConcept(t.dataset.select));
  t.addEventListener('keydown', e => {
    let next;
    if(e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if(e.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
    if(e.key === 'Home') next = 0;
    if(e.key === 'End') next = tabs.length - 1;
    if(next !== undefined) {e.preventDefault();tabs[next].focus();selectConcept(tabs[next].dataset.select);}
  });
});
const motionButton = document.querySelector('#motion-toggle');
function setMotion(value) {paused=value;document.body.classList.toggle('paused',paused);motionButton.textContent=paused?'▶':'Ⅱ';motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Pokreni animacije':'Pauziraj animacije');}
motionButton.addEventListener('click', () => setMotion(!paused));
reduced.addEventListener('change',e=>setMotion(e.matches));setMotion(paused);
const nav = document.querySelector('.nav'), menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Zatvori navigaciju':'Otvori navigaciju');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#demo-dialog').showModal()));
document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
let storyStep=0;
const story=[['user','POSJETITELJ','Bok! Zanima me izrada web stranice. Mogu li dobiti ponudu?'],['assistant','EZVONKO','Bok! Za ponudu nam treba nekoliko detalja o vašem projektu. Ostavite ime, kontakt i kratki opis pa vam se naš tim može javiti.'],['user','POSJETITELJ','Ja sam Ana. Trebam web za svoj studio. Moj kontakt je ana@example.com.'],['result','UPIT JE SPREMAN ZA TIM','Ana · Izrada web stranice · ana@example.com. Kontakt i kontekst razgovora dostupni su u portalu.']];
const nextButton=document.querySelector('#story-next');
document.querySelectorAll('[data-story]').forEach(b=>b.addEventListener('click',()=>{storyStep=0;document.querySelector('.story-messages').replaceChildren();nextButton.textContent='Pokreni razgovor ↗';document.querySelector('#story-dialog').showModal();}));
nextButton.addEventListener('click',()=>{if(storyStep===story.length){document.querySelector('#story-dialog').close();document.querySelector('#demo-dialog').showModal();return;}const [type,label,content]=story[storyStep++];const message=document.createElement('div');message.className='story-message '+type;const small=document.createElement('small');small.textContent=label;message.append(small,document.createTextNode(content));document.querySelector('.story-messages').append(message);nextButton.textContent=storyStep===story.length?'Želim ovakvog asistenta ↗':'Sljedeći korak ↗';message.scrollIntoView({block:'nearest',behavior:paused?'instant':'smooth'});});
// Analytic 3D sphere with a copper surface, etched contours and studio reflections.
// WebGL is optional: the CSS material remains visible if it is unavailable.
const pointer = {x:0,y:0};
window.addEventListener('pointermove', e => {
  pointer.x = e.clientX / innerWidth - .5;
  pointer.y = e.clientY / innerHeight - .5;
}, {passive:true});
class IntelligenceOrb {
  constructor(canvas) {
    this.canvas=canvas; this.time=0; this.ready=false; this.scene='orbit';
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
    if(!gl) return;
    this.gl=gl;
    const vertex='attribute vec2 a_position; varying vec2 v_uv; void main(){v_uv=a_position;gl_Position=vec4(a_position,0.0,1.0);}';
    const fragment=`precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_pointer;
      float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
      void main(){
        vec2 uv=v_uv*1.15;
        float r=length(uv);
        float radius=.90;
        vec3 warm=vec3(1.0,.34,.055);
        if(r>radius){
          float glow=exp(-(r-radius)*21.0)*.18;
          gl_FragColor=vec4(warm,glow); return;
        }
        float z=sqrt(max(0.0,radius*radius-dot(uv,uv)));
        vec3 n=normalize(vec3(uv,z));
        float angle=u_time*.055+u_pointer.x*.13;
        mat3 ry=mat3(cos(angle),0.,-sin(angle),0.,1.,0.,sin(angle),0.,cos(angle));
        vec3 p=ry*n;
        float contour=p.y*.86+p.x*.28+sin(p.z*3.5+u_time*.06)*.08;
        float groove=pow(.5+.5*sin(contour*115.),24.);
        float fine=pow(.5+.5*sin(contour*360.),8.);
        vec3 light=normalize(vec3(-.7,.8,1.0));
        float diffuse=max(dot(n,light),0.);
        float fresnel=pow(1.-n.z,2.7);
        vec3 reflected=reflect(vec3(0.,0.,-1.),n);
        float softbox=pow(max(dot(reflected,normalize(vec3(-.65,.7,.5))),0.),28.);
        float strip=pow(max(dot(reflected,normalize(vec3(.85,-.1,.3))),0.),38.);
        float band=smoothstep(.035,.075,abs(reflected.x*.65+reflected.y*.5-.38));
        float studio=(1.-band)*pow(max(reflected.z,0.),.4)*.32;
        vec3 copper=vec3(.17,.078,.036);
        vec3 color=copper*(.18+diffuse*.85);
        color+=vec3(1.,.55,.24)*pow(diffuse,4.)*.36;
        color+=vec3(1.,.84,.65)*(softbox*1.5+studio);
        color+=vec3(1.,.40,.10)*strip*.7;
        color+=vec3(.85,.35,.09)*fresnel*.85;
        color*=1.-groove*.44;
        color+=vec3(.38,.15,.055)*groove*(diffuse*.20+fresnel*.7);
        color+=fine*.01;
        color+=(hash(vec3(gl_FragCoord.xy,u_time*.001))-.5)*.014;
        float rim=pow(1.-n.z,10.);
        color+=vec3(1.,.70,.4)*rim*.8;
        float alpha=1.-smoothstep(radius-.012,radius,r);
        gl_FragColor=vec4(pow(color,vec3(.85)),alpha);
      }`;
    const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
    try {
      const program=gl.createProgram();
      gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));
      gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));
      gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Orb shader linking failed');
      gl.useProgram(program);this.program=program;
      const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const a=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
      this.timeUniform=gl.getUniformLocation(program,'u_time');this.pointerUniform=gl.getUniformLocation(program,'u_pointer');
      this.ready=true;this.resize();canvas.parentElement.classList.add('rendered');
    } catch(error) { console.warn('Using the static orb material.',error.message); }
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.ready=false;canvas.parentElement.classList.remove('rendered');});
  }
  resize(){if(!this.ready)return;const r=this.canvas.getBoundingClientRect();if(!r.width)return;const dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=Math.round(r.width*dpr);this.canvas.height=Math.round(r.height*dpr);this.gl.viewport(0,0,this.canvas.width,this.canvas.height);this.draw();}
  draw(){if(!this.ready)return;const gl=this.gl;gl.uniform1f(this.timeUniform,this.time);gl.uniform2f(this.pointerUniform,paused?0:pointer.x,paused?0:pointer.y);gl.drawArrays(gl.TRIANGLES,0,6);}
}
// Perspective-projected optical fibers. The animation is local and makes no requests.
class SignalField {
  constructor(canvas){this.canvas=canvas;this.scene='signal';this.ctx=canvas.getContext('2d');this.time=0;this.pulseAge=9;this.width=0;this.height=0;this.resize();}
  resize(){const r=this.canvas.getBoundingClientRect();if(!r.width||!this.ctx)return;this.width=r.width;this.height=r.height;const dpr=Math.min(devicePixelRatio||1,1.7);this.canvas.width=Math.round(r.width*dpr);this.canvas.height=Math.round(r.height*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);this.draw();}
  pulse(){this.pulseAge=0;this.draw();}
  project(u,v){
    const t=this.time,turn=v+u*.95-t*.65;
    const radius=.12+.39*Math.pow(Math.abs(u),1.18);
    const x=u,y=radius*Math.sin(turn)+Math.sin(u*.9+t*.3)*.08,z=radius*Math.cos(turn);
    const perspective=4.8/(4.8+z);
    const tilt=-.47+(paused?0:pointer.y*.04);
    const scale=Math.min(this.width*.205,this.height*.30);
    return [this.width*.49+(x*Math.cos(tilt)-y*Math.sin(tilt))*scale*perspective,this.height*.39+(x*Math.sin(tilt)+y*Math.cos(tilt))*scale*perspective,z];
  }
  draw(){
    if(!this.width||!this.ctx)return;
    const c=this.ctx,w=this.width,h=this.height;
    c.clearRect(0,0,w,h);
    const aura=c.createRadialGradient(w*.49,h*.39,2,w*.49,h*.39,w*.42);
    aura.addColorStop(0,'#ff671c1c');aura.addColorStop(.3,'#ff75060a');aura.addColorStop(1,'#ff750600');c.fillStyle=aura;c.fillRect(0,0,w,h);
    c.globalCompositeOperation='lighter';
    const rows=w<550?58:82,segments=140;
    for(let row=0;row<rows;row++){
      const v=row/rows*Math.PI*2;
      const front=(1+Math.cos(v-this.time*.65))*.5;
      c.beginPath();
      for(let i=0;i<=segments;i++){
        const u=-2.25+i/segments*4.5;
        const p=this.project(u,v);
        if(i===0)c.moveTo(p[0],p[1]);else c.lineTo(p[0],p[1]);
      }
      const g=c.createLinearGradient(w*.05,h*.8,w*.94,h*.1);
      const alpha=.15+front*.5;
      g.addColorStop(0,'rgba(255,80,4,0)');g.addColorStop(.18,`rgba(245,78,9,${alpha*.45})`);g.addColorStop(.45,`rgba(255,168,90,${alpha})`);g.addColorStop(.55,`rgba(255,222,162,${alpha*.9})`);g.addColorStop(.85,`rgba(255,108,26,${alpha*.65})`);g.addColorStop(1,'rgba(250,74,8,0)');
      c.strokeStyle=g;c.lineWidth=.65+front*.3;c.stroke();
      if(row%14===0){c.strokeStyle=`rgba(255,128,46,${alpha*.14})`;c.lineWidth=3;c.stroke();}
    }
    // A pulse travels through the fibers after channel selection or the pulse button.
    const age=this.pulseAge<2.4?this.pulseAge:(this.time%8>5.6?this.time%8-5.6:9);
    if(age<2.4){
      const u=-2.2+age/2.4*4.4;
      const fade=Math.sin(age/2.4*Math.PI);
      for(let i=0;i<22;i++){
        const p=this.project(u,i/22*Math.PI*2);
        const light=c.createRadialGradient(p[0],p[1],0,p[0],p[1],10);
        light.addColorStop(0,`rgba(255,221,175,${fade*.85})`);light.addColorStop(.15,`rgba(255,156,53,${fade*.6})`);light.addColorStop(1,'rgba(255,88,0,0)');c.fillStyle=light;c.fillRect(p[0]-10,p[1]-10,20,20);
      }
    }
    c.globalCompositeOperation='source-over';
  }
}

const signalField=new SignalField(document.querySelector('#signal-field'));
const contactMachine=new window.ContactMachine(document.querySelector('#contact-canvas'));
const worlds=[new IntelligenceOrb(document.querySelector('#intelligence-orb')),signalField,contactMachine];
document.querySelector('#machine-reset').addEventListener('click',()=>{contactMachine.drag={x:0,y:0};contactMachine.draw();});
document.querySelector('#contact-canvas').addEventListener('keydown',e=>{const steps={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,-.15],ArrowDown:[0,.15]};if(steps[e.key]){e.preventDefault();contactMachine.drag.x+=steps[e.key][0];contactMachine.drag.y+=steps[e.key][1];contactMachine.draw();}});
window.addEventListener('resize',()=>worlds.forEach(w=>w.resize()));
window.addEventListener('hashchange',()=>selectConcept(location.hash.slice(1),false));
selectConcept(location.hash.slice(1)||'contact',false);
let previous=0;
function frame(now){
  if(now-previous>=33){const delta=Math.min((now-previous)/1000,.1);previous=now;
    if(!paused&&!document.hidden){
      for(const world of worlds)if(world.scene===active){world.time+=delta;if(world.pulseAge!==undefined)world.pulseAge+=delta;world.draw();}
      if(active==='prism'){const stage=document.querySelector('.prism-stage');stage.style.setProperty('--tilt',(pointer.x*5).toFixed(2)+'deg');stage.style.setProperty('--lean',(-pointer.y*3).toFixed(2)+'deg');}
    }
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
const features={
  knowledge:['01 / 05','Znanje iz vaših izvora.','Web stranica, dokumenti i cjenici. Vi birate iz čega eZvonko odgovara.'],
  calendar:['02 / 05','Od interesa do termina.','Calendly ili Cal.com otvara se u razgovoru. Korisnik sam odabire slobodan termin.'],
  channels:['03 / 05','Isto znanje. Tri mjesta za razgovor.','Web, e-mail i WhatsApp koriste vašu bazu znanja, uz stil prilagođen svakom kanalu.'],
  leads:['04 / 05','Kontakt, zajedno s kontekstom.','Upiti stižu u portal, a uz integracije i u vaš inbox, Google tablicu ili CRM.'],
  insights:['05 / 05','Znate što je korisnicima važno.','Pregledajte razgovore, nove kontakte i pitanja za koja treba dopuniti bazu znanja.']
};
document.querySelectorAll('[data-feature]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-feature]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
  const [index,title,description]=features[button.dataset.feature];
  document.querySelector('.detail-index').textContent=index;
  document.querySelector('#feature-title').textContent=title;
  document.querySelector('#feature-description').textContent=description;
}));
const channelContent={
  web:['WEB CHAT','„Kako mogu zatražiti ponudu?”','Odgovor iz vaših materijala. Sljedeći korak: ostavite upit.'],
  email:['E-MAIL','„Molim više informacija o vašim uslugama.”','Strukturiran odgovor s informacijama i kontaktom vašeg tima.'],
  whatsapp:['WHATSAPP','„Bok! Mogu li dogovoriti termin?”','Kratak odgovor i upute kako dogovoriti termin.']
};
document.querySelectorAll('[data-channel]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-channel]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  const [caption,question,answer]=channelContent[button.dataset.channel];
  document.querySelector('#channel-caption').textContent=caption;
  document.querySelector('#signal-question').textContent=question;
  document.querySelector('#signal-answer').textContent=answer;
  signalField.pulse();
}));
document.querySelector('#send-pulse').addEventListener('click',()=>signalField.pulse());
const layerContent={
  knowledge:['Temelj je vaše znanje.','Web stranica, cjenici i dokumenti. Samo izvori koje ste vi odabrali.'],
  conversation:['Znanje postaje razgovor.','eZvonko pronalazi odgovor i prilagođava ga korisniku, njegovu jeziku i kanalu.'],
  action:['Razgovor dobiva nastavak.','Prikupljeni kontakt i kontekst upita dostupni su vašem timu u portalu i integracijama.']
};
document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-layer]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('.prism-stage').dataset.activeLayer=button.dataset.layer;
  const [title,description]=layerContent[button.dataset.layer];
  document.querySelector('#layer-title').textContent=title;
  document.querySelector('#layer-description').textContent=description;
}));
document.querySelector('#assembly-toggle').addEventListener('click',()=>{
  const collapsed=document.querySelector('.prism-stage').classList.toggle('collapsed');
  document.querySelector('#assembly-toggle').setAttribute('aria-pressed',String(!collapsed));
  document.querySelector('#assembly-label').textContent=collapsed?'Razdvojite slojeve':'Spojite slojeve';
});
document.querySelectorAll('.nav-parent').forEach(b=>b.addEventListener('click',()=>{const item=b.closest('.nav-item'),open=!item.classList.contains('open');document.querySelectorAll('.nav-item').forEach(n=>{n.classList.remove('open');n.querySelector('button').setAttribute('aria-expanded','false');});item.classList.toggle('open',open);b.setAttribute('aria-expanded',String(open));}));
document.addEventListener('click',e=>{if(!e.target.closest('.nav-item'))document.querySelectorAll('.nav-item').forEach(n=>{n.classList.remove('open');n.querySelector('button').setAttribute('aria-expanded','false');});});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.nav-item').forEach(n=>{n.classList.remove('open');n.querySelector('button').setAttribute('aria-expanded','false');});});
