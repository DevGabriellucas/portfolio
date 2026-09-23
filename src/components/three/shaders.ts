// Simplex noise 3D — Ashima Arts / Stefan Gustavson (licenca MIT).
const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uEnergy;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uAspect;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uTint;
uniform float uTintMix;

attribute float aRandom;
attribute float aScale;

varying vec3 vColor;
varying float vAlpha;

${simplexNoise}

void main() {
  vec3 p = position;
  float t = uTime * 0.22;

  // Respiracao organica: cada ponto oscila na direcao radial.
  float n = snoise(p * 0.55 + vec3(t, t * 0.8, -t * 0.6));
  vec3 dir = normalize(p + vec3(0.0001));
  p += dir * n * (0.05 + uEnergy * 0.45);

  // Turbulencia durante o morph e no scroll rapido.
  vec3 q = p * 1.3 + aRandom * 7.0 + t * 2.0;
  p += vec3(snoise(q), snoise(q.yzx + 17.0), snoise(q.zxy - 31.0)) * uEnergy * 0.42;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mv;

  // Repulsao do cursor, calculada em espaco de tela.
  vec2 ndc = clip.xy / clip.w;
  vec2 d = ndc - uPointer;
  d.x *= uAspect;
  float dist = length(d);
  float force = (1.0 - smoothstep(0.0, 0.3, dist)) * uPointerStrength;
  vec2 push = d / max(dist, 0.0001) * force * 0.12;
  push.x /= uAspect;
  clip.xy += push * clip.w;
  gl_Position = clip;

  float twinkle = 0.8 + 0.2 * sin(uTime * (1.2 + aRandom * 2.4) + aRandom * 40.0);
  gl_PointSize = uSize * aScale * uPixelRatio * twinkle / -mv.z;

  float h = clamp(position.y * 0.26 + 0.5 + (aRandom - 0.5) * 0.4, 0.0, 1.0);
  vec3 base = mix(uColorA, uColorB, h);
  base = mix(base, uColorC, smoothstep(0.84, 1.0, aRandom));
  vColor = mix(base, uTint, uTintMix * (0.7 + 0.3 * aRandom));
  vAlpha = (0.5 + 0.5 * aRandom) * (1.0 + force * 1.2);
}
`;

export const particleFragment = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float glow = pow(1.0 - d * 2.0, 2.2);
  gl_FragColor = vec4(vColor * (0.7 + glow * 1.15), glow * vAlpha * uOpacity);
  #include <colorspace_fragment>
}
`;

export const starVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSize;
attribute float aRandom;
varying float vAlpha;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio * (18.0 / -mv.z);
  vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * (0.5 + aRandom) + aRandom * 50.0));
}
`;

export const starFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = pow(1.0 - d * 2.0, 1.8);
  gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  #include <colorspace_fragment>
}
`;
