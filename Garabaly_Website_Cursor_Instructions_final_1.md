# Garabaly Website — Cursor Agent Instructions

**Date**: 30 March 2026
**Scope**: Content updates across all 3 language versions (EN, FR, AR)
**Changes**: 6 mandatory changes. Apply ALL across EN, FR, and AR.

---

## CHANGE 1: Remove "in Paris" from Hero Subtitle

The hero subtitle on index.html mentions "in Paris" which unnecessarily narrows the diaspora to one city. The diaspora section further down handles city-specific storytelling. The hero should stay universal.

### English — `index.html` (line ~154)

**FIND:**
```html
From Sahelian herders to diaspora buyers in Paris. Real negotiation. Real escrow. Real trust. Because trust isn't built with a checkout button.
```

**REPLACE WITH:**
```html
From Sahelian herders to diaspora buyers. Real negotiation. Real escrow. Real trust. Because trust isn't built with a checkout button.
```

### French — `fr/index.html` (line ~125)

**FIND:**
```html
Des éleveurs sahéliens aux acheteurs de la diaspora à Paris. Négociation réelle. Séquestre réel. Confiance réelle. Car la confiance ne se construit pas avec un bouton d'achat.
```

**REPLACE WITH:**
```html
Des éleveurs sahéliens aux acheteurs de la diaspora. Négociation réelle. Séquestre réel. Confiance réelle. Car la confiance ne se construit pas avec un bouton d'achat.
```

### Arabic — `ar/index.html` (line ~125)

**FIND:**
```html
من رعاة الساحل إلى مشتري المهجر في باريس. مفاوضة حقيقية. ضمان حقيقي. ثقة حقيقية. لأن الثقة لا تُبنى بزر شراء.
```

**REPLACE WITH:**
```html
من رعاة الساحل إلى مشتري المهجر. مفاوضة حقيقية. ضمان حقيقي. ثقة حقيقية. لأن الثقة لا تُبنى بزر شراء.
```

---

## CHANGE 2: Rewrite Vision Section on About Page

The current vision section on `about.html` contains a roadmap sentence that exposes internal product decisions (admin dashboard, dual approval), makes public promises on specific languages with no timeline, and reads like a sprint ticket. **Remove it entirely and replace with a stronger, more visionary paragraph.**

### English — `about.html` (lines ~335-353)

The vision section has 3 paragraphs. **Keep paragraph 1 (the inclusive vision). Replace paragraph 2 entirely. Replace paragraph 3 with a stronger closing.**

**FIND (the full 3-paragraph block):**
```html
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            We envision a West Africa where any herder, farmer, or livestock trader — regardless of their location or access to traditional financial services — can participate in a fair, transparent marketplace.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            We're launching in Mali first and expanding across the Sahel and West Africa. Mobile money is already live in Mali, Senegal, Côte d'Ivoire, Burkina Faso, Benin, Togo, and Cameroun — with more countries coming. Our roadmap includes adding Bambara, Mooré, Hausa, Fulfulde, and Wolof as full app languages, expanding mobile money coverage across more West African markets, and building an admin dashboard with dual-approval oversight for complete transparency.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-xl);">
            Our goal is to become the standard platform for livestock commerce in Africa while preserving the cultural traditions that make this trade unique.
          </p>
```

**REPLACE WITH:**
```html
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            We envision a West Africa where any herder, farmer, or livestock trader — regardless of their location or access to traditional financial services — can participate in a fair, transparent marketplace.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            Livestock commerce in West Africa exceeds $1 billion annually. Over 300 million people across the Sahel and coastal states depend on this trade for their livelihoods, their celebrations, and their food security. Yet the infrastructure connecting herders to buyers, rural supply to urban demand, and diaspora capital to local markets simply does not exist. We started in Mali — where mobile money is already live — and we are expanding across the region because the gap is undeniable and the demand is already here.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-xl);">
            Our goal is to become the standard infrastructure for livestock commerce in Africa — not by replacing the culture of negotiation, but by giving it the trust, transparency, and reach it has always deserved.
          </p>
```

### French — `fr/about.html` (lines ~331-338)

**FIND:**
```html
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            Nous envisageons une Afrique de l'Ouest où tout éleveur, agriculteur ou commerçant de bétail — quel que soit son emplacement ou son accès aux services financiers traditionnels — peut participer à un marché équitable et transparent.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            Nous lançons au Mali d'abord, puis nous étendons au Sahel et à l'Afrique de l'Ouest. Le mobile money est déjà LIVE au Mali, Sénégal, Côte d'Ivoire, Burkina Faso, Bénin, Togo et Cameroun — avec d'autres pays à venir. Notre feuille de route inclut l'ajout du bambara, mooré, haoussa, fulfulde et wolof comme langues complètes, l'expansion de la couverture mobile money dans plus de marchés ouest-africains, et la construction d'un tableau de bord administrateur avec double approbation.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-xl);">
            Notre objectif est de devenir la plateforme de référence pour le commerce de bétail en Afrique tout en préservant les traditions culturelles qui rendent ce commerce unique.
          </p>
```

**REPLACE WITH:**
```html
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            Nous envisageons une Afrique de l'Ouest où tout éleveur, agriculteur ou commerçant de bétail — quel que soit son emplacement ou son accès aux services financiers traditionnels — peut participer à un marché équitable et transparent.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            Le commerce de bétail en Afrique de l'Ouest dépasse 1 milliard de dollars par an. Plus de 300 millions de personnes à travers le Sahel et les États côtiers dépendent de ce commerce pour leur subsistance, leurs célébrations et leur sécurité alimentaire. Pourtant, l'infrastructure reliant les éleveurs aux acheteurs, l'offre rurale à la demande urbaine, et le capital de la diaspora aux marchés locaux n'existe tout simplement pas. Nous avons commencé au Mali — où le mobile money est déjà actif — et nous nous étendons à travers la région parce que le besoin est indéniable et la demande est déjà là.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-xl);">
            Notre objectif est de devenir l'infrastructure de référence pour le commerce de bétail en Afrique — non pas en remplaçant la culture de la négociation, mais en lui donnant la confiance, la transparence et la portée qu'elle a toujours méritées.
          </p>
```

