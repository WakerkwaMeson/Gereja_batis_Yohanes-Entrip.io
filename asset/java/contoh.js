   // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {
            // Create piano keys
            const piano = document.getElementById('piano');
            const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];
            const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#'];
            
            // Create white keys
            whiteKeys.forEach((note, index) => {
                const key = document.createElement('div');
                key.className = 'piano-key white';
                key.style.left = `${index * 35}px`;
                key.dataset.note = note;
                piano.appendChild(key);
            });
            
            // Create black keys
            blackKeys.forEach((note, index) => {
                if (note) {
                    const key = document.createElement('div');
                    key.className = 'piano-key black';
                    key.style.left = `${index * 35 + 20}px`;
                    key.dataset.note = note;
                    piano.appendChild(key);
                }
            });
            
            // Create particles
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 10}s`;
                particle.style.animationDuration = `${10 + Math.random() * 10}s`;
                particlesContainer.appendChild(particle);
            }
            
            // Animate piano keys randomly
            function animateRandomKey() {
                const keys = document.querySelectorAll('.piano-key');
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                randomKey.classList.add('active');
                
                setTimeout(() => {
                    randomKey.classList.remove('active');
                }, 300);
                
                setTimeout(animateRandomKey, 500 + Math.random() * 2000);
            }
            
            // Start piano animation
            setTimeout(animateRandomKey, 1000);
            
            // Hide loader when page is fully loaded
            window.addEventListener('load', function() {
                const loader = document.querySelector('.loader');
                loader.classList.add('hidden');
            });

            // Mobile menu toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links li a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                });
            });

            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Animate elements on scroll
            const animateElements = document.querySelectorAll('.animate');
            
            function animateOnScroll() {
                animateElements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on page load

            // Tab functionality for agenda section
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabBtns.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Gallery filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Remove active class from all buttons
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Filter gallery items
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Lightbox functionality
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxTitle = document.getElementById('lightbox-title');
            const lightboxDescription = document.getElementById('lightbox-description');
            const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
            const closeLightbox = document.querySelector('.close-lightbox');
            
            galleryItems.forEach(item => {
                const img = item.querySelector('img');
                const title = item.getAttribute('data-title');
                const description = item.getAttribute('data-description');
                
                img.addEventListener('click', function() {
                    lightbox.classList.add('active');
                    lightboxImg.src = this.src;
                    lightboxTitle.textContent = title;
                    lightboxDescription.textContent = description;
                    lightboxDownloadBtn.href = this.src;
                    lightboxDownloadBtn.download = title + '.jpg';
                });
            });
            
            closeLightbox.addEventListener('click', function() {
                lightbox.classList.remove('active');
            });
            
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
                    
                    // Create a temporary link element to trigger download
                    const link = document.createElement('a');
                    link.href = img.src;
                    link.download = title + '.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            });
            
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const item = this.closest('.gallery-item');
                    
                    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                        item.style.transform = 'scale(0)';
                        item.style.opacity = '0';
                        
                        setTimeout(() => {
                            item.remove();
                            showNotification('Foto berhasil dihapus!');
                        }, 300);
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
            
            uploadModal.addEventListener('click', function(e) {
                if (e.target === uploadModal) {
                    uploadModal.classList.remove('active');
                    resetUploadForm();
                }
            });
            
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', function() {
                const file = this.files[0];
                
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        previewImg.src = e.target.result;
                        imagePreview.classList.add('active');
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            uploadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const title = document.getElementById('imgTitle').value;
                const category = document.getElementById('imgCategory').value;
                const description = document.getElementById('imgDescription').value;
                const imgSrc = previewImg.src;
                
                if (!imgSrc) {
                    showNotification('Silakan pilih gambar terlebih dahulu!', 'error');
                    return;
                }
                
                // Create new gallery item
                const galleryGrid = document.getElementById('galleryGrid');
                const newItem = document.createElement('div');
                newItem.className = 'gallery-item';
                newItem.setAttribute('data-category', category);
                newItem.setAttribute('data-title', title);
                newItem.setAttribute('data-description', description);
                
                newItem.innerHTML = `
                    <img src="${imgSrc}" alt="${title}">
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
                const newImg = newItem.querySelector('img');
                newImg.addEventListener('click', function() {
                    lightbox.classList.add('active');
                    lightboxImg.src = this.src;
                    lightboxTitle.textContent = title;
                    lightboxDescription.textContent = description;
                    lightboxDownloadBtn.href = this.src;
                    lightboxDownloadBtn.download = title + '.jpg';
                });
                
                const newDownloadBtn = newItem.querySelector('.gallery-action-btn.download');
                newDownloadBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = imgSrc;
                    link.download = title + '.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
                
                const newDeleteBtn = newItem.querySelector('.gallery-action-btn.delete');
                newDeleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                        newItem.style.transform = 'scale(0)';
                        newItem.style.opacity = '0';
                        
                        setTimeout(() => {
                            item.remove();
                            showNotification('Foto berhasil dihapus!');
                        }, 300);
                    }
                });
                
                // Add to gallery
                galleryGrid.appendChild(newItem);
                
                // Close modal and reset form
                uploadModal.classList.remove('active');
                resetUploadForm();
                
                // Show notification
                showNotification('Foto berhasil diupload!');
            });
            
            function resetUploadForm() {
                uploadForm.reset();
                imagePreview.classList.remove('active');
                previewImg.src = '';
            }

            // Notification function
            function showNotification(message, type = 'success') {
                const notification = document.getElementById('notification');
                const notificationText = document.getElementById('notificationText');
                const notificationIcon = notification.querySelector('i');
                
                notificationText.textContent = message;
                
                if (type === 'error') {
                    notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                    notificationIcon.className = 'fas fa-exclamation-circle';
                } else {
                    notification.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                    notificationIcon.className = 'fas fa-check-circle';
                }
                
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }

            // Drag and drop functionality for upload area
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = '#3498db';
                this.style.background = 'rgba(52, 152, 219, 0.1)';
            });
            
            uploadArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                this.style.background = 'rgba(52, 58, 88, 0.5)';
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                this.style.background = 'rgba(52, 58, 88, 0.5)';
                
                const files = e.dataTransfer.files;
                
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    fileInput.files = files;
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        previewImg.src = e.target.result;
                        imagePreview.classList.add('active');
                    };
                    
                    reader.readAsDataURL(files[0]);
                }
            });
        });