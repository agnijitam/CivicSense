import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CATEGORIES } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { CategoryBadge } from '../common/CategoryBadge';
import { MapPin, Eye, RotateCcw, Plus, Minus, Maximize2, Minimize2, Sparkles } from 'lucide-react';

const MapController = ({ center, zoom, selectedIssue, containerRef, markerRefs, issues }) => {
  const map = useMap();
  const hasFittedInitialBounds = useRef(false);

  // If selectedIssue is present, smoothly fly to it and open its popup
  useEffect(() => {
    if (selectedIssue && selectedIssue.lat && selectedIssue.lng) {
      map.flyTo([Number(selectedIssue.lat), Number(selectedIssue.lng)], 15, { duration: 0.8 });
      const timer = setTimeout(() => {
        try {
          const marker = markerRefs.current?.[selectedIssue.id];
          if (marker && typeof marker.openPopup === 'function') {
            marker.openPopup();
          }
        } catch (e) {
          // ignore
        }
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [selectedIssue, map, markerRefs]);

  // Fit bounds to show all available issues on mount or when issues change
  useEffect(() => {
    if (!selectedIssue && issues && issues.length > 0 && !hasFittedInitialBounds.current) {
      const validPoints = issues
        .filter((i) => i.lat && i.lng)
        .map((i) => [Number(i.lat), Number(i.lng)]);
      
      if (validPoints.length > 0) {
        try {
          const bounds = L.latLngBounds(validPoints);
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
          hasFittedInitialBounds.current = true;
        } catch (e) {
          // ignore
        }
      }
    }
  }, [issues, selectedIssue, map]);

  // Multiple resize checks to guarantee tiles render 100% cleanly
  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    const timers = [
      setTimeout(handleResize, 50),
      setTimeout(handleResize, 200),
      setTimeout(handleResize, 500),
    ];
    window.addEventListener('resize', handleResize);

    let observer;
    if (containerRef && containerRef.current) {
      observer = new ResizeObserver(() => map.invalidateSize());
      observer.observe(containerRef.current);
    }

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [map, containerRef]);

  return null;
};

// On-Map Control Overlay in dark mode
const MapOverlayControls = ({ issues, defaultCenter = [28.625, 77.300], defaultZoom = 11, onToggleExpand, isExpanded }) => {
  const map = useMap();

  const handleFitAll = () => {
    if (issues && issues.length > 0) {
      const validPoints = issues
        .filter((i) => i.lat && i.lng)
        .map((i) => [Number(i.lat), Number(i.lng)]);
      if (validPoints.length > 0) {
        map.fitBounds(L.latLngBounds(validPoints), { padding: [40, 40], maxZoom: 14 });
        return;
      }
    }
    map.setView(defaultCenter, defaultZoom, { animate: true });
  };

  return (
    <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        title="Zoom In"
        className="w-8 h-8 rounded-lg bg-[#181818]/90 backdrop-blur-md border border-[#333333] shadow-lg text-white hover:text-[#F97316] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        title="Zoom Out"
        className="w-8 h-8 rounded-lg bg-[#181818]/90 backdrop-blur-md border border-[#333333] shadow-lg text-white hover:text-[#F97316] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={handleFitAll}
        title="Fit All Pins on Map"
        className="w-8 h-8 rounded-lg bg-[#181818]/90 backdrop-blur-md border border-[#333333] shadow-lg text-white hover:text-[#F97316] flex items-center justify-center font-bold transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
      {onToggleExpand && (
        <button
          type="button"
          onClick={onToggleExpand}
          title={isExpanded ? 'Collapse' : 'Expand'}
          className="w-8 h-8 rounded-lg bg-[#181818]/90 backdrop-blur-md border border-[#333333] shadow-lg text-white hover:text-[#F97316] flex items-center justify-center font-bold transition-colors cursor-pointer"
        >
          {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
};

// Custom SVG marker pin with high-visibility styling
const createCategoryIcon = (categoryId, status, isUserSubmitted = false) => {
  const cat = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[5];
  const isResolved = status === 'Resolved';
  const markerColor = isResolved ? '#10B981' : cat.color || '#F97316';

  const html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">
      ${
        isUserSubmitted
          ? `<div style="position: absolute; width: 50px; height: 50px; border-radius: 9999px; background-color: #F97316; opacity: 0.6; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
          : !isResolved
          ? `<div style="position: absolute; width: 42px; height: 42px; border-radius: 9999px; background-color: ${markerColor}; opacity: 0.35; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
          : ''
      }
      <div style="
        width: 32px; 
        height: 32px; 
        border-radius: 9999px; 
        background: #181818; 
        border: 3.5px solid ${isUserSubmitted ? '#F97316' : markerColor}; 
        box-shadow: 0 4px 14px rgba(0,0,0,0.85); 
        display: flex; 
        align-items: center; 
        justify-content: center;
        position: relative;
      ">
        <div style="width: 10px; height: 10px; border-radius: 9999px; background-color: ${isUserSubmitted ? '#F97316' : markerColor};"></div>
        ${
          isUserSubmitted
            ? `<div style="position: absolute; -top: 6px; -right: 6px; width: 15px; height: 15px; border-radius: 9999px; background: #F97316; color: white; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 900; border: 1.5px solid #181818;">★</div>`
            : ''
        }
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-civic-marker',
    html: html,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

export const CivicMap = ({
  issues = [],
  center = [28.625, 77.300],
  zoom = 11,
  onSelectIssue,
  selectedIssue,
  height = '520px',
}) => {
  const containerRef = useRef(null);
  const markerRefs = useRef({});
  const [isExpanded, setIsExpanded] = useState(false);

  const computedHeight = isExpanded ? '80vh' : height;

  return (
    <div
      ref={containerRef}
      style={{ height: computedHeight }}
      className={`relative w-full rounded-2xl overflow-hidden border border-[#2E2E2E] shadow-lg z-0 transition-all duration-300 ${
        isExpanded ? 'fixed inset-x-4 top-20 z-50 shadow-2xl h-[80vh]' : ''
      }`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full dark-leaflet-map"
        zoomControl={false}
      >
        <MapController
          center={center}
          zoom={zoom}
          selectedIssue={selectedIssue}
          containerRef={containerRef}
          markerRefs={markerRefs}
          issues={issues}
        />

        {/* Free OpenStreetMap Standard Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
          maxZoom={19}
        />

        <MapOverlayControls
          issues={issues}
          defaultCenter={center}
          defaultZoom={zoom}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          isExpanded={isExpanded}
        />

        {/* Markers */}
        {issues.map((issue) => {
          if (!issue.lat || !issue.lng) return null;
          const customIcon = createCategoryIcon(issue.category, issue.status, issue.isUserSubmitted);

          return (
            <Marker
              key={issue.id}
              position={[Number(issue.lat), Number(issue.lng)]}
              icon={customIcon}
              ref={(ref) => {
                if (ref) markerRefs.current[issue.id] = ref;
              }}
              eventHandlers={{
                click: () => onSelectIssue && onSelectIssue(issue),
              }}
            >
              <Popup closeButton={false} offset={[0, -10]}>
                <div className="p-1 max-w-[220px]">
                  <div className="rounded-lg overflow-hidden h-24 mb-1.5 bg-[#121212] relative">
                    <img
                      src={issue.imageUrl}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    {issue.isUserSubmitted && (
                      <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#F97316] text-white text-[9px] font-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Your Report</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <CategoryBadge categoryId={issue.category} size="sm" />
                    <StatusBadge status={issue.status} size="sm" />
                  </div>
                  <h4 className="font-bold text-xs text-white line-clamp-2 mt-1">
                    {issue.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#A8A8A8] mt-1 mb-2">
                    <MapPin className="w-3 h-3 text-[#F97316] shrink-0" />
                    <span className="truncate">{issue.location}</span>
                  </div>
                  <button
                    onClick={() => onSelectIssue && onSelectIssue(issue)}
                    className="w-full py-1.5 px-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Dark Map Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#181818]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#333333] hidden sm:flex items-center gap-3 text-[10px] font-bold text-white shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[#A8A8A8]">Reported</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F97316]" />
          <span className="text-[#A8A8A8]">In Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[#A8A8A8]">Resolved</span>
        </div>
        <div className="flex items-center gap-1.5 pl-1 border-l border-[#333333]">
          <span className="w-2 h-2 rounded-full bg-[#F97316] ring-2 ring-white/50" />
          <span className="text-[#F97316]">★ Your Pin</span>
        </div>
      </div>
    </div>
  );
};
