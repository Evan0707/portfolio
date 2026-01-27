"use client"

export default function AnimatedGradient() {
 return (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
   {/* Gradient blob 1 */}
   <div
    className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] animate-blob"
    style={{
     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
     top: '10%',
     left: '10%',
    }}
   />

   {/* Gradient blob 2 */}
   <div
    className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px] animate-blob animation-delay-2000"
    style={{
     background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
     top: '50%',
     right: '10%',
    }}
   />

   {/* Gradient blob 3 */}
   <div
    className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px] animate-blob animation-delay-4000"
    style={{
     background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
     bottom: '20%',
     left: '30%',
    }}
   />
  </div>
 )
}
