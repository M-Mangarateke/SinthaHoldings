/* ============================================================
   SINTHA HOLDINGS - interactions
   - GSAP + ScrollTrigger for editorial reveals
   - Hero word-split entry
   - Counter ramps
   - Mobile nav
   - WhatsApp brief form router (no backend)
   - Service-row magnetic hover
   - Honors prefers-reduced-motion
   ============================================================ */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* -------------- mobile nav -------------- */
  const nav = document.getElementById('nav');
  const burger = nav && nav.querySelector('.nav__burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close on link tap
    nav.querySelectorAll('.nav__links a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------- hero word split -------------- */
  const splitTitle = document.querySelector('[data-split]');
  if (splitTitle && !reduced) {
    const html = splitTitle.innerHTML;
    const tokens = html.split(/(<[^>]+>|\s+)/).filter(Boolean);
    const wrapped = tokens.map((t) => {
      if (/^\s+$/.test(t)) return t;
      if (/^</.test(t)) return t;
      return `<span class="word"><span>${t}</span></span>`;
    }).join('');
    splitTitle.innerHTML = wrapped;
  }

  /* -------------- entrance animations -------------- */
  if (hasGsap && !reduced) {
    // hero title words
    if (splitTitle) {
      gsap.to(splitTitle.querySelectorAll('.word > span'), {
        y: '0%',
        duration: 1.05,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.15,
      });
    }

    // hero lede and CTA fade in
    gsap.from('.hero__lede', {
      opacity: 0, y: 30,
      duration: 1, ease: 'power2.out', delay: 0.6,
    });
    gsap.from('.hero__ctas', {
      opacity: 0, y: 30,
      duration: 1, ease: 'power2.out', delay: 0.8,
    });
    gsap.from('.hero__counters', {
      opacity: 0, y: 20,
      duration: 0.8, ease: 'power2.out', delay: 1.0,
    });

    // hero video parallax zoom
    const heroBg = document.querySelector('.hero__bg video');
    if (heroBg && hasST) {
      gsap.fromTo(heroBg,
        { scale: 1.1 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        }
      );
    }

    if (hasST) {
      // generic .reveal
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.95, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            onComplete: () => el.classList.add('is-in'),
          }
        );
      });

      // section titles parallax
      document.querySelectorAll('.section__title').forEach((title) => {
        gsap.fromTo(title,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 90%' }
          }
        );
      });

      // big-number callouts ramp up
      document.querySelectorAll('.callout__big').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });

      // log items parallax
      document.querySelectorAll('.log__item').forEach((item) => {
        const img = item.querySelector('.log__img');
        if (!img) return;
        gsap.fromTo(img,
          { scale: 1.12, y: '-3%' },
          {
            scale: 1, y: '3%', ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });

      // about stat blocks stagger
      const aboutStats = document.querySelectorAll('.about__stat');
      if (aboutStats.length) {
        gsap.fromTo(aboutStats,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: '.about__stats', start: 'top 85%' }
          }
        );
      }

      // service rows stagger on scroll
      document.querySelectorAll('.svc').forEach((svc, i) => {
        gsap.fromTo(svc,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: svc, start: 'top 90%' },
            delay: i * 0.05,
          }
        );
      });

      // coverage columns
      document.querySelectorAll('.coverage__col').forEach((col) => {
        gsap.fromTo(col,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: col, start: 'top 88%' }
          }
        );
      });

      // founder section parallax on image
      const founderImg = document.querySelector('.founder__img img');
      if (founderImg) {
        gsap.fromTo(founderImg,
          { scale: 1.08, y: '-2%' },
          {
            scale: 1, y: '2%', ease: 'none',
            scrollTrigger: { trigger: '.founder', start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      }

      // contact panel entrance
      const contactPanel = document.querySelector('.contact-panel');
      if (contactPanel) {
        gsap.fromTo(contactPanel,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: contactPanel, start: 'top 85%' }
          }
        );
      }

      // foot__big slide
      const footBig = document.querySelector('.foot__big');
      if (footBig) {
        gsap.fromTo(footBig,
          { x: '4%' },
          {
            x: '-4%', ease: 'none',
            scrollTrigger: { trigger: footBig, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      }
    }
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* -------------- numeric counter ramps -------------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && hasST && !reduced) {
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      if (isNaN(target)) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: 'power2.out',
        snap: { v: 1 },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          const innerExtras = el.querySelector('span');
          if (innerExtras) {
            el.firstChild && (el.firstChild.nodeValue = String(obj.v));
          } else {
            el.textContent = String(obj.v);
          }
        }
      });
    });
  }

  /* -------------- WhatsApp brief-form router -------------- */
  const PHONE = '27711713425';
  const form = document.getElementById('briefForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const required = ['name', 'phone', 'suburb', 'service', 'message'];
      let valid = true;
      required.forEach((n) => {
        const f = form.elements[n];
        if (!f) return;
        if (!f.value.trim()) {
          f.style.borderBottomColor = '#E63946';
          valid = false;
        } else {
          f.style.borderBottomColor = '';
        }
      });
      if (!valid) {
        const first = form.querySelector('[style*="E63946"]');
        if (first) first.focus();
        return;
      }

      const data = new FormData(form);
      const lines = [
        `Hi Sintha Holdings, new brief from your website.`,
        ``,
        `*Name:* ${data.get('name')}`,
        `*Phone:* ${data.get('phone')}`,
        `*Suburb:* ${data.get('suburb')}`,
        `*Service:* ${data.get('service')}`,
        data.get('when')     ? `*When:* ${data.get('when')}` : null,
        data.get('property') ? `*Property:* ${data.get('property')}` : null,
        ``,
        `*Description:*`,
        `${data.get('message')}`,
      ].filter(Boolean);

      const text = encodeURIComponent(lines.join('\n'));
      const url = `https://wa.me/${PHONE}?text=${text}`;

      const win = window.open(url, '_blank', 'noopener');
      if (!win) {
        window.location.href = url;
      }
    });
  }

  /* -------------- service-row keyboard polish -------------- */
  document.querySelectorAll('.svc').forEach((el) => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  /* -------------- enhanced hover effects -------------- */
  // Log items tilt effect on mouse move
  document.querySelectorAll('.log__item').forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      if (reduced) return;
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      item.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // About stat cards pulse on hover
  document.querySelectorAll('.about__stat').forEach((stat) => {
    stat.addEventListener('mouseenter', () => {
      if (reduced || !hasGsap) return;
      gsap.fromTo(stat.querySelector('.about__stat-num'),
        { scale: 1 },
        { scale: 1.05, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    });
  });

  /* -------------- safety: ensure video doesn't break if missing -------------- */
  document.querySelectorAll('.hero__bg video').forEach((v) => {
    v.addEventListener('error', () => {
      v.style.display = 'none';
      const bg = v.closest('.hero__bg');
      if (bg && !bg.querySelector('img.hero__poster')) {
        const img = document.createElement('img');
        img.className = 'hero__poster';
        img.src = v.getAttribute('poster');
        img.alt = '';
        bg.prepend(img);
      }
    });
    v.addEventListener('loadedmetadata', () => {
      if (!v.videoWidth) v.dispatchEvent(new Event('error'));
    });
  });

})();
