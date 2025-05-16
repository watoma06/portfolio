document.addEventListener('DOMContentLoaded', () => {
    // グローバル変数と定数
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const modalButtons = document.querySelectorAll('.button_details');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');
    let headerHeight = header ? header.offsetHeight : 0;

    // ヘッダーの高さが変更される可能性に対応
    window.addEventListener('resize', () => {
        if (header) {
            headerHeight = header.offsetHeight;
        }
    });

    // スムーズスクロール機能
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection && header) {
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ナビゲーションリンクのアクティブ化機能
    function initActiveNavLinks() {
        if (!header || navLinks.length === 0) return;

        const activateLink = (linkToActivate) => {
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('current'));
            if (linkToActivate) {
                linkToActivate.parentElement.classList.add('current');
            }
        };

        const onScroll = () => {
            let currentSectionId = '';
            // スクロール位置の計算にヘッダーの高さを加え、さらに20pxのオフセットを追加して判定を微調整
            const scrollPosition = window.scrollY + headerHeight + 20;

            sections.forEach(section => {
                if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            
            // Showcaseセクションまたは最初のセクションより上にいる場合の処理
            const firstSection = sections[0];
            if (firstSection && scrollPosition < firstSection.offsetTop + headerHeight) {
                 const showcaseLink = document.querySelector('header nav ul li a[href="#showcase"]');
                 activateLink(showcaseLink);
                 return; // showcaseがアクティブになったら以降の処理は不要
            }

            const activeNavLink = document.querySelector(`header nav ul li a[href="#${currentSectionId}"]`);
            activateLink(activeNavLink);
        };

        window.addEventListener('scroll', onScroll);
        onScroll(); // 初期ロード時にも実行して正しいリンクをハイライト
    }

    // お問い合わせフォームの送信処理
    function initContactForm() {
        if (contactForm && formFeedback) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                formFeedback.textContent = 'メッセージを送信しています...';
                formFeedback.className = ''; // クラスをリセット

                // AJAX通信をシミュレート
                setTimeout(() => {
                    formFeedback.textContent = 'メッセージが正常に送信されました。ありがとうございます！';
                    formFeedback.classList.add('success');
                    contactForm.reset(); // フォームをリセット
                }, 2000);
            });
        }
    }

    // モーダルウィンドウ機能
    function initModals() {
        modalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal-target');
                // data-modal-target属性は "#modal-id" の形式であると想定
                const modal = document.querySelector(modalId);
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // モーダルの外側をクリックしたときに閉じる
        window.addEventListener('click', (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // 初期化関数の呼び出し
    initSmoothScroll();
    initActiveNavLinks();
    initContactForm();
    initModals();
});