import glslify from 'glslify';


export const fragment = () =>{
    return glslify`
        uniform sampler2D image;
        varying vec2 vUv;

        void main() {
            vec4 color = texture2D(image, vUv);

            gl_FragColor = color;
        }
    `;
}