### Arabic — `ar/about.html` (lines ~224-229)

**FIND:**
```html
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            نتصور أفريقيا غربية حيث أي راعٍ أو مزارع أو تاجر ماشية — بغض النظر عن موقعه — يمكنه المشاركة في سوق عادل وشفاف.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-xl);">
            ننطلق في مالي أولاً ثم نتوسع عبر الساحل وغرب أفريقيا. المدفوعات عبر mobile money أصبحت LIVE في مالي والسنغال وكوت ديفوار وبوركينا فاسو وبنين وتوغو والكاميرون، مع إضافة دول جديدة. خارطة الطريق تتضمن إضافة البمبارا والمُورِي والهاوسا والفلفلدي والولوف كلغات كاملة للتطبيق، وتوسيع تغطية mobile money عبر أسواق غرب أفريقيا.
          </p>
```

**REPLACE WITH:**
```html
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            نتصور أفريقيا غربية حيث أي راعٍ أو مزارع أو تاجر ماشية — بغض النظر عن موقعه أو وصوله إلى الخدمات المالية التقليدية — يمكنه المشاركة في سوق عادل وشفاف.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
            يتجاوز تجارة الماشية في غرب أفريقيا مليار دولار سنوياً. أكثر من 300 مليون شخص عبر الساحل والدول الساحلية يعتمدون على هذه التجارة لمعيشتهم واحتفالاتهم وأمنهم الغذائي. ومع ذلك، البنية التحتية التي تربط الرعاة بالمشترين، والعرض الريفي بالطلب الحضري، ورأسمال المهجر بالأسواق المحلية — غير موجودة ببساطة. بدأنا في مالي — حيث الدفع عبر الهاتف المحمول مفعّل بالفعل — ونتوسع عبر المنطقة لأن الحاجة لا يمكن إنكارها والطلب موجود بالفعل.
          </p>
          <p class="section-subtitle" style="margin-bottom: var(--space-xl);">
            هدفنا أن نصبح البنية التحتية المرجعية لتجارة الماشية في أفريقيا — ليس باستبدال ثقافة التفاوض، بل بمنحها الثقة والشفافية والوصول الذي طالما استحقته.
          </p>
```

**NOTE for Arabic version:** The original AR version was missing paragraph 3 ("Our goal is to become..."). The replacement above adds it back for parity across all three languages.

---

## CHANGE 3: Replace Fake Listing Counts with "Available now"

The category cards show fabricated listing counts (1,200+, 2,800+, 900+, 500+, 300+). These are not real numbers. Replace all with "Available now".

### English — `index.html` (lines ~562-607)

**FIND and REPLACE each instance:**

```html
<div class="category-card__count">1,200+ listings</div>
```
→
```html
<div class="category-card__count">Available now</div>
```

```html
<div class="category-card__count">2,800+ listings</div>
```
→
```html
<div class="category-card__count">Available now</div>
```

```html
<div class="category-card__count">900+ listings</div>
```
→
```html
<div class="category-card__count">Available now</div>
```

```html
<div class="category-card__count">500+ listings</div>
```
→
```html
<div class="category-card__count">Available now</div>
```

```html
<div class="category-card__count">300+ listings</div>
```
→
```html
<div class="category-card__count">Available now</div>
```

### French — `fr/index.html`

**FIND and REPLACE each instance:**

```html
<div class="category-card__count">1 200+ annonces</div>
```
→
```html
<div class="category-card__count">Disponible</div>
```

```html
<div class="category-card__count">2 800+ annonces</div>
```
→
```html
<div class="category-card__count">Disponible</div>
```

```html
<div class="category-card__count">900+ annonces</div>
```
→
```html
<div class="category-card__count">Disponible</div>
```

```html
<div class="category-card__count">500+ annonces</div>
```
→
```html
<div class="category-card__count">Disponible</div>
```

```html
<div class="category-card__count">300+ annonces</div>
```
→
```html
<div class="category-card__count">Disponible</div>
```

### Arabic — `ar/index.html`

**FIND and REPLACE each instance:**

```html
<div class="category-card__count">+1,200 إعلان</div>
```
→
```html
<div class="category-card__count">متاح الآن</div>
```

```html
<div class="category-card__count">+2,800 إعلان</div>
```
→
```html
<div class="category-card__count">متاح الآن</div>
```

```html
<div class="category-card__count">+900 إعلان</div>
```
→
```html
<div class="category-card__count">متاح الآن</div>
```

```html
<div class="category-card__count">+500 إعلان</div>
```
→
```html
<div class="category-card__count">متاح الآن</div>
```

```html
<div class="category-card__count">+300 إعلان</div>
```
→
```html
<div class="category-card__count">متاح الآن</div>
```

---

## CHANGE 4: Remove "Coming Soon" Local Language Promises

There are NO plans to add Bambara, Mooré, Hausa, Fulfulde, or Wolof as full app interface languages. Users already communicate in their local languages via voice descriptions and voice reviews — that IS the multilingual strategy, not a stopgap. Remove every "coming soon" promise about these languages and reframe voice as the solution.

**This change affects 4 locations across 3 languages = 12 edits total.**

### 4A. Multilingual Feature Card — `index.html`

**English — `index.html` (line ~307)**

