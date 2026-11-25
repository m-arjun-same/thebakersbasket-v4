// Dialed engine, rebuilt in own code from the traced mirror (DIALED-ENGINE.md):
// Lenis smooth scroll + GSAP ScrollTrigger + preloader + autoplay flavour slider + unmask reveals + cart drawer
(function(){
 // --- inject preloader + cart drawer (Dialed has both on every page) ---
 const pre=document.createElement('div'); pre.id='preloader';
 pre.innerHTML='<div class="pre-logo">The Baker\'s <i>Basket</i></div><div class="pre-word">BAKING IN</div><div class="pre-pct">0%</div><div class="pre-bar"><span></span></div>';
 document.body.prepend(pre);
 const cart=document.createElement('aside'); cart.id='cartDrawer';
 cart.innerHTML='<div class="cart-head"><b>Cart ( <span id="cartCount">0</span> )</b><button onclick="toggleCart(false)" aria-label="Close cart">✕</button></div><div id="cartItems"><p class="cart-empty">Your basket is empty. Time to load up and get baked.</p></div><div class="cart-foot"><p>Prices are confirmed on enquiry — no COD, pickup in Lahore or delivery via Uber car.</p><button class="btn primary" onclick="checkoutWA()">Order on WhatsApp</button></div>';
 document.body.appendChild(cart);
 const shade=document.createElement('div'); shade.id='cartShade'; shade.onclick=()=>toggleCart(false); document.body.appendChild(shade);

 // --- Lenis smooth scroll (Dialed values family: lerp .09) ---
 let lenis=null;
 if(window.Lenis){ lenis=new Lenis({lerp:.09,wheelMultiplier:.95,smoothWheel:true});
   function raf(t){lenis.raf(t);requestAnimationFrame(raf)} requestAnimationFrame(raf); }

 // --- Preloader: count 0->100, bar fills, then slide away + hero unmask ---
 const pct=pre.querySelector('.pre-pct'), bar=pre.querySelector('.pre-bar span');
 let p=0; const iv=setInterval(()=>{ p=Math.min(100,p+Math.random()*14);
   pct.textContent=Math.floor(p)+'%'; bar.style.transform=`scaleX(${p/100})`;
   if(p>=100){ clearInterval(iv); setTimeout(()=>{ pre.classList.add('done'); heroReveal(); setTimeout(()=>pre.remove(),900); },250); } },110);

 // --- Unmask text reveal (Dialed: lines rise out of overflow masks) ---
 document.querySelectorAll('.hero h1, .slide h2, .products h2, .dark h2, .sec h2').forEach(el=>{
   el.querySelectorAll(':scope > *').forEach(n=>n.classList.add('rv'));
   el.classList.add('rv'); });
 function heroReveal(){
   if(!window.gsap) return;
   gsap.fromTo('.hero h1',{yPercent:6,opacity:0},{yPercent:0,opacity:1,duration:1.1,ease:'expo.out'});
   gsap.fromTo('.hero-img',{y:60,opacity:0,scale:.96},{y:'-50%',opacity:1,scale:1,duration:1.2,ease:'expo.out',delay:.15,clearProps:'scale'});
   gsap.fromTo('.buy-card,.selector,.scrolldown',{opacity:0,y:24},{opacity:1,y:0,duration:.9,ease:'expo.out',stagger:.08,delay:.3});
 }
 // --- GSAP ScrollTrigger section reveals + image parallax ---
 if(window.gsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger);
   if(lenis) lenis.on('scroll',ScrollTrigger.update);
   gsap.utils.toArray('.products,.dark,.testi,.faq,.subscribe,.sec,footer').forEach(s=>{
     gsap.fromTo(s,{opacity:0,y:50},{opacity:1,y:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 88%'}}); });
   gsap.utils.toArray('.card').forEach((c,i)=>{
     gsap.fromTo(c,{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:'expo.out',delay:(i%4)*.07,scrollTrigger:{trigger:c,start:'top 92%'}}); });
   gsap.utils.toArray('.dark .bgimg, .slide').forEach(img=>{
     gsap.fromTo(img,{backgroundPosition:'50% 42%'},{backgroundPosition:'50% 58%',ease:'none',scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}}); });
 }
 // --- Hero autoplay slider (Dialed: autoplays, switches flavour + buy card) ---
 const keys=['cake','bento','cup']; let ki=0, timer=null;
 function auto(){ if(!document.getElementById('panel')) return;
   timer=setInterval(()=>{ ki=(ki+1)%keys.length; const b=document.querySelectorAll('.thumbs button')[ki]; if(b) setFlavour(keys[ki],b); },4200); }
 setTimeout(auto,1600);
 window.resetAuto=function(){ if(timer){clearInterval(timer); auto();} };

 // --- Cart (Dialed drawer behaviour; Baker's prices on enquiry, checkout = WhatsApp) ---
 window.cartItems=[];
 window.addToCart=function(name){ const f=window.cartItems.find(i=>i.name===name);
   if(f) f.qty++; else window.cartItems.push({name,qty:1}); renderCart(); toggleCart(true); };
 window.changeQty=function(name,d){ const f=window.cartItems.find(i=>i.name===name); if(!f) return;
   f.qty+=d; if(f.qty<1) window.cartItems=window.cartItems.filter(i=>i.name!==name); renderCart(); };
 window.renderCart=function(){ const box=document.getElementById('cartItems');
   document.getElementById('cartCount').textContent=window.cartItems.reduce((a,i)=>a+i.qty,0); const nc=document.getElementById('navCart'); if(nc) nc.textContent=window.cartItems.reduce((a,i)=>a+i.qty,0);
   box.innerHTML=window.cartItems.length? window.cartItems.map(i=>`<div class="cart-row"><div><b>${i.name}</b><small>Price on enquiry</small></div><div class="qty"><button onclick="changeQty('${i.name}',-1)">−</button>${i.qty}<button onclick="changeQty('${i.name}',1)">+</button></div></div>`).join('')
     : '<p class="cart-empty">Your basket is empty. Time to load up and get baked.</p>'; };
 window.toggleCart=function(open){ document.getElementById('cartDrawer').classList.toggle('open',open);
   document.getElementById('cartShade').classList.toggle('open',open); };
 window.checkoutWA=function(){ if(!window.cartItems.length) return;
   const lines=window.cartItems.map(i=>`- ${i.name} x${i.qty}`).join('\n');
   window.open('https://wa.me/923215375875?text='+encodeURIComponent('Assalam-o-Alaikum The Baker\'s Basket! I want to order:\n'+lines),'_blank'); };
 // Buy Now buttons feed the cart, like Dialed
 document.querySelectorAll('a.btn').forEach(a=>{ if(/Buy Now/i.test(a.textContent)){
   a.addEventListener('click',e=>{ e.preventDefault(); const card=a.closest('.card,.buy-card,.shopcard');
     const name=card? (card.querySelector('h3,b')||{}).textContent : 'Custom Celebration Cake';
     if(name){ window.addToCart(name.trim()); } }); }});
})();

