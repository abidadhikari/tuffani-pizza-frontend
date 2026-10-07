"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  RotateCw,
  Eye,
  EyeOff,
  FileText,
  AlertCircle,
} from "lucide-react";

interface FullScreenPdfViewerProps {
  initialPdfPath?: string;
  title?: string;
  subtitle?: string;
}

const DEFAULT_CANDIDATES = [
  "/pdf/menu.pdf",
  "/pdf/new-baneshwor-menu.pdf",
  "/menu.pdf",
  "/pdf/Menu (Baneshwar).pdf",
];

function PdfViewerInternal({
  initialPdfPath,
  title = "New Baneshwor Menu",
  subtitle = "Tufani Pizza",
}: FullScreenPdfViewerProps) {
  const searchParams = useSearchParams();
  const queryPdf = searchParams.get("pdf") || searchParams.get("file");

  const [activePdf, setActivePdf] = useState<string>(
    initialPdfPath || queryPdf || DEFAULT_CANDIDATES[0]
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [toolbarVisible, setToolbarVisible] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Probe candidates if no explicit initial or query param is provided
  useEffect(() => {
    let isMounted = true;

    async function resolvePdfSource() {
      if (initialPdfPath) {
        setActivePdf(initialPdfPath);
        setIsLoading(false);
        return;
      }

      if (queryPdf) {
        setActivePdf(queryPdf);
        setIsLoading(false);
        return;
      }

      // Check each candidate in order
      for (const candidate of DEFAULT_CANDIDATES) {
        try {
          const res = await fetch(encodeURI(candidate), { method: "HEAD" });
          if (res.ok && res.status === 200) {
            if (isMounted) {
              setActivePdf(candidate);
              setIsLoading(false);
            }
            return;
          }
        } catch {
          // Continue to next candidate
        }
      }

      // Default fallback
      if (isMounted) {
        setActivePdf(DEFAULT_CANDIDATES[DEFAULT_CANDIDATES.length - 1]);
        setIsLoading(false);
      }
    }

    resolvePdfSource();

    return () => {
      isMounted = false;
    };
  }, [initialPdfPath, queryPdf]);

  // Track Fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any)?.webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any)?.webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  }, []);

  const reloadIframe = useCallback(() => {
    setIsLoading(true);
    setLoadError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const encodedPdfUrl = encodeURI(activePdf);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen min-h-[100dvh] bg-[#121214] text-white flex flex-col overflow-hidden select-none z-50 font-sans"
    >
      {/* Floating Toolbar */}
      {toolbarVisible ? (
        <header className="flex-none bg-[#18181b]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xl transition-all duration-300 z-30">
          {/* Brand & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-brand/20 p-1 flex-shrink-0 border border-brand/40">
              <Image
                src="/logo.png"
                alt="Tufani Pizza Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
                  {title}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-brand text-white rounded-full">
                  PDF
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Action Toolbar Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Toggle Fullscreen */}
            <button
              onClick={toggleFullscreen}
              type="button"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-white/10 transition-colors text-xs font-medium cursor-pointer shadow-sm active:scale-95"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-brand" />
                  <span className="hidden md:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-brand" />
                  <span className="hidden md:inline">Fullscreen</span>
                </>
              )}
            </button>

            {/* Direct Download */}
            <a
              href={encodedPdfUrl}
              download="Tufani-Pizza-New-Baneshwor-Menu.pdf"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-white/10 transition-colors text-xs font-medium cursor-pointer shadow-sm active:scale-95"
              title="Download Menu PDF"
              aria-label="Download Menu PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download</span>
            </a>

            {/* Open in New Window */}
            <a
              href={encodedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-white/10 transition-colors text-xs font-medium cursor-pointer shadow-sm active:scale-95"
              title="Open in new window"
              aria-label="Open in new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open PDF</span>
            </a>

            {/* Reload */}
            <button
              onClick={reloadIframe}
              type="button"
              className="p-1.5 sm:px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer text-xs"
              title="Reload Viewer"
              aria-label="Reload Viewer"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Hide Toolbar Button */}
            <button
              onClick={() => setToolbarVisible(false)}
              type="button"
              className="p-1.5 sm:px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 border border-white/10 transition-colors cursor-pointer text-xs"
              title="Hide toolbar for pure full-screen reading"
              aria-label="Hide toolbar"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>
      ) : (
        /* Floating mini button to restore toolbar */
        <button
          onClick={() => setToolbarVisible(true)}
          type="button"
          className="fixed top-3 right-3 z-50 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5 px-3 text-xs"
          title="Show controls bar"
        >
          <Eye className="w-3.5 h-3.5 text-brand" />
          <span className="text-[11px] font-medium">Show Toolbar</span>
        </button>
      )}

      {/* Main PDF Viewport Area */}
      <main className="relative flex-1 w-full h-full bg-[#1c1c20] overflow-hidden flex flex-col">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#141416] gap-4">
            <div className="relative w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center animate-pulse">
              <RotateCw className="w-6 h-6 text-brand animate-spin" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-neutral-200">
                Loading Menu PDF...
              </p>
              <p className="text-xs text-neutral-500">Preparing full screen view</p>
            </div>
          </div>
        )}

        {/* Load Error Fallback */}
        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#141416] p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center mb-4 text-brand">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">
              Unable to preview PDF directly
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mb-6">
              Your browser might have blocked inline PDF embedding or the file
              is still being placed in the public folder.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={encodedPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand/90 text-white font-medium text-sm transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open PDF in New Tab
              </a>
              <a
                href={encodedPdfUrl}
                download="Tufani-Pizza-Menu.pdf"
                className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-all border border-white/10 active:scale-95 inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>
        )}

        {/* PDF Frame */}
        <iframe
          src={`${encodedPdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
          className="w-full h-full flex-1 border-0 bg-neutral-900"
          title={`${title} - ${subtitle}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setLoadError(true);
          }}
        />

        {/* Mobile touch fallback bar */}
        <div className="sm:hidden flex-none bg-neutral-950/90 border-t border-white/10 px-3 py-2 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-brand" />
            Full Screen PDF View
          </span>
          <a
            href={encodedPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-medium hover:underline inline-flex items-center gap-1"
          >
            Open in new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}

export default function FullScreenPdfViewer(props: FullScreenPdfViewerProps) {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 w-screen h-screen bg-[#141416] flex items-center justify-center">
          <div className="text-center text-white">
            <RotateCw className="w-6 h-6 text-brand animate-spin mx-auto mb-2" />
            <p className="text-xs text-neutral-400">Loading viewer...</p>
          </div>
        </div>
      }
    >
      <PdfViewerInternal {...props} />
    </Suspense>
  );
}
