import svgIcon from '@/components/svg_icon/index.vue'
const svgRequired = require.context('./svg',false,/\.svg$/)
svgRequired.keys().map(item => svgRequired(item));
export default (app) => {
    app.component('svg-icon',svgIcon)
}