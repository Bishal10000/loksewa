<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0a0f1e">
        <title>LokSewa Pathshala</title>
        <meta name="description" content="LokSewa Pathshala - Nepal's premium Loksewa exam preparation platform.">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">

        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif

        <style>
            .hero-mesh { background: radial-gradient(circle at 15% 20%, rgba(181, 23, 43, 0.42), transparent 28%), radial-gradient(circle at 85% 10%, rgba(0, 53, 128, 0.42), transparent 26%), radial-gradient(circle at 50% 80%, rgba(245, 166, 35, 0.18), transparent 28%), linear-gradient(180deg, rgba(10, 15, 30, 0.94), rgba(10, 15, 30, 0.98)); }
            .grid-mesh { background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 72px 72px; }
            .map-outline { opacity: 0.14; filter: drop-shadow(0 0 24px rgba(181, 23, 43, 0.28)); }
            .glass { backdrop-filter: blur(24px); background: rgba(8, 12, 20, 0.95); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 24px 80px rgba(0,0,0,0.28); }
            .text-gradient { background: linear-gradient(90deg, #b5172b, #f5a623); -webkit-background-clip: text; background-clip: text; color: transparent; }
            @keyframes drift { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -10px, 0); } }
            .floaty { animation: drift 8s ease-in-out infinite; }
        </style>
    </head>
    <body class="bg-[#0a0f1e] font-[Inter] text-slate-50 antialiased">
        @php
            $examCards = [
                ['name' => 'खरिदार', 'en' => 'Kharidar', 'level' => 'Assistant', 'service' => 'Administration / Accounts / Judiciary / Parliamentary', 'papers' => '3 Papers + Computer Test', 'vacancy' => 'High competition'],
                ['name' => 'नायब सुब्बा', 'en' => 'NaSu', 'level' => 'Assistant', 'service' => 'Administration / Accounts / Judiciary / Parliamentary', 'papers' => '3 Papers', 'vacancy' => 'Very competitive'],
                ['name' => 'शाखा अधिकृत', 'en' => 'Section Officer', 'level' => 'Officer', 'service' => 'Administration / Accounts / Foreign Affairs / Parliamentary', 'papers' => '4 Papers', 'vacancy' => 'Gazetted 3rd Class'],
                ['name' => 'प्राविधिक सहायक', 'en' => 'Technical Assistant', 'level' => 'Technical', 'service' => 'Engineering / Survey / Education / Statistics', 'papers' => '2-3 Papers', 'vacancy' => 'Service specific'],
                ['name' => 'कम्प्युटर अपरेटर', 'en' => 'Computer Operator', 'level' => 'Technical', 'service' => 'Office automation and typing test', 'papers' => '2 Papers + Skill Test', 'vacancy' => 'Limited openings'],
                ['name' => 'तथ्याङ्क अधिकृत', 'en' => 'Statistics Officer', 'level' => 'Technical', 'service' => 'Statistics and analytics', 'papers' => '3 Papers', 'vacancy' => 'Merit focused'],
            ];

            $notes = [
                ['title' => 'नेपाल सामान्य ज्ञान', 'tag' => 'GK'],
                ['title' => 'संविधानका मुख्य बुँदा', 'tag' => 'Constitution'],
                ['title' => 'शासन प्रणाली नोट्स', 'tag' => 'Governance'],
                ['title' => 'समसामयिक विषय', 'tag' => 'Current Affairs'],
                ['title' => 'अभिक्षमता सूत्र', 'tag' => 'Aptitude'],
                ['title' => 'कार्यालय व्यवस्थापन', 'tag' => 'Management'],
            ];
        @endphp

        <header class="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
            <div class="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-5">
                <a href="#top" class="flex items-center gap-3">
                    <span class="ls-logo font-[Plus_Jakarta_Sans] text-lg font-bold">LokSewa Pathshala</span>
                    <span class="flex flex-col leading-tight">
                        <span class="text-xs text-slate-400">लोकसेवाको सपना, हाम्रो मञ्च</span>
                    </span>
                </a>

                <nav class="hidden items-center gap-1 lg:flex">
                    <a href="#exams" class="ls-navlink rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white">Exams</a>
                    <a href="#notes" class="ls-navlink rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white">Notes</a>
                    <a href="#syllabus" class="ls-navlink rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white">Syllabus</a>
                    <a href="#results" class="ls-navlink rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white">Results</a>
                    <a href="#about" class="ls-navlink rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white">About</a>
                </nav>

                <a href="#exams" class="ls-cta">Start Preparing</a>
            </div>
        </header>

        <main id="top">
            <section class="hero-mesh relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:px-8 lg:px-10 lg:py-20">
                <div class="grid-mesh absolute inset-0 opacity-30 pointer-events-none"></div>
                <div class="relative mx-auto grid max-w-7xl gap-12 px-4 py-6 sm:px-6 lg:px-8 lg:py-0">
                    <div class="space-y-8 text-white">
                        <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white">
                            <span class="h-2 w-2 rounded-full bg-amber-400"></span>
                            Nepal's Loksewa exam preparation platform
                        </div>

                        <div class="space-y-5">
                            <p class="hero-tag font-[Tiro_Devanagari_Hindi]">लोकसेवाको सपना, हाम्रो मञ्च</p>
                            <h1 class="max-w-3xl hero-heading text-4xl sm:text-5xl lg:text-[clamp(2.5rem,6vw,5rem)]">
                                Clear Notes. Brilliant Structure. Pass Loksewa.
                            </h1>
                            <p class="max-w-2xl hero-sub sm:text-lg">
                                Organized study materials for Kharidar, NaSu, Section Officer, and technical posts with a focused, exam-first layout.
                            </p>
                        </div>

                        <div class="flex flex-wrap items-center gap-3">
                            <a href="#exams" class="btn-primary">Explore Exams</a>
                            <a href="#notes" class="btn-outline">View Notes</a>
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <div class="card-dark rounded-3xl px-5 py-4">
                                <div class="text-3xl font-semibold text-white">5</div>
                                <div class="mt-1 text-sm text-slate-300">Exam levels</div>
                            </div>
                            <div class="card-dark rounded-3xl px-5 py-4">
                                <div class="text-3xl font-semibold text-white">10+</div>
                                <div class="mt-1 text-sm text-slate-300">Service groups</div>
                            </div>
                            <div class="card-dark rounded-3xl px-5 py-4">
                                <div class="text-3xl font-semibold text-white">500+</div>
                                <div class="mt-1 text-sm text-slate-300">Study notes</div>
                            </div>
                            <div class="card-dark rounded-3xl px-5 py-4">
                                <div class="text-3xl font-semibold text-white">Free</div>
                                <div class="mt-1 text-sm text-slate-300">Starter access</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid gap-4 md:grid-cols-3">
                        <div class="card-dark rounded-[2rem] p-6">
                            <p class="text-sm uppercase tracking-[0.22em] text-slate-300">Featured exam</p>
                            <h2 class="mt-4 text-2xl font-semibold text-white">Section Officer</h2>
                            <p class="mt-2 text-sm leading-7 text-slate-300">Structured for level 7/8 aspirants with a focused and manageable study flow.</p>
                        </div>

                        <div class="card-dark rounded-[2rem] p-6">
                            <p class="text-sm uppercase tracking-[0.22em] text-slate-300">Study focus</p>
                            <h2 class="mt-4 text-2xl font-semibold text-white">Kharidar and NaSu</h2>
                            <p class="mt-2 text-sm leading-7 text-slate-300">A clean entry path for highly competitive assistant-level posts.</p>
                        </div>

                        <div class="card-dark rounded-[2rem] p-6">
                            <p class="text-sm uppercase tracking-[0.22em] text-slate-300">Why it feels better</p>
                            <p class="mt-4 text-lg leading-8 text-slate-200">The visual style is calmer, the text hierarchy is more readable, and the cards have enough breathing room to feel like a professional study product.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="exams" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Exam categories</p>
                        <h2 class="mt-2 font-[Plus_Jakarta_Sans] text-3xl font-semibold text-white">Built for the full Loksewa journey</h2>
                    </div>
                    <p class="max-w-2xl text-sm leading-7 text-slate-300">Each category uses a consistent structure so the page feels organized instead of crowded.</p>
                </div>

                <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    @foreach ($examCards as $exam)
                        <article class="group h-full rounded-[1.75rem] card-dark transition duration-300">
                            @php
                                $barColor = 'var(--blue)';
                                if ($exam['name'] === 'खरिदार') { $barColor = 'var(--red)'; }
                                elseif ($exam['name'] === 'नायब सुब्बा') { $barColor = 'var(--gold)'; }
                                elseif ($exam['name'] === 'शाखा अधिकृत') { $barColor = 'var(--blue)'; }
                                elseif ($exam['name'] === 'प्राविधिक सहायक') { $barColor = 'var(--green)'; }
                                elseif ($exam['name'] === 'कम्प्युटर अपरेटर') { $barColor = 'var(--purple)'; }
                                elseif ($exam['name'] === 'तथ्याङ्क अधिकृत') { $barColor = '#0891B2'; }
                            @endphp
                            <div class="card-topbar" style="background: {{ $barColor }};"></div>
                            <div class="p-4">
                            <div class="flex items-center justify-between gap-3">
                                <span class="badge-level px-3 py-1 text-xs font-medium">{{ $exam['level'] }}</span>
                                <span class="rounded-full bg-amber-600 px-3 py-1 text-xs font-medium text-white">2082 update</span>
                            </div>

                            <h3 class="mt-5 font-[Plus_Jakarta_Sans] text-2xl font-semibold text-white">{{ $exam['name'] }}</h3>
                            <p class="mt-1 text-sm text-slate-300">{{ $exam['en'] }}</p>
                            <p class="mt-4 text-sm leading-7 text-slate-300">{{ $exam['service'] }}</p>

                            <div class="mt-6 grid grid-cols-2 gap-3 text-sm">
                                <div class="rounded-2xl bg-white/5 p-3">
                                    <div class="text-slate-400">Papers</div>
                                    <div class="mt-1 font-semibold text-white">{{ $exam['papers'] }}</div>
                                </div>
                                <div class="rounded-2xl bg-white/5 p-3">
                                    <div class="text-slate-400">Competition</div>
                                    <div class="mt-1 font-semibold text-white">{{ $exam['vacancy'] }}</div>
                                </div>
                            </div>
                        </div>
                        </article>
                    @endforeach
                </div>
            </section>

            <section id="notes" class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div class="glass rounded-[2rem] p-8">
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Notes library</p>
                        <h2 class="mt-2 font-[Plus_Jakarta_Sans] text-3xl font-semibold text-white">Organized study notes that are easy to browse</h2>
                        <p class="mt-4 text-sm leading-7 text-slate-300">Quick-access notes for GK, Constitution, governance, current affairs, aptitude, office management, and more.</p>

                        <div class="mt-6 flex flex-wrap gap-2">
                            @foreach ($notes as $note)
                                <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white">{{ $note['tag'] }}</span>
                            @endforeach
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        @foreach ($notes as $note)
                            <article class="card-dark rounded-[1.5rem] p-5 transition hover:-translate-y-0.5">
                                <div class="text-xs uppercase tracking-[0.2em] text-slate-300">{{ $note['tag'] }}</div>
                                <h3 class="mt-3 text-lg font-semibold text-white">{{ $note['title'] }}</h3>
                                <p class="mt-3 text-sm leading-7 text-slate-300">Read and revise in a cleaner, exam-oriented format.</p>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section id="syllabus" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="grid gap-6 lg:grid-cols-3">
                    <article class="glass rounded-[1.75rem] p-6">
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Syllabus</p>
                        <h2 class="mt-2 text-2xl font-semibold text-white">Paper-by-paper structure</h2>
                        <p class="mt-4 text-sm leading-7 text-slate-300">Clear breakdowns for objective, governance, contemporary, and service-specific papers.</p>
                    </article>

                    <article class="glass rounded-[1.75rem] p-6">
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Update</p>
                        <h2 class="mt-2 text-2xl font-semibold text-white">Paper 1 passing score is 45/100</h2>
                        <p class="mt-4 text-sm leading-7 text-slate-300">For Section Officer 2081/82, Paper 1 is separate from the Paper 2 total.</p>
                    </article>

                    <article class="rounded-[1.75rem] border border-slate-900 bg-slate-900 p-6 text-white shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Download</p>
                        <h2 class="mt-2 text-2xl font-semibold">Old questions and notes archives</h2>
                        <p class="mt-4 text-sm leading-7 text-slate-300">Use the resources page links to study by year and by paper type.</p>
                    </article>
                </div>
            </section>

            <section id="results" class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div class="grid gap-6 lg:grid-cols-2">
                    <article class="glass rounded-[1.75rem] p-8">
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Results & notices</p>
                        <h2 class="mt-2 text-3xl font-semibold text-white">Always verify with psc.gov.np</h2>
                        <p class="mt-4 text-sm leading-7 text-slate-300">Use official PSC notices for result dates, vacancy information, and interview schedules.</p>
                        <a href="https://psc.gov.np" target="_blank" rel="noreferrer" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/10 underline-offset-4 transition hover:decoration-white">Open official website</a>
                    </article>

                    <article id="about" class="glass rounded-[1.75rem] p-8">
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">About</p>
                        <h2 class="mt-2 text-3xl font-semibold text-white">Built for serious aspirants</h2>
                        <p class="mt-4 text-sm leading-7 text-slate-300">LokSewa Pathshala is designed as a focused study space with bilingual support, organized exam flows, and a more polished visual language.</p>
                    </article>
                </div>
            </section>
        </main>

        <footer class="mt-8 border-t border-white/5 bg-transparent px-4 py-10 sm:px-6 lg:px-8">
            <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.25fr_1fr_1fr]">
                <div class="footer-content space-y-4">
                    <div>
                        <p class="font-[Plus_Jakarta_Sans] text-2xl font-semibold text-white">LokSewa Pathshala</p>
                        <p class="mt-2 max-w-xl text-sm leading-7 text-slate-300">Nepal's premium Loksewa preparation platform with notes, syllabus, and exam intelligence.</p>
                    </div>
                    <p class="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300"><span class="font-semibold text-white">2081 Ashadh 20</span> - latest syllabus update date</p>
                </div>

                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Quick Links</p>
                    <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <a href="#exams" class="rounded-2xl bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">Exams</a>
                        <a href="#notes" class="rounded-2xl bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">Notes</a>
                        <a href="#syllabus" class="rounded-2xl bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">Syllabus</a>
                        <a href="#results" class="rounded-2xl bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">Results</a>
                    </div>
                </div>

                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Official</p>
                    <a class="mt-4 inline-flex text-sm font-medium text-white underline decoration-white/10 underline-offset-4 transition hover:decoration-white" href="https://psc.gov.np" rel="noreferrer" target="_blank">psc.gov.np</a>
                </div>
            </div>
        </footer>
    </body>
</html>