**FIND:**
```html
            Full interface in French, English, and Arabic (with right-to-left support). Specialized livestock vocabulary and locale-aware formatting. Bambara, Mooré, Hausa, Fulfulde, and Wolof coming soon.
```

**REPLACE WITH:**
```html
            Full interface in French, English, and Arabic (with right-to-left support). Specialized livestock vocabulary and locale-aware formatting. Voice descriptions and reviews in any language — Bambara, Mooré, Hausa, Fulfulde, Wolof, and more.
```

**French — `fr/index.html` (line ~259)**

**FIND:**
```html
            Interface complète en français, anglais et arabe (avec support droite-à-gauche). Vocabulaire spécialisé du bétail. Bambara, Mooré, Haoussa, Fulfulde et Wolof bientôt disponibles.
```

**REPLACE WITH:**
```html
            Interface complète en français, anglais et arabe (avec support droite-à-gauche). Vocabulaire spécialisé du bétail. Descriptions et avis vocaux dans toute langue — bambara, mooré, haoussa, fulfulde, wolof et plus.
```

**Arabic — `ar/index.html` (line ~259)**

**FIND:**
```html
            واجهة كاملة بالفرنسية والإنجليزية والعربية (مع دعم من اليمين لليسار). مفردات متخصصة للماشية. بمبارا، مُورِي، هاوسا، فلفلدي وولوف قريباً.
```

**REPLACE WITH:**
```html
            واجهة كاملة بالفرنسية والإنجليزية والعربية (مع دعم من اليمين لليسار). مفردات متخصصة للماشية. أوصاف ومراجعات صوتية بأي لغة — البمبارا والمُورِي والهاوسا والفلفلدي والولوف وغيرها.
```

### 4B. Values Card "Locally Rooted" — `about.html`

**English — `about.html` (line ~178)**

**FIND:**
```
Full interface in French, English, and Arabic with native RTL support — not an afterthought. Specialized livestock vocabulary: Bovin, Ovin, Caprin. Payment terms in local context: 'Paiement sécurisé (Escrow)'. Voice descriptions in Bambara, Mooré, Hausa, Fulfulde, Wolof — any language. Coming soon: Bambara, Mooré, Hausa, Fulfulde, and Wolof as full app languages.
```

**REPLACE WITH:**
```
Full interface in French, English, and Arabic with native RTL support — not an afterthought. Specialized livestock vocabulary: Bovin, Ovin, Caprin. Payment terms in local context: 'Paiement sécurisé (Escrow)'. Voice descriptions and reviews in any language — Bambara, Mooré, Hausa, Fulfulde, Wolof, and more. Because in West Africa, voice is how business gets done.
```

**French — `fr/about.html` (line ~176)**

**FIND:**
```
Interface complète en français, anglais et arabe avec support natif droite-à-gauche. Vocabulaire spécialisé du bétail : Bovin, Ovin, Caprin. Termes de paiement en contexte local : « Paiement sécurisé (Escrow) ». Descriptions vocales en bambara, mooré, haoussa, fulfulde, wolof — toute langue. Bientôt : bambara, mooré, haoussa, fulfulde et wolof comme langues complètes.
```

**REPLACE WITH:**
```
Interface complète en français, anglais et arabe avec support natif droite-à-gauche. Vocabulaire spécialisé du bétail : Bovin, Ovin, Caprin. Termes de paiement en contexte local : « Paiement sécurisé (Escrow) ». Descriptions et avis vocaux dans toute langue — bambara, mooré, haoussa, fulfulde, wolof et plus. En Afrique de l'Ouest, la voix est la langue du commerce.
```

**Arabic — `ar/about.html` (line ~157)**

**FIND:**
```
واجهة كاملة بالفرنسية والإنجليزية والعربية مع دعم أصلي من اليمين لليسار. مفردات متخصصة. أوصاف صوتية بالبمبارا والمُورِي والهاوسا والفلفلدي والولوف. قريباً: لغات كاملة للتطبيق.
```

**REPLACE WITH:**
```
واجهة كاملة بالفرنسية والإنجليزية والعربية مع دعم أصلي من اليمين لليسار. مفردات متخصصة للماشية. أوصاف ومراجعات صوتية بأي لغة — البمبارا والمُورِي والهاوسا والفلفلدي والولوف وغيرها. في غرب أفريقيا، الصوت هو لغة التجارة.
```

### 4C. FAQ Language Question — `faq.html`

**English — `faq.html` (line ~138)**

**FIND:**
```
Full interface in French, English, and Arabic with native right-to-left (RTL) layout support — Arabic isn't an afterthought, it's a first-class experience. Voice descriptions and reviews can be recorded in any language: Bambara, Mooré, Hausa, Fulfulde, Wolof, Songhai, and more. We're adding Bambara, Mooré, Hausa, Fulfulde, and Wolof as full interface languages based on user demand. Total estimated: 1,300+ translatable strings, all human-reviewed — not machine translated.
```

**REPLACE WITH:**
```
Full interface in French, English, and Arabic with native right-to-left (RTL) layout support — Arabic isn't an afterthought, it's a first-class experience. Voice descriptions and reviews can be recorded in any language: Bambara, Mooré, Hausa, Fulfulde, Wolof, Songhai, and more. In West Africa, voice is how business gets done — sellers describe their livestock by speaking, buyers leave voice reviews, and everyone communicates in their own language. No typing required.
```

**French — `fr/faq.html` (line ~116)**

**FIND:**
```
Interface complète en français, anglais et arabe avec support natif de droite à gauche (RTL) — l'arabe n'est pas une option secondaire, c'est une expérience de première classe. Les descriptions et avis vocaux peuvent être enregistrés dans toute langue : bambara, mooré, haoussa, fulfulde, wolof, songhaï, et plus. Nous ajoutons bambara, mooré, haoussa, fulfulde et wolof comme langues d'interface complètes. Total estimé : 1 300+ chaînes traduisibles, toutes vérifiées par des humains — pas de traduction automatique.
```

