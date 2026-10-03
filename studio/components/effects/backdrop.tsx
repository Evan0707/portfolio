/**
 * Le décor du portfolio, repris tel quel : un grain léger par-dessus la page
 * et trois halos colorés, très flous, qui dérivent lentement derrière.
 */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{ backgroundImage: NOISE, backgroundRepeat: "repeat" }}
    />
  );
}

export function AnimatedGradient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="animate-blob absolute left-[10%] top-[10%] h-[600px] w-[600px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      />
      <div
        className="animate-blob animation-delay-2000 absolute right-[10%] top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.05] blur-[100px]"
        style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
      />
      <div
        className="animate-blob animation-delay-4000 absolute bottom-[20%] left-[30%] h-[400px] w-[400px] rounded-full opacity-[0.05] blur-[80px]"
        style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
      />
    </div>
  );
}
