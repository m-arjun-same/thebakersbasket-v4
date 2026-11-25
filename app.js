// Dialed hero: product stack switches hero product + background scene
const H={
 cake:{img:"assets/cake.webp",bg:"#c10017",name:"Custom Celebration Cake",meta:"Made to order",price:"Price on enquiry"},
 bento:{img:"assets/bento.webp",bg:"#2b95c5",name:"Bento Cake",meta:"Customised",price:"Price on enquiry"},
 cup:{img:"assets/cupcakes.webp",bg:"#671f31",name:"Cupcakes",meta:"Boxes of 4 & 6",price:"Price on enquiry"}
};
const FLAV={cake:{bg:'#c10017',name:'Custom Celebration Cake',img:'assets/cake.webp',meta:'Made to order',s:['Made to order','Baked for your date','Customised','Your colours & message','Lahore','Pickup / Uber car','No COD','Confirmed on enquiry']},
bento:{bg:'#2b95c5',name:'Bento Cake',img:'assets/bento.webp',meta:'Customised lunchbox cake',s:['Small & personal','Lunchbox size','Customised','Your colours & message','Lahore','Pickup / Uber car','No COD','Confirmed on enquiry']},
cup:{bg:'#671f31',name:'Cupcakes',img:'assets/cupcakes.webp',meta:'Boxes for every occasion',s:['By the box','Birthday to Eid','Customised','Your colours & message','Lahore','Pickup / Uber car','No COD','Confirmed on enquiry']}};
function setFlavour(k,btn){ const d=FLAV[k]; if(!d) return; if(window.resetAuto) resetAuto();
 document.getElementById('panel').style.background=d.bg;
 document.getElementById('flavName').textContent=d.name;
 document.getElementById('flavImg').src=d.img;
 document.getElementById('buyName').textContent=d.name;
 document.getElementById('buyMeta').textContent=d.meta;
 for(let n=0;n<4;n++){ document.getElementById('spec'+(n+1)).textContent=d.s[n*2]; document.getElementById('spec'+(n+1)).nextElementSibling.textContent=d.s[n*2+1]; }
 document.querySelectorAll('.thumbs button').forEach(b=>b.classList.remove('on')); if(btn) btn.classList.add('on');
 const sel=document.getElementById('prod'); if(sel) sel.value=d.name; }
let qi=0,qTimer=null;
function setQuote(n,btn){ qi=n; document.querySelectorAll('.tq').forEach((q,x)=>q.classList.toggle('on',x===n));
 document.querySelectorAll('.tnav button').forEach((b,x)=>b.classList.toggle('on',x===n)); }

function scrollTrack(id,dir){document.getElementById(id).scrollBy({left:dir*340,behavior:'smooth'})}
function closePopup(){document.getElementById('popup').style.display='none'}
function joinList(e){e.preventDefault();e.target.innerHTML='<b>Dialed in. You are on the list!</b>';return false}
function orderWA(e){e.preventDefault();const f=e.target;
 const msg=`Assalam-o-Alaikum The Baker's Basket! I want to order: ${f.prod.value}. Name: ${f.name.value}. Date needed: ${f.date.value}. Details: ${f.msg.value}`;
 window.open('https://wa.me/923215375875?text='+encodeURIComponent(msg),'_blank');return false}
