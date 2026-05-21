// small interactive behaviors: smooth scroll and active links
(function(){
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(a=>a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const el = document.querySelector(href);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }));

  const sections = Array.from(document.querySelectorAll('section[id]'));
  function onScroll(){
    const y = window.scrollY + 120;
    let current = '';
    for(const s of sections){
      if(s.offsetTop <= y) current = s.id;
    }
    document.querySelectorAll('.nav a').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+current);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();