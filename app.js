const form=document.getElementById('customerForm');
const key='customerDetails_v1';
const $=id=>document.getElementById(id);

function getData(){
 return {
  customerName:$('customerName').value.trim(),
  customerNumber:$('customerNumber').value.trim(),
  nomineeName:$('nomineeName').value.trim(),
  nomineeNumber:$('nomineeNumber').value.trim(),
  alternateNumber:$('alternateNumber').value.trim(),
  jobDetails:$('jobDetails').value.trim(),
  monthlyIncome:$('monthlyIncome').value.trim(),
  jobAddress:$('jobAddress').value.trim(),
  residence:document.querySelector('input[name="residence"]:checked')?.value||'Rent',
  customerAddress:$('customerAddress').value.trim(),
  ref1Name:$('ref1Name').value.trim(),
  ref1Number:$('ref1Number').value.trim(),
  ref2Name:$('ref2Name').value.trim(),
  ref2Number:$('ref2Number').value.trim(),
  savedAt:new Date().toLocaleString()
 };
}
function render(){
 const list=JSON.parse(localStorage.getItem(key)||'[]');
 const box=$('savedList'), sec=$('savedSection');
 sec.style.display=list.length?'block':'none';
 box.innerHTML='';
 list.forEach((x,i)=>{
  const d=document.createElement('div'); d.className='card';
  d.innerHTML=`<b>${escapeHtml(x.customerName||'Unnamed customer')}</b><small>${escapeHtml(x.customerNumber||'')} • ${escapeHtml(x.residence||'')}</small><small>Saved: ${escapeHtml(x.savedAt||'')}</small>
  <button class="delete" data-i="${i}">Delete</button>`;
  box.appendChild(d);
 });
 box.querySelectorAll('.delete').forEach(b=>b.onclick=()=>{
   const a=JSON.parse(localStorage.getItem(key)||'[]'); a.splice(+b.dataset.i,1); localStorage.setItem(key,JSON.stringify(a)); render();
 });
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
form.onsubmit=e=>{
 e.preventDefault();
 const a=JSON.parse(localStorage.getItem(key)||'[]'); a.unshift(getData());
 localStorage.setItem(key,JSON.stringify(a));
 alert('Customer details saved on this device.');
 form.reset(); document.querySelector('input[value="Rent"]').checked=true; render();
};
$('clearBtn').onclick=()=>{if(confirm('Clear all entered details?')) form.reset()};
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
render();