**REPLACE WITH:**
```
Interface complète en français, anglais et arabe avec support natif de droite à gauche (RTL) — l'arabe n'est pas une option secondaire, c'est une expérience de première classe. Les descriptions et avis vocaux peuvent être enregistrés dans toute langue : bambara, mooré, haoussa, fulfulde, wolof, songhaï, et plus. En Afrique de l'Ouest, la voix est la langue du commerce — les vendeurs décrivent leur bétail en parlant, les acheteurs laissent des avis vocaux, et chacun communique dans sa propre langue. Aucune saisie nécessaire.
```

**Arabic — `ar/faq.html` (line ~115)**

**FIND:**
```
واجهة كاملة بالفرنسية والإنجليزية والعربية مع دعم أصلي للكتابة من اليمين لليسار (RTL) — العربية ليست فكرة ثانوية بل تجربة من الدرجة الأولى. الأوصاف الصوتية والمراجعات يمكن تسجيلها بأي لغة: البمبارا والمُورِي والهاوسا والفلفلدي والولوف والسنغاي والمزيد. نضيف البمبارا والمُورِي والهاوسا والفلفلدي والولوف كلغات واجهة كاملة حسب طلب المستخدمين. المجموع المقدر: أكثر من 1,300 سلسلة نصية قابلة للترجمة، كلها مراجعة بشرياً — وليست ترجمة آلية.
```

**REPLACE WITH:**
```
واجهة كاملة بالفرنسية والإنجليزية والعربية مع دعم أصلي للكتابة من اليمين لليسار (RTL) — العربية ليست فكرة ثانوية بل تجربة من الدرجة الأولى. الأوصاف الصوتية والمراجعات يمكن تسجيلها بأي لغة: البمبارا والمُورِي والهاوسا والفلفلدي والولوف والسنغاي والمزيد. في غرب أفريقيا، الصوت هو لغة التجارة — البائعون يصفون ماشيتهم بالكلام، والمشترون يتركون مراجعات صوتية، والجميع يتواصل بلغته الخاصة. لا حاجة للكتابة.
```

### 4D. Privacy Policy Language List — `policies.html`

**English — `policies.html` (line ~140)**

**FIND:**
```html
<li>Deliver the app in your preferred language (French, English, Arabic, Bambara, Mooré, Hausa, Fulfulde, Wolof).</li>
```

**REPLACE WITH:**
```html
<li>Deliver the app in your preferred language (French, English, Arabic) with voice support for local languages including Bambara, Mooré, Hausa, Fulfulde, and Wolof.</li>
```

**French — `fr/policies.html` (line ~140)**

**FIND:**
```html
<li>Proposer l'application dans votre langue préférée (français, anglais, arabe, bambara, mooré, hausa, fulfulde, wolof).</li>
```

**REPLACE WITH:**
```html
<li>Proposer l'application dans votre langue préférée (français, anglais, arabe) avec support vocal pour les langues locales dont le bambara, le mooré, le haoussa, le fulfulde et le wolof.</li>
```

**Arabic — `ar/policies.html`**

Search for the equivalent Arabic `<li>` that lists these languages and apply the same reframe. If the AR policies.html does not contain this specific line, skip.

---

## CHANGE 5: Replace Fake Testimonials with Scenario Cards Carousel

The current testimonials section uses fabricated reviews with fake names, fake star ratings, and a header that implies verified user feedback. Replace the entire section with honest scenario cards — each one showing a real use case and real platform features through a persona's story. No fake names, no star ratings. **Also implement a CSS scroll-snap carousel** (3 cards visible on desktop, 1 on mobile, swipeable).

### 5A. English — `index.html` (lines ~712-769)

