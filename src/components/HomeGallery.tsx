"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * HOME GALLERY
 * /public/images/home/Home00001.jpg → Home00027.jpg
 */
const homeGalleryImages = Array.from({ length: 27 }, (_, i) => {
  const n = String(i + 1).padStart(5, "0");
  return {
    src: `/images/home/Home${n}.jpg`,
    alt: `Home gallery image ${n}`,
  };
});

export default function HomeGallery() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = useMemo(() => {
    if (activeIndex === null) return null;
    return homeGalleryImages[activeIndex] ?? null;
  }, [activeIndex]);

  const open = (index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => {
      dialogRef.current?.showModal?.();
    });
  };

  const close = () => {
    dialogRef.current?.close?.();
  };

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex(
      (activeIndex - 1 + homeGalleryImages.length) % homeGalleryImages.length
    );
  };

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % homeGalleryImages.length);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;

      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <>
      <style>{`
        .homeGallerySection { width: 100%; margin-top: 0; }

        .homeGalleryWrap {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 18px;
          box-sizing: border-box;
        }

        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
        }

        @media (max-width: 980px) {
          .homeGalleryWrap { padding: 0 16px; }
          .homeGalleryGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        }

        @media (max-width: 560px) {
          .homeGalleryWrap { padding: 0 12px; }
          .homeGalleryGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        }

        @media (max-width: 380px) {
          .homeGalleryGrid { grid-template-columns: 1fr; }
        }

        .thumbBtn {
          width: 100%;
          display: block;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        /* Make every thumbnail the exact same size */
        .thumbFrame {
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 200ms ease, transform 200ms ease;
          background: rgba(0,0,0,0.02);
        }

        .thumbFrame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 200ms ease, filter 200ms ease;
        }

        .thumbBtn:hover .thumbFrame {
          transform: scale(1.02);
          box-shadow: 0 14px 42px rgba(0,0,0,0.14);
        }

        .thumbBtn:hover .thumbFrame img {
          transform: scale(1.03);
          filter: saturate(1.04) contrast(1.02);
        }

        dialog.lightbox {
          border: 0;
          padding: 0;
          background: transparent;
          width: min(1400px, 96vw);
          max-height: 92vh;
        }

        dialog.lightbox::backdrop {
          background: rgba(0,0,0,0.66);
          backdrop-filter: blur(6px);
        }

        .lightboxInner {
          position: relative;
          background: rgba(10,10,10,0.94);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 70px rgba(0,0,0,0.35);
        }

        .lightboxImg {
          width: 100%;
          height: auto;
          max-height: 92vh;
          display: block;
          object-fit: contain;
          background: #0a0a0a;
        }

        .lbBtn {
          position: absolute;
          top: 10px;
          border: 0;
          background: rgba(255,255,255,0.12);
          color: white;
          padding: 10px 12px;
          border-radius: 999px;
          cursor: pointer;
          z-index: 2;
          user-select: none;
        }

        .lbBtn:hover { background: rgba(255,255,255,0.18); }

        .lbClose { right: 10px; }
        .lbPrev { left: 10px; top: 50%; transform: translateY(-50%); }
        .lbNext { right: 10px; top: 50%; transform: translateY(-50%); }

        @media (max-width: 560px) {
          .lbPrev, .lbNext { display: none; }
        }
      `}</style>

      <div className="homeGallerySection">
        <div className="homeGalleryWrap">
          <div className="homeGalleryGrid">
            {homeGalleryImages.map((image, index) => (
              <button
                key={image.src}
                className="thumbBtn"
                type="button"
                onClick={() => open(index)}
                aria-label={`Open ${image.alt}`}
              >
                <div className="thumbFrame">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <dialog
          ref={dialogRef}
          className="lightbox"
          onClick={(e) => {
            if (e.target === dialogRef.current) close();
          }}
          onClose={() => setActiveIndex(null)}
        >
          <div className="lightboxInner">
            <button
              className="lbBtn lbClose"
              type="button"
              onClick={close}
              aria-label="Close"
            >
              ✕
            </button>

            {activeIndex !== null ? (
              <>
                <button
                  className="lbBtn lbPrev"
                  type="button"
                  onClick={prev}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className="lbBtn lbNext"
                  type="button"
                  onClick={next}
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            ) : null}

            {active ? (
              <img className="lightboxImg" src={active.src} alt={active.alt} />
            ) : null}
          </div>
        </dialog>
      </div>
    </>
  );
}
