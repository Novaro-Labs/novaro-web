export default {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 16, // 根元素字体大小，通常是16px
            propList: ['*'], // 需要转换的属性，*表示所有属性都转换
            unitPrecision: 5, // 保留的小数位数
            selectorBlackList: [], // 要忽略的选择器
            replace: true, // 替换而不是添加 fallback
            mediaQuery: false, // 是否转换媒体查询中的 px
            minPixelValue: 0 // 最小的需要转换的 px 值
        },
        tailwindcss: {},
        autoprefixer: {},
    },
};