**FIND the entire testimonials section:**
```html
  <!-- ===== TESTIMONIALS ===== -->
  <section class="section section--alt" id="testimonials">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="section-eyebrow">What Our Users Say</span>
        <h2 class="section-title">Trusted Across West Africa & Beyond</h2>
      </div>

      <div class="scroll-hint">
        <span>Swipe to explore</span>
        <i data-feather="arrow-right"></i>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            "Before Garabaly, I had to travel 200km to buy cattle for Tabaski. Now I browse from Bamako, negotiate directly with the herder, and the escrow gives me confidence to buy from sellers I've never met."
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">A</div>
            <div>
              <div class="testimonial-card__name">Amadou Diallo</div>
              <div class="testimonial-card__role">Buyer, Bamako</div>
            </div>
          </div>
        </div>

        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            "I live in Paris but I was able to buy a ram for my mother in Mopti for Tabaski. She cried when it arrived. I could see her joy on a WhatsApp call. Garabaly made that possible."
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">I</div>
            <div>
              <div class="testimonial-card__name">Ibrahim Touré</div>
              <div class="testimonial-card__role">Diaspora Buyer, Paris</div>
            </div>
          </div>
        </div>

        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            "I'm a herder in Mopti. Garabaly helped me reach buyers in the city without a middleman. I love that buyers can negotiate — it feels like the real market. And the wallet makes getting paid easy."
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">F</div>
            <div>
              <div class="testimonial-card__name">Fatoumata Sangaré</div>
              <div class="testimonial-card__role">Seller, Mopti</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**REPLACE WITH:**
```html
  <!-- ===== BUILT FOR EVERY SIDE OF THE MARKET ===== -->
  <section class="section section--alt" id="scenarios">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="section-eyebrow">Real Situations, Real Solutions</span>
        <h2 class="section-title">Built for Every Side of the Market</h2>
      </div>

      <div class="scroll-hint">
        <span>Swipe to explore</span>
        <i data-feather="arrow-right"></i>
      </div>

      <div class="scenarios-carousel">
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">A buyer in Bamako</div>
          <p class="scenario-card__quote">
            "Tabaski is in two months and I used to start worrying now — who to trust, where to travel, how to not get cheated. Now I browse from my phone, I negotiate like at the market, and my money stays locked until I enter the confirmation code. But what really changed things? I can see a seller's reviews from past buyers before I spend a single franc."
          </p>
        </div>

        <div class="scenario-card reveal">
          <div class="scenario-card__persona">A mother in Paris</div>
          <p class="scenario-card__quote">
            "Every Tabaski, my family waits for me to send money for the ram. But who buys it? How much did it really cost? With Garabaly, I choose the animal myself from Paris, I pay by Orange Money, and my mother confirms delivery with a code. I can even read the seller's reviews from other buyers — I know who I'm dealing with before I pay."
          </p>
        </div>

        <div class="scenario-card reveal">
          <div class="scenario-card__persona">A herder in Mopti</div>
          <p class="scenario-card__quote">
            "I know my animals better than anyone. But at the market, the middleman sets the price. Here, buyers find me directly. I describe my bull in my own voice, in Fulfulde — no typing. Every good transaction builds my reputation. Buyers scan my QR code at the foire and see my reviews, my history. My name means something now beyond my village."
          </p>
        </div>

        <div class="scenario-card reveal">
          <div class="scenario-card__persona">A poultry seller in Ouagadougou</div>
          <p class="scenario-card__quote">
            "I raise 200 chickens but my clients were only my neighbours. Now buyers across the city find me. I recorded my descriptions in Mooré — just talking, no typing. After each sale, buyers leave reviews. New customers see those reviews and trust me before we even speak. My QR code is my business card now."
          </p>
        </div>

        <div class="scenario-card reveal">
          <div class="scenario-card__persona">A veterinarian in Ségou</div>
          <p class="scenario-card__quote">
            "I used to wait for farmers to hear about me through word of mouth. Now when someone buys an animal on Garabaly, they can book me directly for a health check. After each visit, they rate my service. Those ratings bring me more work than any sign ever could. Steady bookings, guaranteed payment through escrow."
          </p>
        </div>

        <div class="scenario-card reveal">
          <div class="scenario-card__persona">A cattle trader in Niamey</div>
          <p class="scenario-card__quote">
            "I sell cattle to buyers in Abidjan but the trust problem was always the same — they don't pay before delivery, I don't ship without payment. Escrow solved that. But what really opened doors is my profile. Buyers across borders scan my QR code and see 50 completed transactions. Trust that used to take years to build now travels with me."
          </p>
        </div>
      </div>
    </div>
  </section>
```

### 5B. French — `fr/index.html` (lines ~600-653)

**FIND the entire testimonials section:**
```html
  <!-- ===== TÉMOIGNAGES ===== -->
  <section class="section section--alt" id="testimonials">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="section-eyebrow">Ce que disent nos utilisateurs</span>
        <h2 class="section-title">La confiance à travers l'Afrique de l'Ouest et au-delà</h2>
      </div>
      <div class="scroll-hint">
        <span>Glissez pour explorer</span>
        <i data-feather="arrow-right"></i>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            « Avant Garabaly, je devais voyager 200 km pour acheter du bétail pour la Tabaski ou un mariage. Maintenant, je parcours depuis Bamako, je négocie directement avec l'éleveur, et le séquestre me donne confiance. »
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">A</div>
            <div>
              <div class="testimonial-card__name">Amadou Diallo</div>
              <div class="testimonial-card__role">Acheteur, Bamako</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            « Je vis à Paris mais j'ai pu acheter un bélier pour ma mère à Mopti pour la Tabaski. Elle a pleuré quand il est arrivé. J'ai pu voir sa joie sur un appel WhatsApp. Garabaly a rendu cela possible. »
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">I</div>
            <div>
              <div class="testimonial-card__name">Ibrahim Touré</div>
              <div class="testimonial-card__role">Acheteur diaspora, Paris</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            « Je suis éleveur à Mopti. Garabaly m'a aidé à atteindre des acheteurs en ville sans intermédiaire. J'aime que les acheteurs puissent négocier — c'est comme le vrai marché. Et le portefeuille facilite les paiements. »
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">F</div>
            <div>
              <div class="testimonial-card__name">Fatoumata Sangaré</div>
              <div class="testimonial-card__role">Vendeuse, Mopti</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**REPLACE WITH:**
