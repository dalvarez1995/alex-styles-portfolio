// scripts.js - Interactive features for Alex Styles Portfolio

document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" tabindex="0">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    modal.style.display = 'none';
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
    modal.querySelector('.close-btn').addEventListener('click', closeModal);
    modal.querySelector('.close-btn').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') closeModal();
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Portfolio modal open
    document.querySelectorAll('.portfolio-item').forEach(function(item, idx) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const projectTitle = item.querySelector('span').textContent;
            const projectImg = item.querySelector('img').src;
            modal.querySelector('.modal-body').innerHTML = `
                <h3>${projectTitle}</h3>
                <img src="${projectImg}" alt="${projectTitle}" style="width:100%;border-radius:8px;margin-bottom:1rem;" />
                <p>This is a detailed description for <strong>${projectTitle}</strong>. Add your project details here to impress potential clients!</p>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Tooltips for nav links
    document.querySelectorAll('nav a').forEach(function(link) {
        const tooltipText = link.textContent;
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        link.appendChild(tooltip);
        link.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
        });
        link.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
        link.addEventListener('focus', function() {
            tooltip.style.opacity = '1';
        });
        link.addEventListener('blur', function() {
            tooltip.style.opacity = '0';
        });
    });
});
