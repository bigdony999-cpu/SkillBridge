// ===========================
// 🔍 SEARCH FILTER
// ===========================
const searchInput = document.querySelector('.search-bar input');

if (searchInput) {
  searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
          const listings = document.querySelectorAll('.listing-item');

              listings.forEach(function (listing) {
                    const title = listing.querySelector('h3').textContent.toLowerCase();
                          const desc = listing.querySelector('p').textContent.toLowerCase();

                                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                                        listing.style.display = 'block';
                                              } else {
                                                      listing.style.display = 'none';
                                                            }
                                                                });
                                                                  });
                                                                  }

                                                                  // ===========================
                                                                  // 🏷️ CATEGORY FILTER
                                                                  // ===========================
                                                                  const filterBtns = document.querySelectorAll('.filter-btn');

                                                                  filterBtns.forEach(function (btn) {
                                                                    btn.addEventListener('click', function () {

                                                                        // Remove active from all buttons
                                                                            filterBtns.forEach(b => b.classList.remove('active'));
                                                                                this.classList.add('active');

                                                                                    const category = this.textContent.trim();
                                                                                        const listings = document.querySelectorAll('.listing-item');

                                                                                            listings.forEach(function (listing) {
                                                                                                  const tag = listing.querySelector('.tag').textContent.trim();

                                                                                                        if (category === 'All' || tag === category) {
                                                                                                                listing.style.display = 'block';
                                                                                                                      } else {
                                                                                                                              listing.style.display = 'none';
                                                                                                                                    }
                                                                                                                                        });
                                                                                                                                          });
                                                                                                                                          });

                                                                                                                                          // ===========================
                                                                                                                                          // ✅ SIGNUP VALIDATION
                                                                                                                                          // ===========================
                                                                                                                                          const signupBtn = document.querySelector('.signup-btn');

                                                                                                                                          if (signupBtn) {
                                                                                                                                            signupBtn.addEventListener('click', function () {
                                                                                                                                                const name = document.querySelector('input[type="text"]').value.trim();
                                                                                                                                                    const email = document.querySelector('input[type="email"]').value.trim();
                                                                                                                                                        const password = document.querySelector('input[type="password"]').value.trim();
                                                                                                                                                            const select = document.querySelector('select').value;

                                                                                                                                                                if (!name || !email || !password || !select) {
                                                                                                                                                                      alert('⚠️ Please fill in all fields before continuing!');
                                                                                                                                                                            return;
                                                                                                                                                                                }

                                                                                                                                                                                    alert('🎉 Welcome to SkillBridge, ' + name + '! Your account is ready!');
                                                                                                                                                                                      });
                                                                                                                                                                                      }