```html
  <!-- ===== CONÇU POUR CHAQUE ACTEUR DU MARCHÉ ===== -->
  <section class="section section--alt" id="scenarios">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="section-eyebrow">Des situations réelles, des solutions concrètes</span>
        <h2 class="section-title">Conçu pour chaque acteur du marché</h2>
      </div>
      <div class="scroll-hint">
        <span>Glissez pour explorer</span>
        <i data-feather="arrow-right"></i>
      </div>
      <div class="scenarios-carousel">
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">Un acheteur à Bamako</div>
          <p class="scenario-card__quote">
            « La Tabaski est dans deux mois et avant, je stressais déjà — à qui faire confiance, où voyager, comment ne pas me faire arnaquer. Maintenant je parcours depuis mon téléphone, je négocie comme au marché, et mon argent reste bloqué jusqu'à ce que j'entre le code de confirmation. Mais ce qui a vraiment changé la donne ? Je vois les avis des anciens acheteurs avant de dépenser un seul franc. »
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">Une mère à Paris</div>
          <p class="scenario-card__quote">
            « Chaque Tabaski, ma famille attend que j'envoie l'argent pour le bélier. Mais qui l'achète ? Combien ça a vraiment coûté ? Avec Garabaly, je choisis l'animal moi-même depuis Paris, je paie par Orange Money, et ma mère confirme la livraison avec un code. Je peux même lire les avis du vendeur — je sais à qui j'ai affaire avant de payer. »
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">Un éleveur à Mopti</div>
          <p class="scenario-card__quote">
            « Je connais mes animaux mieux que personne. Mais au marché, c'est l'intermédiaire qui fixe le prix. Ici, les acheteurs me trouvent directement. Je décris mon taureau de ma propre voix, en fulfulde — pas de saisie. Chaque bonne transaction construit ma réputation. Les acheteurs scannent mon QR code à la foire et voient mes avis, mon historique. Mon nom veut dire quelque chose maintenant au-delà de mon village. »
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">Une vendeuse de volaille à Ouagadougou</div>
          <p class="scenario-card__quote">
            « J'élève 200 poulets mais mes clients étaient seulement mes voisins. Maintenant des acheteurs de toute la ville me trouvent. J'ai enregistré mes descriptions en mooré — juste en parlant, sans taper. Après chaque vente, les acheteurs laissent des avis. Les nouveaux clients voient ces avis et me font confiance avant même qu'on se parle. Mon QR code, c'est ma carte de visite maintenant. »
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">Un vétérinaire à Ségou</div>
          <p class="scenario-card__quote">
            « Avant, j'attendais que les éleveurs entendent parler de moi par le bouche-à-oreille. Maintenant quand quelqu'un achète un animal sur Garabaly, il peut me réserver directement pour un contrôle sanitaire. Après chaque visite, ils notent mon service. Ces notes m'apportent plus de travail que n'importe quelle enseigne. Des réservations régulières, un paiement garanti par le séquestre. »
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">Un commerçant de bétail à Niamey</div>
          <p class="scenario-card__quote">
            « Je vends du bétail à des acheteurs à Abidjan mais le problème de confiance était toujours le même — ils ne paient pas avant la livraison, je n'expédie pas sans paiement. Le séquestre a résolu ça. Mais ce qui a vraiment ouvert les portes, c'est mon profil. Les acheteurs de l'autre côté de la frontière scannent mon QR code et voient 50 transactions réussies. La confiance qui prenait des années à construire voyage maintenant avec moi. »
          </p>
        </div>
      </div>
    </div>
  </section>
```

### 5C. Arabic — `ar/index.html` (lines ~600-653)

**FIND the entire testimonials section:**
```html
  <!-- ===== الشهادات ===== -->
  <section class="section section--alt" id="testimonials">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="section-eyebrow">ماذا يقول المستخدمون</span>
        <h2 class="section-title">ثقة عبر غرب أفريقيا وما وراءها</h2>
      </div>
      <div class="scroll-hint">
        <span>اسحب لاستكشاف</span>
        <i data-feather="arrow-left"></i>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            «قبل غرابالي، كنت أسافر 200 كم لشراء ماشية للتباسكي أو للأعراس. الآن أتصفح من باماكو، أفاوض مباشرة مع الراعي، والضمان يعطيني ثقة.»
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">أ</div>
            <div>
              <div class="testimonial-card__name">أمادو ديالو</div>
              <div class="testimonial-card__role">مشتري، باماكو</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            «أعيش في باريس لكنني استطعت شراء كبش لأمي في موبتي للتباسكي أو للأعراس. بكت عندما وصل. رأيت فرحتها بمكالمة WhatsApp. غرابالي جعل ذلك ممكناً.»
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">إ</div>
            <div>
              <div class="testimonial-card__name">إبراهيم توري</div>
              <div class="testimonial-card__role">مشتري مغترب، باريس</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal">
          <div class="testimonial-card__stars">★★★★★</div>
          <p class="testimonial-card__quote">
            «أنا راعية في موبتي. غرابالي ساعدني للوصول إلى مشترين في المدينة بدون وسيط. أحب أن المشترين يمكنهم المفاوضة — مثل السوق الحقيقي. والمحفظة تسهّل المدفوعات.»
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">ف</div>
            <div>
              <div class="testimonial-card__name">فاطومتا سنغاري</div>
              <div class="testimonial-card__role">بائعة، موبتي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**REPLACE WITH:**
```html
  <!-- ===== مصمم لكل طرف في السوق ===== -->
  <section class="section section--alt" id="scenarios">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="section-eyebrow">مواقف حقيقية، حلول فعلية</span>
        <h2 class="section-title">مصمم لكل طرف في السوق</h2>
      </div>
      <div class="scroll-hint">
        <span>اسحب لاستكشاف</span>
        <i data-feather="arrow-left"></i>
      </div>
      <div class="scenarios-carousel">
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">مشترٍ في باماكو</div>
          <p class="scenario-card__quote">
            «التباسكي بعد شهرين وكنت أبدأ القلق الآن — بمن أثق، أين أسافر، كيف لا أُخدع. الآن أتصفح من هاتفي، أفاوض كما في السوق، وأموالي تبقى مقفلة حتى أدخل رمز التأكيد. لكن ما غيّر الأمور فعلاً؟ أستطيع رؤية تقييمات البائع من مشترين سابقين قبل أن أنفق فرنكاً واحداً.»
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">أم في باريس</div>
          <p class="scenario-card__quote">
            «كل تباسكي، عائلتي تنتظرني لأرسل المال للكبش. لكن من يشتريه؟ كم كلّف فعلاً؟ مع غرابالي، أختار الحيوان بنفسي من باريس، أدفع بـ Orange Money، وأمي تؤكد الاستلام بالرمز. حتى أقرأ تقييمات البائع — أعرف مع من أتعامل قبل أن أدفع.»
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">راعٍ في موبتي</div>
          <p class="scenario-card__quote">
            «أعرف حيواناتي أفضل من أي شخص. لكن في السوق، الوسيط يحدد السعر. هنا، المشترون يجدونني مباشرة. أصف ثوري بصوتي، بالفلفلدي — بدون كتابة. كل معاملة ناجحة تبني سمعتي. المشترون يمسحون QR code خاصتي في الفوار ويرون تقييماتي وتاريخي. اسمي يعني شيئاً الآن خارج قريتي.»
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">بائعة دواجن في واغادوغو</div>
          <p class="scenario-card__quote">
            «أربي 200 دجاجة لكن زبائني كانوا فقط جيراني. الآن مشترون من كل المدينة يجدونني. سجّلت أوصافي بالمُورِي — مجرد كلام، بدون كتابة. بعد كل بيعة، المشترون يتركون تقييمات. الزبائن الجدد يرون هذه التقييمات ويثقون بي قبل حتى أن نتكلم. QR code خاصتي هو بطاقة عملي الآن.»
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">طبيب بيطري في سيغو</div>
          <p class="scenario-card__quote">
            «كنت أنتظر أن يسمع المزارعون عني عن طريق الكلام. الآن عندما يشتري شخص حيواناً على غرابالي، يمكنه حجز موعد معي مباشرة لفحص صحي. بعد كل زيارة، يقيّمون خدمتي. هذه التقييمات تجلب لي عملاً أكثر من أي لافتة. حجوزات منتظمة، دفع مضمون عبر الضمان.»
          </p>
        </div>
        <div class="scenario-card reveal">
          <div class="scenario-card__persona">تاجر ماشية في نيامي</div>
          <p class="scenario-card__quote">
            «أبيع ماشية لمشترين في أبيدجان لكن مشكلة الثقة كانت دائماً نفسها — لا يدفعون قبل التسليم، ولا أشحن بدون دفع. الضمان حل ذلك. لكن ما فتح الأبواب حقاً هو ملفي الشخصي. المشترون عبر الحدود يمسحون QR code خاصتي ويرون 50 معاملة مكتملة. الثقة التي كانت تستغرق سنوات لبنائها تسافر معي الآن.»
          </p>
        </div>
      </div>
    </div>
  </section>
