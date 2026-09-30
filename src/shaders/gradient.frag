uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {

    vec2 uv = vUv * 2.0 - 1.0;
uv.x *= uResolution.x / uResolution.y;

    float d = -uTime * 0.5;
    float a = 0.0;

    for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
    }

    d += uTime * 0.5;

    vec3 col = vec3(
        cos(uv * vec2(d, a)) * 1.0 + 1.0,
        cos(a + d) * 0.5 + 0.5
    );

    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);

    float gray = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 tint = vec3(0.9, 0.95, 1.2);

    col = mix(vec3(gray) * tint, col, 0.0);

    gl_FragColor = vec4(col, 1.0);
}