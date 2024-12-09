function setRootFontSize() {
    const baseSize = 16; // 定义基础的 font-size，比如 16px
    const scale = window.innerWidth / 1920; // 根据设计稿宽度调整比例, 这里假设设计稿宽度是 1440px
    document.documentElement.style.fontSize = baseSize * scale + 'px';
}

// 初始化时设置根字体大小
setRootFontSize();

// 监听窗口大小变化，动态调整根字体大小
window.addEventListener('resize', setRootFontSize);