```

### 5D. CSS Changes — `css/styles.css`

Add the following styles for the new scenario cards carousel. These replace the existing `.testimonial-card` styles.

**Add to `css/styles.css`:**

```css
/* ===== SCENARIO CARDS CAROUSEL ===== */
.scenarios-carousel {
  display: flex;
  gap: var(--space-lg);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: var(--space-md) 0;
  scrollbar-width: none; /* Firefox */
}
.scenarios-carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.scenario-card {
  flex: 0 0 calc(33.333% - var(--space-lg));
  scroll-snap-align: start;
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.scenario-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.scenario-card__persona {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: var(--space-md);
}

.scenario-card__quote {
  font-style: italic;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* Responsive: 1 card on mobile, 2 on tablet, 3 on desktop */
@media (max-width: 768px) {
  .scenario-card {
    flex: 0 0 85%;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .scenario-card {
    flex: 0 0 calc(50% - var(--space-lg));
  }
}
```

**Also remove or replace** any existing `.testimonial-card`, `.testimonial-card__stars`, `.testimonial-card__author`, `.testimonial-card__avatar`, `.testimonial-card__name`, `.testimonial-card__role` styles that are no longer needed.

**NOTE for RTL (Arabic):** The scroll direction in `ar/index.html` already uses `arrow-left` for the scroll hint. The CSS `scroll-snap-type: x mandatory` works correctly in RTL layouts. No additional RTL-specific CSS needed.

---

## CHANGE 6: Remove Fabricated Audit Claims

The website claims a "95% compliance score" from a security audit and states "this isn't marketing — it's our audit report." No external audit has been conducted. The security architecture is genuinely strong — the fabrication is claiming an audit validated it. Remove all audit claims and rewrite to describe the architecture honestly.

**This change affects 5 specific strings across 4 files (not a uniform 3×3 — the FR and AR versions diverge).**

### 6A. about.html — "World-Class Security" value card

**English — `about.html` (line ~189)**

**FIND:**
```
Per-party staged escrow with bank-grade transaction security. Military-grade integrity verification for every transaction. Industry-leading PIN encryption. Dual admin approval for disputes. Built-in fraud prevention and brute-force protection. Seller's share held for 24-hour buyer dispute window. Service providers paid immediately upon completion. This isn't marketing — it's our audit report.
```

**REPLACE WITH:**
```
Per-party staged escrow with bank-grade transaction security. Military-grade integrity verification for every transaction. Industry-leading PIN encryption. Dispute mediation with manual approval. Built-in fraud prevention and brute-force protection. Seller's share held for 24-hour buyer dispute window. Service providers paid immediately upon completion. This isn't a promise — it's our architecture.
```

**French — `fr/about.html` (line ~187)**

**FIND:**
```
Séquestre par étapes avec sécurité transactionnelle de niveau bancaire. Vérification d'intégrité de niveau militaire pour chaque transaction. Chiffrement PIN de niveau industriel. Double approbation admin pour les litiges. Prévention de fraude et protection anti-force brute intégrées. Part du vendeur retenue 24h (fenêtre de contestation acheteur). Prestataires payés immédiatement. Ce n'est pas du marketing — c'est notre rapport d'audit.
```

**REPLACE WITH:**
```
Séquestre par étapes avec sécurité transactionnelle de niveau bancaire. Vérification d'intégrité de niveau militaire pour chaque transaction. Chiffrement PIN de niveau industriel. Médiation des litiges avec approbation manuelle. Prévention de fraude et protection anti-force brute intégrées. Part du vendeur retenue 24h (fenêtre de contestation acheteur). Prestataires payés immédiatement. Ce n'est pas une promesse — c'est notre architecture.
```

**Arabic — `ar/about.html` (line ~163)**: The AR version does NOT contain the "audit report" claim. No change needed here.

### 6B. faq.html — "How secure is the escrow really?"

**English — `faq.html` (line ~428)**

**FIND:**
```
Our escrow system passed a comprehensive security audit with a 95% compliance score. Every transaction is protected by bank-grade encryption, military-grade integrity verification, encrypted confirmation codes, dual admin approval for dispute resolution, and built-in fraud prevention. This isn't a promise — it's our architecture.
```

**REPLACE WITH:**
```
Every transaction is protected by bank-grade encryption, military-grade integrity verification, encrypted confirmation codes, dispute mediation with manual approval, and built-in fraud prevention. This isn't a promise — it's our architecture.
```

**Arabic — `ar/faq.html` (line ~308)**

**FIND:**
```
نظام الضمان لدينا اجتاز تدقيقاً أمنياً شاملاً بنسبة امتثال 95%. كل معاملة محمية بتشفير بنكي، وتحقق سلامة بدرجة عسكرية، ورموز تأكيد مشفرة، وموافقة مزدوجة من المسؤولين لحل النزاعات، وحماية مدمجة ضد الاحتيال. هذا ليس وعداً — إنها هندستنا.
```

**REPLACE WITH:**
```
كل معاملة محمية بتشفير بنكي، وتحقق سلامة بدرجة عسكرية، ورموز تأكيد مشفرة، ووساطة نزاعات بموافقة يدوية، وحماية مدمجة ضد الاحتيال. هذا ليس وعداً — إنها هندستنا.
```

**French — `fr/faq.html`**: The FR FAQ does NOT have the "95% compliance score" or "security audit" claim in this section. No change needed.

### 6C. faq.html — "Is my money safe?"

**English — `faq.html` (line ~368)**

**FIND:**
```
Absolutely. All escrow funds are held in secure, regulated accounts — your payment is never mixed with Garabaly's operating funds. We use bank-grade encryption, industry-leading security standards for data integrity, and comprehensive monitoring. Our payment architecture has passed a world-class security audit.
```

**REPLACE WITH:**
```
Absolutely. All escrow funds are held in secure, regulated accounts — your payment is never mixed with Garabaly's operating funds. We use bank-grade encryption, industry-leading security standards for data integrity, and comprehensive monitoring. Your money is protected by architecture, not promises.
```

**Arabic — `ar/faq.html` (line ~266)**

**FIND:**
```
بالتأكيد. كل أموال الضمان محتجزة في حسابات آمنة ومنظمة — دفعتك لا تختلط أبداً بأموال تشغيل غرابالي. نستخدم تشفيراً بدرجة بنكية، ومعايير أمنية متقدمة لسلامة البيانات، ومراقبة شاملة. بنية الدفع لدينا اجتازت تدقيقاً أمنياً عالمي المستوى.
```

**REPLACE WITH:**
```
بالتأكيد. كل أموال الضمان محتجزة في حسابات آمنة ومنظمة — دفعتك لا تختلط أبداً بأموال تشغيل غرابالي. نستخدم تشفيراً بدرجة بنكية، ومعايير أمنية متقدمة لسلامة البيانات، ومراقبة شاملة. أموالك محمية بالهندسة، لا بالوعود.
```

**French — `fr/faq.html` (line ~258)**: The FR version does NOT have the "world-class security audit" claim. No change needed.

---

## SECURITY-FIRST CHECKLIST

Before deploying any changes, verify:

- [ ] No internal service names exposed in user-facing copy
- [ ] No hashing algorithms mentioned (bcrypt, SHA, etc.)
- [ ] No lockout thresholds or brute-force limits mentioned with specifics
- [ ] No internal library names (Flutterwave, PayDunya) exposed in public-facing copy
- [ ] No roadmap promises with specific features or timelines
- [ ] No admin dashboard or internal tooling references
- [ ] No fake listing counts or fabricated numbers
- [ ] No fabricated audit claims, compliance scores, or certification references
- [ ] No fake testimonials with fabricated names or star ratings
- [ ] All statistics sourced from Tier 1 public sources (OECD, World Bank, FAO, GSMA, APS)

---

## FILE MAP — All Changes

| Change | EN Files | FR Files | AR Files |
|--------|----------|----------|----------|
| 1. Hero subtitle | `index.html` | `fr/index.html` | `ar/index.html` |
| 2. Vision section | `about.html` | `fr/about.html` | `ar/about.html` |
| 3. Listing counts | `index.html` | `fr/index.html` | `ar/index.html` |
| 4A. Feature card | `index.html` | `fr/index.html` | `ar/index.html` |
| 4B. Values card | `about.html` | `fr/about.html` | `ar/about.html` |
| 4C. FAQ language | `faq.html` | `fr/faq.html` | `ar/faq.html` |
| 4D. Privacy policy | `policies.html` | `fr/policies.html` | `ar/policies.html` |
| 5. Scenario cards | `index.html` + `css/styles.css` | `fr/index.html` | `ar/index.html` |
| 6A. Audit (about) | `about.html` | `fr/about.html` | — (AR clean) |
| 6B. Audit (escrow FAQ) | `faq.html` | — (FR clean) | `ar/faq.html` |
| 6C. Audit (money FAQ) | `faq.html` | — (FR clean) | `ar/faq.html` |

**Total files touched**: 15 (14 HTML + 1 CSS across 3 languages)
**Total edits**: ~40 find-and-replace operations

---

**END OF INSTRUCTIONS**
