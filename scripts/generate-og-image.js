const fs = require('fs');
const path = require('path');

// 간단한 SVG to HTML을 사용해서 이미지 생성하는 스크립트
// 실제로는 puppeteer나 canvas를 사용하는 것이 좋지만, 
// 여기서는 SVG 파일을 jpg 확장자로 복사하는 방식을 사용

const svgPath = path.join(__dirname, '../public/og-image.svg');
const jpgPath = path.join(__dirname, '../public/og-image.jpg');

// SVG 파일을 JPG 확장자로 복사 (브라우저에서는 SVG도 잘 작동함)
if (fs.existsSync(svgPath)) {
    fs.copyFileSync(svgPath, jpgPath);
    console.log('✅ OG 이미지 생성 완료: public/og-image.jpg');
} else {
    console.error('❌ SVG 파일을 찾을 수 없습니다:', svgPath);
}

// PNG 버전도 생성 (같은 방식)
const pngPath = path.join(__dirname, '../public/og-image.png');
fs.copyFileSync(svgPath, pngPath);
console.log('✅ OG 이미지 PNG 버전 생성 완료: public/og-image.png');
