import{a as w,S as P,i as u}from"./assets/vendor-DV6r_H9s.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();async function m(o){const i=`https://pixabay.com/api/?key=50349576-73448956e16d67ea550d7c551&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`,{data:n}=await w.get(i);return n}const L=document.querySelector(".gallery"),d=document.querySelector(".loading-button");let S=new P(".image-li a",{captionDelay:250,captionsData:"alt"}),p=null;function y(o){const r=o.map(({largeImageURL:i,webformatURL:n,tags:e,likes:t,views:a,comments:M,downloads:q})=>`<li class="image-li">
           <a href="${i}"> 
             <img class="li-img" src="${n}" alt="${e.split(",").slice(0,3).join(",")}" /> 
           </a>
          <div class="div-upper">
            <ul>
              <li><div class="div-inner"><b>Likes</b> ${t}</div></li>
              
              <li><div class="div-inner"><b>Views</b> ${a}</div></li>
              <li><div class="div-inner"><b>Comments</b> ${M}</div></li>
              <li><div class="div-inner"><b>Downloads</b> ${q}</div></li>
            </ul>
          </div>
        </li>`).join("");L.insertAdjacentHTML("beforeend",r),S.refresh()}function $(){L.innerHTML=""}function g(){document.querySelector(".hidden").style.display="flex"}function h(){document.querySelector(".hidden").style.display="none"}d.addEventListener("click",()=>{typeof p=="function"&&(l(),p())});function E(o){p=o}function O(){d.style.display="block"}function l(){d.disabled=!0}function b(){d.disabled=!1}let c="",s=1;const v=40;let f=0;document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector("#search-form");o.addEventListener("submit",async r=>{if(r.preventDefault(),c=o.searchQuery.value.trim(),!!c){s=1,$(),l(),g();try{const i=await m(c,s);if(f=i.totalHits,i.hits.length===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(i.hits),s*v<f?(b(),O()):l()}catch{u.error({message:"Error fetching images. Please try again later.",position:"topRight"})}finally{h()}}}),E(async()=>{s+=1,l(),g();try{const r=await m(c,s);y(r.hits),s*v>=f?l():b()}catch{u.error({message:"Error loading more images.",position:"topRight"})}finally{h()}})});
//# sourceMappingURL=index.js.map
