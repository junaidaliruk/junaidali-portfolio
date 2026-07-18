/**
 * BottomBlur — Progressive blur overlay at bottom of viewport.
 * Matches Studio Nika's frosted glass depth effect.
 *
 * - Fixed position at bottom
 * - 8 layers with increasing blur
 * - Gradient masks for smooth falloff
 * - Pointer-events: none (non-interactive)
 */

const BLUR_LAYERS = [
  { blur: 0.078, maskStart: 0, maskEnd: 37.5 },
  { blur: 0.156, maskStart: 12.5, maskEnd: 50 },
  { blur: 0.312, maskStart: 25, maskEnd: 62.5 },
  { blur: 0.625, maskStart: 37.5, maskEnd: 75 },
  { blur: 1.25, maskStart: 50, maskEnd: 87.5 },
  { blur: 2.5, maskStart: 62.5, maskEnd: 100 },
  { blur: 5, maskStart: 75, maskEnd: 112.5 },
  { blur: 10, maskStart: 87.5, maskEnd: 125 },
];

export function BottomBlur() {
  return (
    <div className="bottom-blur" aria-hidden="true">
      {BLUR_LAYERS.map((layer, i) => (
        <div
          key={i}
          className="bottom-blur__layer"
          style={{
            zIndex: i + 1,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: `linear-gradient(to bottom, rgba(0,0,0,0) ${layer.maskStart}%, rgba(0,0,0,1) ${layer.maskStart + 12.5}%, rgba(0,0,0,1) ${layer.maskEnd - 12.5}%, rgba(0,0,0,0) ${layer.maskEnd}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,0) ${layer.maskStart}%, rgba(0,0,0,1) ${layer.maskStart + 12.5}%, rgba(0,0,0,1) ${layer.maskEnd - 12.5}%, rgba(0,0,0,0) ${layer.maskEnd}%)`,
          }}
        />
      ))}
    </div>
  );
}
