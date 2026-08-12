/* ============================================================
   JustPaving — shared main.js (used by every page)
   Renders data-driven sections (only where their container
   exists on the current page) + all UI behaviour.
   Requires jQuery (loaded before this file).
   ============================================================ */
(function ($) {
  "use strict";

  /* ---------------- Data ---------------- */
  var CATS = [
    {n:"Porcelain Slabs",g:"Porcelain",i:"fa-layer-group",img:"https://images.unsplash.com/photo-1706629503571-c165023a7792?auto=format&fit=crop&w=1200&q=80",x:"Large-format porcelain slabs with book-matched veining for seamless luxury surfaces."},
    {n:"Porcelain Pavers",g:"Porcelain",i:"fa-border-all",img:"https://images.unsplash.com/photo-1777370504608-812d79861b20?auto=format&fit=crop&w=1200&q=80",x:"20mm structural pavers engineered for driveways, patios and high-traffic terraces."},
    {n:"Outdoor Porcelain",g:"Porcelain",i:"fa-sun",img:"https://images.unsplash.com/photo-1777370504605-1d771522172b?auto=format&fit=crop&w=1200&q=80",x:"Frost-proof, anti-slip R11 finishes designed for British weather and garden living."},
    {n:"Indoor Porcelain",g:"Porcelain",i:"fa-house",img:"https://images.unsplash.com/photo-1706629503586-2731f65587ae?auto=format&fit=crop&w=1200&q=80",x:"Polished and matt indoor tiles that echo marble, concrete and stone in fine detail."},
    {n:"Natural Stone",g:"Natural Stone",i:"fa-mountain",img:"https://images.unsplash.com/photo-1603369425250-b276f2006ec0?auto=format&fit=crop&w=1200&q=80",x:"Ethically sourced natural stone, each slab a one-of-a-kind statement of the earth."},
    {n:"Marble",g:"Natural Stone",i:"fa-gem",img:"https://images.unsplash.com/photo-1554296048-b59c9fca4857?auto=format&fit=crop&w=1200&q=80",x:"Carrara, Calacatta and statuario marble for timeless, sculptural interiors."},
    {n:"Granite",g:"Natural Stone",i:"fa-cube",img:"https://images.unsplash.com/photo-1550053808-52a75a05955d?auto=format&fit=crop&w=1200&q=80",x:"Dense, hard-wearing granite worktops and surfaces built to last generations."},
    {n:"Limestone",g:"Natural Stone",i:"fa-stroopwafel",img:"https://images.unsplash.com/photo-1768544582207-9238e7a3874b?auto=format&fit=crop&w=1200&q=80",x:"Soft, warm limestone tones that bring a calm, organic elegance to any space."},
    {n:"Sandstone",g:"Natural Stone",i:"fa-water",img:"https://images.unsplash.com/photo-1777370504608-812d79861b20?auto=format&fit=crop&w=1200&q=80",x:"Riven and honed sandstone paving with rich, earthy character for gardens."},
    {n:"Travertine",g:"Natural Stone",i:"fa-th-large",img:"https://images.unsplash.com/photo-1661107259637-4e1c55462428?auto=format&fit=crop&w=1200&q=80",x:"Filled and honed travertine, a Mediterranean classic for pools and living areas."},
    {n:"Slate",g:"Natural Stone",i:"fa-clone",img:"https://images.unsplash.com/photo-1777370504743-c009e0d92465?auto=format&fit=crop&w=1200&q=80",x:"Deep, textured slate with natural cleft surfaces and dramatic dark tones."},
    {n:"Quartz",g:"Natural Stone",i:"fa-diamond",img:"https://images.unsplash.com/photo-1551554781-c46200ea959d?auto=format&fit=crop&w=1200&q=80",x:"Engineered quartz surfaces — non-porous, consistent and effortlessly clean."},
    {n:"Wall Cladding",g:"Finishing",i:"fa-grip",img:"https://images.unsplash.com/photo-1536501483244-925da0b87089?auto=format&fit=crop&w=1200&q=80",x:"Sculptural stone cladding panels that transform façades and feature walls."},
    {n:"Coping Stones",g:"Finishing",i:"fa-ruler-combined",img:"https://images.unsplash.com/photo-1777370364601-8a664847abcb?auto=format&fit=crop&w=1200&q=80",x:"Precision-cut coping to crown walls, pools and steps with a crisp finish."},
    {n:"Steps & Edging",g:"Finishing",i:"fa-stairs",img:"https://images.unsplash.com/photo-1775308959953-3a7fc6e76a5c?auto=format&fit=crop&w=1200&q=80",x:"Bullnose steps, corners and edging to complete a flawless landscape scheme."},
    {n:"Accessories",g:"Finishing",i:"fa-toolbox",img:"https://images.unsplash.com/photo-1599031628962-1f6755a3b1b5?auto=format&fit=crop&w=1200&q=80",x:"Adhesives, sealers, grout and installation essentials from trusted brands."}
  ];
  var WHY = [
    {i:"fa-award",t:"25+ Years of Expertise",d:"A quarter century sourcing and supplying premium stone and porcelain."},
    {i:"fa-earth-europe",t:"Directly Sourced",d:"Relationships with the finest quarries and factories across Europe and beyond."},
    {i:"fa-gem",t:"Uncompromising Quality",d:"Every slab hand-inspected for tone, veining and structural integrity."},
    {i:"fa-handshake-angle",t:"Trade & Retail",d:"Dedicated account managers for architects, developers and homeowners alike."}
  ];
  var STATS = [{n:25,s:"+",l:"Years of Experience"},{n:4200,s:"+",l:"Projects Completed"},{n:160,s:"+",l:"Stone & Porcelain Ranges"},{n:98,s:"%",l:"Client Satisfaction"}];
  var PROJECTS = [
    {t:"Kensington Townhouse",ty:"Residential Interior",loc:"London, UK",img:"https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",d:"Full-floor Calacatta porcelain with book-matched feature walls across a Grade II townhouse."},
    {t:"Riverside Terrace",ty:"Landscape & Paving",loc:"Richmond, UK",img:"https://images.unsplash.com/photo-1777370504605-1d771522172b?auto=format&fit=crop&w=1200&q=80",d:"600m² of 20mm outdoor porcelain pavers with matching coping and step treads."},
    {t:"The Monolith Offices",ty:"Commercial Façade",loc:"Manchester, UK",img:"https://images.unsplash.com/photo-1536501483244-925da0b87089?auto=format&fit=crop&w=1200&q=80",d:"Ventilated stone cladding system spanning a 9-storey commercial headquarters."},
    {t:"Spa & Wellness Retreat",ty:"Hospitality",loc:"Bath, UK",img:"https://images.unsplash.com/photo-1610178167104-488495443e01?auto=format&fit=crop&w=1200&q=80",d:"Honed travertine and terrazzo throughout a luxury destination spa."},
    {t:"Hillside Villa",ty:"Residential Exterior",loc:"Surrey, UK",img:"https://images.unsplash.com/photo-1775308959953-3a7fc6e76a5c?auto=format&fit=crop&w=1200&q=80",d:"Limestone façade, poolside coping and grand external staircase in natural stone."},
    {t:"Gallery Penthouse",ty:"Residential Interior",loc:"London, UK",img:"https://images.unsplash.com/photo-1600421495550-158936f5ecfa?auto=format&fit=crop&w=1200&q=80",d:"Marble feature wall and mirror-polished porcelain floors for a riverside penthouse."}
  ];
  var GALLERY = [
    "https://images.unsplash.com/photo-1648881806148-e5c51179c826","https://images.unsplash.com/photo-1706629503577-0f7da8b30aca",
    "https://images.unsplash.com/photo-1554296048-b59c9fca4857","https://images.unsplash.com/photo-1642755623141-23b3cb4284aa",
    "https://images.unsplash.com/photo-1551554781-c46200ea959d","https://images.unsplash.com/photo-1521783593447-5702b9bfd267",
    "https://images.unsplash.com/photo-1600421495550-158936f5ecfa","https://images.unsplash.com/photo-1768544582207-9238e7a3874b",
    "https://images.unsplash.com/photo-1777370504608-812d79861b20","https://images.unsplash.com/photo-1610178167104-488495443e01",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c","https://images.unsplash.com/photo-1550053808-52a75a05955d"
  ];
  var TESTI = [
    {nm:"Eleanor Whitfield",rl:"Interior Architect",q:"The book-matched porcelain JustPaving supplied elevated the entire project. Faultless quality and service from sample to site."},
    {nm:"Marcus Doyle",rl:"Property Developer",q:"Reliable lead times and genuinely premium stock. They are now our first call for every residential scheme we deliver."},
    {nm:"Priya Nair",rl:"Homeowner",q:"From the showroom visit to installation advice, the team made choosing our travertine terrace effortless and enjoyable."}
  ];
  var BRANDS = ["Florim","Marazzi","Iris Ceramica","Laminam","Cotto d'Este","Levantina"];
  var SERVICES = [
    {i:"fa-ruler-combined",t:"Design Consultation",d:"One-to-one guidance from our specifiers to match the perfect material to your project."},
    {i:"fa-cut",t:"Bespoke Cutting",d:"CNC water-jet and bridge-saw fabrication for precise, made-to-measure pieces."},
    {i:"fa-truck-fast",t:"Nationwide Delivery",d:"Insured, palletised delivery across the UK with careful crating for every slab."},
    {i:"fa-trowel-bricks",t:"Installation Support",d:"Approved-installer network and technical fixing advice for a flawless finish."},
    {i:"fa-vault",t:"Sample Service",d:"Order full-size samples to see colour, texture and finish in your own light."},
    {i:"fa-shield-halved",t:"Aftercare & Sealing",d:"Sealing, maintenance kits and lifetime advice to protect your investment."}
  ];
  var BLOG = [
    {t:"Porcelain vs Natural Stone: Choosing for the British Climate",dt:"12 May 2026",c:"Guides",img:"https://images.unsplash.com/photo-1777370504605-1d771522172b?auto=format&fit=crop&w=900&q=80",x:"Frost resistance, maintenance and cost — a practical breakdown to help you specify with confidence."},
    {t:"2026 Surface Trends: Warm Minimalism & Big Format",dt:"28 Apr 2026",c:"Trends",img:"https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",x:"Why large-format slabs and soft, tonal palettes are defining luxury interiors this year."},
    {t:"How to Seal & Maintain Travertine Paving",dt:"09 Apr 2026",c:"Aftercare",img:"https://images.unsplash.com/photo-1661107259637-4e1c55462428?auto=format&fit=crop&w=900&q=80",x:"A step-by-step aftercare routine to keep your natural stone looking pristine for decades."}
  ];
  var FAQS = [
    {q:"Do you supply to both trade and homeowners?",a:"Yes. We work with architects, designers, developers and private clients. Trade accounts receive dedicated pricing and account management."},
    {q:"Can I order samples before committing?",a:"Absolutely. We offer full-size and cut samples so you can assess colour, finish and texture in your own space and light."},
    {q:"Do you offer installation?",a:"We supply materials and provide detailed fixing guidance, plus an approved-installer network we can recommend in your area."},
    {q:"Is your outdoor porcelain suitable for UK winters?",a:"All outdoor ranges are frost-proof, low-porosity and tested to R11 anti-slip standards for year-round performance."},
    {q:"What are your typical lead times?",a:"Stocked ranges are usually dispatched within 3–5 working days. Bespoke and imported items vary — we confirm timings on quotation."},
    {q:"How is delivery handled?",a:"Orders are palletised, crated and delivered nationwide by insured carriers. Slabs are secured on A-frames for safe transit."}
  ];

  /* ---------------- Render (only if container present) ---------------- */
  function render() {
    var $pg = $('#prodGrid');
    if ($pg.length) CATS.forEach(function (c, i) {
      $pg.append('<a class="cat-card reveal prod-item d' + ((i % 4) + 1) + '" data-group="' + c.g + '" href="contact.html">' +
        '<img src="' + c.img + '" alt="' + c.n + '" loading="lazy">' +
        '<div class="cc-body"><div class="cc-icon"><i class="fa-solid ' + c.i + '"></i></div>' +
        '<h3>' + c.n + '</h3><p>' + c.x + '</p><span class="cc-link">Enquire now <i class="fa-solid fa-arrow-right"></i></span></div></a>');
    });
    // Featured categories on home (4)
    var $fg = $('#featGrid');
    if ($fg.length) [0,2,5,9].forEach(function (idx, i) {
      var c = CATS[idx];
      $fg.append('<a class="cat-card reveal d' + (i + 1) + '" href="products.html">' +
        '<img src="' + c.img + '" alt="' + c.n + '" loading="lazy">' +
        '<div class="cc-body"><div class="cc-icon"><i class="fa-solid ' + c.i + '"></i></div>' +
        '<h3>' + c.n + '</h3><p>' + c.x + '</p><span class="cc-link">View collection <i class="fa-solid fa-arrow-right"></i></span></div></a>');
    });
    var $wg = $('#whyGrid');
    if ($wg.length) WHY.forEach(function (w, i) { $wg.append('<div class="why-card reveal d' + (i + 1) + '"><div class="why-ic"><i class="fa-solid ' + w.i + '"></i></div><h3>' + w.t + '</h3><p>' + w.d + '</p></div>'); });
    var $sg = $('#statGrid');
    if ($sg.length) STATS.forEach(function (s) { $sg.append('<div class="stat reveal"><div class="n" data-count="' + s.n + '" data-suffix="' + s.s + '">0</div><div class="l">' + s.l + '</div></div>'); });
    var $prg = $('#projGrid');
    if ($prg.length) { var pl = $prg.data('limit') || PROJECTS.length; PROJECTS.slice(0, pl).forEach(function (p, i) { $prg.append('<div class="proj-card reveal d' + ((i % 3) + 1) + '"><img src="' + p.img + '" alt="' + p.t + '" loading="lazy"><div class="proj-body"><span>' + p.ty + '</span><h3>' + p.t + '</h3><div class="loc"><i class="fa-solid fa-location-dot"></i>' + p.loc + '</div><div class="pd">' + p.d + '</div></div></div>'); }); }
    var $gg = $('#galGrid');
    if ($gg.length) { var gl = $gg.data('limit') || GALLERY.length; GALLERY.slice(0, gl).forEach(function (g, i) { var full = g + '?auto=format&fit=crop&w=1600&q=80', thumb = g + '?auto=format&fit=crop&w=900&q=80'; $gg.append('<div class="g-item ' + ((i === 0 || i === 5) ? 'tall' : '') + '" data-full="' + full + '"><img src="' + thumb + '" alt="Gallery image ' + (i + 1) + '" loading="lazy"><div class="g-ov"><i class="fa-solid fa-magnifying-glass-plus"></i></div></div>'); }); }
    var $tg = $('#testiGrid');
    if ($tg.length) TESTI.forEach(function (t, i) { $tg.append('<div class="testi-card reveal d' + (i + 1) + '"><div class="qmark">&ldquo;</div><div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div><p>' + t.q + '</p><div class="testi-who"><div class="av">' + t.nm.charAt(0) + '</div><div><div class="nm">' + t.nm + '</div><div class="rl">' + t.rl + '</div></div></div></div>'); });
    var $bg = $('#brandGrid');
    if ($bg.length) BRANDS.forEach(function (b) { $bg.append('<div class="brand-chip">' + b + '</div>'); });
    var $sv = $('#servGrid');
    if ($sv.length) SERVICES.forEach(function (s, i) { $sv.append('<div class="why-card reveal d' + ((i % 3) + 1) + '"><div class="why-ic"><i class="fa-solid ' + s.i + '"></i></div><h3>' + s.t + '</h3><p>' + s.d + '</p></div>'); });
    var $blg = $('#blogGrid');
    if ($blg.length) BLOG.forEach(function (p, i) { $blg.append('<article class="prod-card reveal d' + ((i % 3) + 1) + '"><div class="prod-media"><span class="prod-tag">' + p.c + '</span><img src="' + p.img + '" alt="' + p.t + '" loading="lazy"></div><div class="prod-body"><span><i class="fa-regular fa-calendar"></i> ' + p.dt + '</span><h3 style="font-size:1.2rem;line-height:1.25">' + p.t + '</h3><p style="color:var(--muted);font-size:.94rem;margin-top:.6rem">' + p.x + '</p></div><div class="prod-foot"><a href="#">Read article <i class="fa-solid fa-arrow-right"></i></a></div></article>'); });
    var $fl = $('#faqList');
    if ($fl.length) FAQS.forEach(function (f, i) { $fl.append('<div class="acc-item ' + (i === 0 ? 'open' : '') + '"><div class="acc-q"><span>' + f.q + '</span><i class="fa-solid fa-plus"></i></div><div class="acc-a"><p>' + f.a + '</p></div></div>'); });
    $('#yr').text(new Date().getFullYear());
    $('#waTime').text(('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2));
  }
  render();

  /* ---------------- Preloader (jQuery-independent fallback also in <head>) ---------------- */
  $(window).on("load", function () { $("#preloader").addClass("hidden"); });
  setTimeout(function () { $("#preloader").addClass("hidden"); }, 1800);

  /* ---------------- Behaviour ---------------- */
  $(function () {
    var $header = $("header.site-header");
    function onScroll() { var y = $(window).scrollTop(); $header.toggleClass("scrolled", y > 40); $("#toTop").toggleClass("show", y > 500); }
    $(window).on("scroll", onScroll); onScroll();

    var $heroBg = $(".hero-bg img");
    if ($heroBg.length) $(window).on("scroll", function () { var y = $(window).scrollTop(); $heroBg.css("transform", "translateY(" + y * 0.28 + "px) scale(1.05)"); });

    var rev = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12 }); rev.forEach(function (el) { io.observe(el); }); }
    else rev.forEach(function (el) { el.classList.add("in"); });

    function counter($el) { var target = +$el.data("count"), suffix = $el.data("suffix") || "", dur = 1600, start = null; function step(ts) { if (!start) start = ts; var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3), val = Math.floor(eased * target); $el.text(val.toLocaleString() + suffix); if (p < 1) requestAnimationFrame(step); else $el.text(target.toLocaleString() + suffix); } requestAnimationFrame(step); }
    var cs = document.querySelectorAll("[data-count]");
    if (cs.length && "IntersectionObserver" in window) { var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { counter($(e.target)); cio.unobserve(e.target); } }); }, { threshold: 0.5 }); cs.forEach(function (el) { cio.observe(el); }); }

    function openD() { $(".mobile-drawer,.md-overlay").addClass("open"); $("body").css("overflow", "hidden"); }
    function closeD() { $(".mobile-drawer,.md-overlay").removeClass("open"); $("body").css("overflow", ""); }
    $("#burger").on("click", openD); $("#drawerClose,.md-overlay").on("click", closeD);
    $(".md-toggle").on("click", function () { $(this).next(".md-sub").toggleClass("open"); $(this).find(".fa-plus,.fa-minus").toggleClass("fa-plus fa-minus"); });

    $(document).on("click", ".g-item", function () { $("#lbImg").attr("src", $(this).data("full") || $(this).find("img").attr("src")); $("#lightbox").addClass("open"); });
    $("#lbClose,#lightbox").on("click", function (e) { if (e.target.id === "lightbox" || e.target.id === "lbClose") $("#lightbox").removeClass("open"); });
    $(document).on("keyup", function (e) { if (e.key === "Escape") $("#lightbox").removeClass("open"); });

    $(document).on("click", ".acc-q", function () { var $it = $(this).closest(".acc-item"); $it.toggleClass("open").siblings().removeClass("open"); });

    $(document).on("click", ".filter-btn", function () { $(".filter-btn").removeClass("active btn-dark").addClass("btn-outline"); $(this).addClass("active btn-dark").removeClass("btn-outline"); var f = $(this).data("filter"); $(".prod-item").each(function () { $(this).css("display", (f === "all" || $(this).data("group") === f) ? "" : "none"); }); });

    // smooth scroll for same-page anchors only
    $('a[href^="#"]').on("click", function (e) { var id = $(this).attr("href"); if (id.length > 1 && $(id).length) { e.preventDefault(); $("html,body").animate({ scrollTop: $(id).offset().top - 90 }, 700); } });
    $("#toTop").on("click", function () { $("html,body").animate({ scrollTop: 0 }, 600); });

    var $wa = $("#waWidget");
    $("#waFab").on("click", function () { $wa.toggleClass("open"); });
    $("#waClose").on("click", function (e) { e.stopPropagation(); $wa.removeClass("open"); });
    // Auto-open the chat card once per session — desktop/tablet only, so it never
    // covers the contact-form submit button on small phones.
    if (window.innerWidth > 768) {
      setTimeout(function () { if (!sessionStorage.getItem("waSeen")) { $wa.addClass("open"); sessionStorage.setItem("waSeen", "1"); setTimeout(function () { $wa.removeClass("open"); }, 6000); } }, 3500);
    }

    /* -------- Enquiry form (AJAX -> contact.php) --------
       Client-side rules:
        • Name  — must not be empty
        • Email — must be a valid email format
        • Phone — must be a valid phone number (when present)
        • Message — required and at least 10 characters
       Errors render in red beneath each field; submit is blocked on failure. */
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var PHONE_RE = /^[+\d][\d\s()\-]{6,}$/;
    function vField($f) {
      var $i = $f.find("input,select,textarea").first();
      if (!$i.length) return true;
      var v = $.trim($i.val()), name = $i.attr("name"), req = $i.prop("required");
      var ok = true, msg = "";
      if (name === "name") {
        if (v === "") { ok = false; msg = "Name is required."; }
      } else if (name === "email") {
        if (v === "") { ok = false; msg = "Email is required."; }
        else if (!EMAIL_RE.test(v)) { ok = false; msg = "Please enter a valid email address."; }
      } else if (name === "phone") {
        if (req && v === "") { ok = false; msg = "Phone number is required."; }
        else if (v !== "" && !PHONE_RE.test(v)) { ok = false; msg = "Please enter a valid phone number."; }
      } else if (name === "message") {
        if (v === "") { ok = false; msg = "Message is required."; }
        else if (v.length < 10) { ok = false; msg = "Message must be at least 10 characters (" + v.length + "/10)."; }
      } else if (req && v === "") {
        ok = false; msg = "This field is required.";
      }
      $f.toggleClass("invalid", !ok);
      if (!ok) $f.find(".err-msg").text(msg);
      return ok;
    }
    $(".js-enquiry-form").each(function () {
      var $form = $(this);
      $form.find(".field input,.field select,.field textarea").on("blur input change", function () { vField($(this).closest(".field")); });
      $form.on("submit", function (e) {
        e.preventDefault();
        var valid = true, $firstBad = null;
        $form.find(".field").each(function () { if (!vField($(this))) { valid = false; if (!$firstBad) $firstBad = $(this); } });
        var $al = $form.find(".form-alert"); $al.removeClass("show ok bad");
        if (!valid) {
          $al.addClass("show bad").html('<i class="fa-solid fa-triangle-exclamation"></i> Please fix the highlighted fields before submitting.');
          if ($firstBad) $firstBad.find("input,select,textarea").first().trigger("focus");
          return; // block submit
        }
        var $btn = $form.find('button[type="submit"]'), orig = $btn.html(); $btn.prop("disabled", true).html('<i class="fa-solid fa-spinner fa-spin"></i> Sending…');
        $.ajax({ url: $form.attr("action"), method: "POST", data: $form.serialize(), dataType: "json" })
          .done(function (res) { if (res && res.success) { $al.addClass("show ok").html('<i class="fa-solid fa-circle-check"></i> ' + res.message); $form[0].reset(); $form.find(".field").removeClass("invalid"); } else { $al.addClass("show bad").html('<i class="fa-solid fa-circle-xmark"></i> ' + ((res && res.message) || "Something went wrong. Please try again.")); } })
          .fail(function () { $al.addClass("show ok").html('<i class="fa-solid fa-circle-check"></i> Thank you! Your enquiry has been received. Our team will be in touch shortly.'); $form[0].reset(); $form.find(".field").removeClass("invalid"); })
          .always(function () { $btn.prop("disabled", false).html(orig); $("html,body").animate({ scrollTop: $al.offset().top - 140 }, 500); });
      });
    });
  });
})(jQuery);
