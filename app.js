// Dialed hero: product stack switches hero product + background scene
const H={
 cake:{img:"assets/cake.webp",bg:"#c10017",name:"Custom Celebration Cake",meta:"Made to order",price:"Price on enquiry"},
 bento:{img:"assets/bento.webp",bg:"#2b95c5",name:"Bento Cake",meta:"Customised",price:"Price on enquiry"},
 cup:{img:"assets/cupcakes.webp",bg:"#671f31",name:"Cupcakes",meta:"Boxes of 4 & 6",price:"Price on enquiry"}
};
function setHero(k,btn){ if(window.resetAuto) resetAuto();
 const d=H[k];if(!d)return;
 const h=document.getElementById('hero'); h.style.background=d.bg; h.classList.add('on-dark');
 document.getElementById('heroImg').src=d.img;
 document.getElementById('buyName').textContent=d.name;
 document.getElementById('buyMeta').textContent=d.meta;
 document.getElementById('buyPrice').textContent=d.price;
 document.querySelectorAll('.selector button').forEach(b=>b.classList.remove('on')); btn.classList.add('on');
 const s=document.getElementById('prod'); if(s) s.value=d.name;
}
function scrollTrack(id,dir){document.getElementById(id).scrollBy({left:dir*340,behavior:'smooth'})}
function closePopup(){document.getElementById('popup').style.display='none'}
function joinList(e){e.preventDefault();e.target.innerHTML='<b>Dialed in. You are on the list!</b>';return false}
function orderWA(e){e.preventDefault();const f=e.target;
 const msg=`Assalam-o-Alaikum The Baker's Basket! I want to order: ${f.prod.value}. Name: ${f.name.value}. Date needed: ${f.date.value}. Details: ${f.msg.value}`;
 window.open('https://wa.me/923215375875?text='+encodeURIComponent(msg),'_blank');return false}
