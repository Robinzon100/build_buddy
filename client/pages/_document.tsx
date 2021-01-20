import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {


  render() {
    return (
      <Html>
        <Head>
{/* 
        <script id="vertexShader" type="x-shader/x-vertex" dangerouslySetInnerHTML={{
            __html:`
            uniform float time;
            uniform vec2 resolution;
            void main()	{
              gl_Position = vec4( position, 1.0 );
            }`
        }}/>
       
      
      <script id="fragmentShader" type="x-shader/x-fragment" dangerouslySetInnerHTML={{
          __html:`
            uniform float time;
            uniform vec2 resolution;
            void main()	{
                float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
                float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
                gl_FragColor = vec4(vec3(min(x, y)), 1.);
            }`
      }}/> */}
        
      

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument