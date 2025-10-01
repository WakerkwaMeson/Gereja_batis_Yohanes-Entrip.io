
        // Document ready function
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loader when page is loaded
            window.addEventListener('load', function() {
                setTimeout(function() {
                    document.getElementById('loader').classList.add('hidden');
                }, 500);
            });

            // Create piano keys
            const piano = document.getElementById('piano');
            const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
            const blackKeys = [1, 3, 6, 8, 10, 13];
            
            keys.forEach((key, index) => {
                const keyElement = document.createElement('div');
                keyElement.classList.add('key');
                
                if (blackKeys.includes(index)) {
                    keyElement.classList.add('black');
                }
                
                piano.appendChild(keyElement);
            });

            // Create music particles
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                
                // Random animation duration
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                
                // Random animation delay
                particle.style.animationDelay = Math.random() * 20 + 's';
                
                particlesContainer.appendChild(particle);
            }

            // Create music notes
            const musicNotes = document.querySelectorAll('.note');
            musicNotes.forEach(note => {
                // Random position
                note.style.left = Math.random() * 100 + '%';
                
                // Random animation duration
                note.style.animationDuration = (Math.random() * 20 + 15) + 's';
                
                // Random animation delay
                note.style.animationDelay = Math.random() * 20 + 's';
            });

            // Music Player Functionality
            const musicBtn = document.getElementById('musicBtn');
            const musicIcon = document.getElementById('musicIcon');
            const bgMusic = document.getElementById('bgMusic');
            const musicProgressBar = document.getElementById('musicProgressBar');
            let isPlaying = false;

            // Initialize music player
            function initMusicPlayer() {
                // Set volume to 30%
                bgMusic.volume = 0.3;
                
                // Update progress bar as music plays
                bgMusic.addEventListener('timeupdate', function() {
                    if (bgMusic.duration) {
                        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
                        musicProgressBar.style.width = progress + '%';
                    }
                });
                
                // Reset progress when music ends
                bgMusic.addEventListener('ended', function() {
                    musicProgressBar.style.width = '0%';
                    musicIcon.classList.remove('fa-pause');
                    musicIcon.classList.add('fa-play');
                    musicBtn.classList.remove('playing');
                    isPlaying = false;
                });
            }

            // Toggle music play/pause
            musicBtn.addEventListener('click', function() {
                if (isPlaying) {
                    bgMusic.pause();
                    musicIcon.classList.remove('fa-pause');
                    musicIcon.classList.add('fa-play');
                    musicBtn.classList.remove('playing');
                } else {
                    bgMusic.play().catch(e => {
                        console.log("Autoplay prevented:", e);
                        showNotification("Silakan klik tombol play untuk memulai musik");
                    });
                    musicIcon.classList.remove('fa-play');
                    musicIcon.classList.add('fa-pause');
                    musicBtn.classList.add('playing');
                }
                isPlaying = !isPlaying;
            });

            // Initialize music player
            initMusicPlayer();

            // Side Navigation - Perbaikan menu hamburger
            const menuToggle = document.getElementById('menuToggle');
            const sideNav = document.getElementById('sideNav');
            const sideNavClose = document.getElementById('sideNavClose');
            
            // Fungsi untuk membuka side navigation
            function openSideNav() {
                sideNav.classList.add('active');
                document.body.style.overflow = 'hidden'; // Mencegah scroll saat menu terbuka
            }
            
            // Fungsi untuk menutup side navigation
            function closeSideNav() {
                sideNav.classList.remove('active');
                document.body.style.overflow = 'auto'; // Mengembalikan scroll saat menu tertutup
            }
            
            // Event listener untuk menu toggle
            menuToggle.addEventListener('click', openSideNav);
            
            // Event listener untuk close button
            sideNavClose.addEventListener('click', closeSideNav);
            
            // Close side nav when clicking on a link
            const sideNavLinks = sideNav.querySelectorAll('.nav-links a');
            sideNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeSideNav();
                });
            });
            
            // Close side nav when clicking outside the menu
            document.addEventListener('click', function(event) {
                if (!sideNav.contains(event.target) && !menuToggle.contains(event.target)) {
                    if (sideNav.classList.contains('active')) {
                        closeSideNav();
                    }
                }
            });

            // Smooth scrolling for navigation links
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
            });

            // Back to top button
            const backToTop = document.getElementById('backToTop');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });
            
            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Counter animation
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            const countUp = () => {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(countUp, 10);
                    } else {
                        counter.innerText = target;
                    }
                });
            };
            
            // Trigger counter animation when stats section is in view
            const statsSection = document.querySelector('.stats-section');
            const observerOptions = {
                threshold: 0.5
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        countUp();
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            observer.observe(statsSection);

            // Animation on scroll
            const animateElements = document.querySelectorAll('.animate');
            
            function checkAnimate() {
                animateElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', checkAnimate);
            checkAnimate(); // Check on load

            // Tab functionality for agenda section
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Gallery filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            const gallerySearch = document.getElementById('gallerySearch');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Filter gallery items
                    filterGalleryItems(filter, gallerySearch.value);
                });
            });
            
            // Gallery search functionality
            gallerySearch.addEventListener('input', function() {
                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                filterGalleryItems(activeFilter, this.value);
            });
            
            function filterGalleryItems(filter, searchTerm) {
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const title = item.getAttribute('data-title').toLowerCase();
                    const description = item.getAttribute('data-description').toLowerCase();
                    const searchLower = searchTerm.toLowerCase();
                    
                    const matchesFilter = filter === 'all' || category === filter;
                    const matchesSearch = title.includes(searchLower) || description.includes(searchLower);
                    
                    if (matchesFilter && matchesSearch) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            // Lightbox functionality
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxTitle = document.getElementById('lightbox-title');
            const lightboxDescription = document.getElementById('lightbox-description');
            const closeLightbox = document.querySelector('.close-lightbox');
            const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
            
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const img = this.querySelector('img');
                    const title = this.getAttribute('data-title');
                    const description = this.getAttribute('data-description');
                    
                    lightboxImg.src = img.src;
                    lightboxTitle.textContent = title;
                    lightboxDescription.textContent = description;
                    
                    lightbox.classList.add('active');
                    
                    // Set download button href
                    lightboxDownloadBtn.setAttribute('href', img.src);
                    lightboxDownloadBtn.setAttribute('download', title + '.jpg');
                });
            });
            
            closeLightbox.addEventListener('click', function() {
                lightbox.classList.remove('active');
            });
            
            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });

            // Gallery item actions
            const downloadBtns = document.querySelectorAll('.gallery-action-btn.download');
            const deleteBtns = document.querySelectorAll('.gallery-action-btn.delete');
            
            downloadBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const item = this.closest('.gallery-item');
                    const img = item.querySelector('img');
                    const title = item.getAttribute('data-title');
                    
                    // Create a temporary link to download the image
                    const link = document.createElement('a');
                    link.href = img.src;
                    link.download = title + '.jpg';
                    link.click();
                });
            });
            
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const item = this.closest('.gallery-item');
                    
                    // Add confirmation before deletion
                    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                        item.remove();
                        showNotification('Foto berhasil dihapus!');
                    }
                });
            });

            // Upload modal functionality
            const uploadBtn = document.getElementById('uploadBtn');
            const uploadModal = document.getElementById('uploadModal');
            const closeModal = document.querySelector('.close');
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');
            const imagePreview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            const uploadForm = document.getElementById('uploadForm');
            
            uploadBtn.addEventListener('click', function() {
                uploadModal.classList.add('active');
            });
            
            closeModal.addEventListener('click', function() {
                uploadModal.classList.remove('active');
                resetUploadForm();
            });
            
            // Close modal when clicking outside
            uploadModal.addEventListener('click', function(e) {
                if (e.target === uploadModal) {
                    uploadModal.classList.remove('active');
                    resetUploadForm();
                }
            });
            
            // Upload area click to open file input
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            // Drag and drop functionality
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = '#3498db';
                this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            });
            
            uploadArea.addEventListener('dragleave', function() {
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'transparent';
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'transparent';
                
                const files = e.dataTransfer.files;
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    handleFileUpload(files[0]);
                }
            });
            
            // File input change
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    handleFileUpload(this.files[0]);
                }
            });
            
            // Handle file upload
            function handleFileUpload(file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    imagePreview.classList.add('active');
                };
                
                reader.readAsDataURL(file);
            }
            
            // Form submission
            uploadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const title = document.getElementById('imgTitle').value;
                const category = document.getElementById('imgCategory').value;
                const description = document.getElementById('imgDescription').value;
                
                if (previewImg.src && title && category) {
                    // Create new gallery item
                    const newItem = document.createElement('div');
                    newItem.classList.add('gallery-item');
                    newItem.setAttribute('data-category', category);
                    newItem.setAttribute('data-title', title);
                    newItem.setAttribute('data-description', description);
                    
                    newItem.innerHTML = `
                        <img src="${previewImg.src}" alt="${title}">
                        <div class="gallery-overlay">
                            <h4>${title}</h4>
                            <p>${description}</p>
                        </div>
                        <div class="gallery-actions">
                            <button class="gallery-action-btn download" title="Download">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="gallery-action-btn delete" title="Hapus">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    
                    // Add event listeners to new item
                    newItem.addEventListener('click', function() {
                        lightboxImg.src = previewImg.src;
                        lightboxTitle.textContent = title;
                        lightboxDescription.textContent = description;
                        lightbox.classList.add('active');
                        
                        lightboxDownloadBtn.setAttribute('href', previewImg.src);
                        lightboxDownloadBtn.setAttribute('download', title + '.jpg');
                    });
                    
                    newItem.querySelector('.download').addEventListener('click', function(e) {
                        e.stopPropagation();
                        const link = document.createElement('a');
                        link.href = previewImg.src;
                        link.download = title + '.jpg';
                        link.click();
                    });
                    
                    newItem.querySelector('.delete').addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                            newItem.remove();
                            showNotification('Foto berhasil dihapus!');
                        }
                    });
                    
                    // Add to gallery
                    document.getElementById('galleryGrid').appendChild(newItem);
                    
                    // Close modal and reset form
                    uploadModal.classList.remove('active');
                    resetUploadForm();
                    
                    // Show notification
                    showNotification('Foto berhasil diupload!');
                }
            });
            
            // Reset upload form
            function resetUploadForm() {
                uploadForm.reset();
                imagePreview.classList.remove('active');
                previewImg.src = '';
            }
            
            // Show notification
            function showNotification(message) {
                const notification = document.getElementById('notification');
                const notificationText = document.getElementById('notificationText');
                
                notificationText.textContent = message;
                notification.classList.add('active');
                
                setTimeout(function() {
                    notification.classList.remove('active');
                }, 3000);
            }
        });
    