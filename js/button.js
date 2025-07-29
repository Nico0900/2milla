document.querySelector('button').addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.08) rotate(-2deg)';
});
document.querySelector('button').addEventListener('mouseout', function () {
    this.style.transform = '';
});