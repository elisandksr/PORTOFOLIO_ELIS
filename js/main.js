document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark/Light Mode)
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const icon = themeBtn.querySelector('i');

            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 3. Sticky Header
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If it's the skills section, animate progress bars
                if (entry.target.id === 'skills' || entry.target.querySelector('.skill-bar-fill')) {
                    const progressBars = entry.target.querySelectorAll('.skill-bar-fill');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 6. Showcase Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.querySelector('.tab-indicator');

    if (tabBtns.length > 0 && tabIndicator) {
        // Initialize indicator position
        setTimeout(() => {
            const activeBtn = document.querySelector('.tab-btn.active');
            if (activeBtn) {
                tabIndicator.style.width = `${activeBtn.offsetWidth}px`;
                tabIndicator.style.left = `${activeBtn.offsetLeft}px`;
            }
        }, 100);

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding pane
                const targetId = `tab-${btn.getAttribute('data-tab')}`;
                document.getElementById(targetId).classList.add('active');

                // Move indicator
                tabIndicator.style.width = `${btn.offsetWidth}px`;
                tabIndicator.style.left = `${btn.offsetLeft}px`;
            });
        });

        // Handle window resize for indicator
        window.addEventListener('resize', () => {
            const activeBtn = document.querySelector('.tab-btn.active');
            if (activeBtn && tabIndicator) {
                tabIndicator.style.width = `${activeBtn.offsetWidth}px`;
                tabIndicator.style.left = `${activeBtn.offsetLeft}px`;
            }
        });
    }

    // 7. Slider Arrows Logic
    const sliderWrappers = document.querySelectorAll('.slider-wrapper');
    sliderWrappers.forEach(wrapper => {
        const prevBtn = wrapper.querySelector('.prev-btn');
        const nextBtn = wrapper.querySelector('.next-btn');
        const grid = wrapper.querySelector('div[class$="-grid"]'); // Matches projects-grid, cert-grid, gallery-grid

        if (prevBtn && nextBtn && grid) {
            // Scroll Left
            prevBtn.addEventListener('click', () => {
                grid.scrollBy({ left: -380, behavior: 'smooth' });
            });

            // Scroll Right
            nextBtn.addEventListener('click', () => {
                grid.scrollBy({ left: 380, behavior: 'smooth' });
            });
        }
    });

    // 8. Universal Premium Modal Logic
    const premiumModal = document.getElementById('design-modal'); // Reusing ID for both
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalBadge = document.getElementById('modal-badge');
    const modalDesc = document.getElementById('modal-desc');
    const modalProjectDetails = document.getElementById('modal-project-details');
    const modalBgText = document.getElementById('modal-bg-text');
    const modalFeaturesList = document.getElementById('modal-features-list');
    const metaLabel1 = document.getElementById('meta-label-1');
    const metaValue1 = document.getElementById('meta-value-1');
    const metaLabel2 = document.getElementById('meta-label-2');
    const metaValue2 = document.getElementById('meta-value-2');

    const closeModalBtn = document.querySelector('.premium-close-btn');
    const modalAmbientBg = document.querySelector('.modal-ambient-bg');

    if (premiumModal && modalImg) {
        // --- Logic for Design Gallery Items ---
        const modalVideo = document.getElementById('modal-video');
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const img = item.querySelector('img').src;
                const title = item.querySelector('h4').innerText;
                const desc = item.getAttribute('data-desc') || 'Eksplorasi desain grafis dan kreatif.';
                const videoSrc = item.getAttribute('data-video');
                const ytSrc = item.getAttribute('data-youtube');

                // Reset modal content
                modalProjectDetails.style.display = 'none';
                modalDesc.style.display = 'block';
                
                const modalYoutube = document.getElementById('modal-youtube');

                // Toggle Video vs Image vs Youtube
                if (ytSrc && modalYoutube) {
                    modalImg.style.display = 'none';
                    if (modalVideo) {
                        modalVideo.style.display = 'none';
                        modalVideo.pause();
                        modalVideo.src = "";
                    }
                    modalYoutube.style.display = 'block';
                    modalYoutube.src = ytSrc;
                } else if (videoSrc && modalVideo) {
                    modalImg.style.display = 'none';
                    if (modalYoutube) {
                        modalYoutube.style.display = 'none';
                        modalYoutube.src = "";
                    }
                    modalVideo.style.display = 'block';
                    modalVideo.src = videoSrc;
                    modalVideo.play();
                } else {
                    modalImg.style.display = 'block';
                    if (modalVideo) {
                        modalVideo.style.display = 'none';
                        modalVideo.pause();
                        modalVideo.src = "";
                    }
                    if (modalYoutube) {
                        modalYoutube.style.display = 'none';
                        modalYoutube.src = "";
                    }
                    modalImg.src = img;
                }

                const category = item.getAttribute('data-category') || 'Creative Design';
                const tools = item.getAttribute('data-tools') || 'Adobe Suite / Figma';

                modalTitle.innerText = title;
                modalBadge.innerText = 'Design Project';
                modalDesc.innerText = desc;
                
                // Meta info
                metaLabel1.innerText = 'Kategori';
                metaValue1.innerText = category;
                metaLabel2.innerText = 'Alat';
                metaValue2.innerText = tools;

                // Restore meta visibility and layout
                if (metaLabel2 && metaLabel2.parentElement) {
                    metaLabel2.parentElement.style.display = 'flex';
                }
                const modalMeta = document.querySelector('.modal-meta');
                if (modalMeta) {
                    modalMeta.style.gridTemplateColumns = '1fr 1fr';
                }
                
                openModal(img);
            });
        });

        // --- Logic for Project Showcase Cards ---
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't open modal if clicking the GitHub link icon
                if (e.target.closest('.btn-icon')) return;

                const img = card.querySelector('.project-img').src;
                const title = card.querySelector('.project-title').innerText;
                const desc = card.querySelector('.project-desc').innerText;
                const type = card.getAttribute('data-type') || 'Proyek';
                const background = card.getAttribute('data-bg');
                const features = card.getAttribute('data-features') ? card.getAttribute('data-features').split(',') : [];
                const tech = card.getAttribute('data-tech') || '';

                // Show project specific fields
                modalProjectDetails.style.display = 'block';
                modalDesc.style.display = 'block'; // Still show short desc

                // Set contents
                modalImg.src = img;
                modalTitle.innerText = title;
                modalBadge.innerText = type;
                modalDesc.innerText = desc;

                // Project Details
                modalBgText.innerText = background || 'Informasi latar belakang tidak tersedia.';

                // Features List
                modalFeaturesList.innerHTML = '';
                features.forEach(feat => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${feat.trim()}`;
                    modalFeaturesList.appendChild(li);
                });

                // Meta info
                metaLabel1.innerText = 'Tech Stack';
                metaValue1.innerText = tech;
                
                // Hide second meta for projects
                if (metaLabel2 && metaLabel2.parentElement) {
                    metaLabel2.parentElement.style.display = 'none';
                }
                
                // Ensure meta-item 1 is full width or adjust grid
                const modalMeta = document.querySelector('.modal-meta');
                if (modalMeta) {
                    modalMeta.style.gridTemplateColumns = '1fr';
                }

                openModal(img);
            });
        });

        function openModal(imgSrc) {
            if (modalAmbientBg) {
                modalAmbientBg.style.backgroundImage = `url(${imgSrc})`;
            }
            premiumModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }

        function closeModal() {
            premiumModal.classList.remove('show');
            document.body.style.overflow = '';
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.src = "";
            }
            const modalYoutube = document.getElementById('modal-youtube');
            if (modalYoutube) {
                modalYoutube.src = "";
            }
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === premiumModal) {
                closeModal();
            }
        });

        // ESC key to close
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && premiumModal.classList.contains('show')) {
                closeModal();
            }
        });
    }

});
