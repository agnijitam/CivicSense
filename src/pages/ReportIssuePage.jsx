import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  X,
  MapPin,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { LocationPickerMap } from '../components/report/LocationPickerMap';
import { useIssues } from '../context/IssueContext';
import toast from 'react-hot-toast';

const SAMPLE_CIVIC_IMAGES = [
  {
    name: 'Road Pothole',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    category: 'roads_potholes',
    title: 'Deep road crater causing vehicle damage',
  },
  {
    name: 'Garbage Dump',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    category: 'garbage_sanitation',
    title: 'Uncollected domestic waste pile on sidewalk',
  },
  {
    name: 'Streetlight',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    category: 'streetlights',
    title: 'Broken street lamp post near crossing',
  },
  {
    name: 'Water Leakage',
    url: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
    category: 'water_supply',
    title: 'Leaking water pipeline flooding street',
  },
];

const NCR_PRESETS = [
  { label: 'Indirapuram', address: 'Indirapuram Main Road, Ghaziabad, UP', lat: 28.6434, lng: 77.3711 },
  { label: 'Sector 62 Noida', address: 'Near C-Block Market, Sector 62, Noida, UP', lat: 28.6280, lng: 77.3649 },
  { label: 'Connaught Place', address: 'Inner Circle, Connaught Place, New Delhi', lat: 28.6304, lng: 77.2177 },
  { label: 'Raj Nagar Ext', address: 'NH-58 Bypass, Raj Nagar Extension, Ghaziabad', lat: 28.7041, lng: 77.4412 },
];

export const ReportIssuePage = () => {
  const navigate = useNavigate();
  const { addIssue, setSelectedIssue } = useIssues();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('roads_potholes');
  const [location, setLocation] = useState('Near C-Block Market, Sector 62, Noida, Uttar Pradesh');
  const [lat, setLat] = useState(28.6280);
  const [lng, setLng] = useState(77.3649);
  const [imageUrl, setImageUrl] = useState(SAMPLE_CIVIC_IMAGES[0].url);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdIssueResult, setCreatedIssueResult] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
      toast.success('Photo added!');
    };
    reader.readAsDataURL(file);
  };

  const handleMapLocationSelect = (newLat, newLng) => {
    setLat(Number(newLat.toFixed(5)));
    setLng(Number(newLng.toFixed(5)));
    setLocation(`Pinned: ${newLat.toFixed(4)}°N, ${newLng.toFixed(4)}°E`);
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    if (!location.trim()) errs.location = 'Location is required';
    if (!imageUrl) errs.imageUrl = 'Photo is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill required fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newIssue = addIssue({
        title,
        description,
        category,
        location,
        lat,
        lng,
        imageUrl,
      });
      setIsSubmitting(false);
      setCreatedIssueResult(newIssue);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-12 bg-[#000000] text-white">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          New Civic Report
        </h1>
        <p className="text-xs text-[#A8A8A8] mt-0.5">
          Share photo and location to trigger municipal dispatch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Photo Box */}
        <div className="bg-[#181818] rounded-2xl p-4 border border-[#2E2E2E]">
          <label className="block text-xs font-bold text-white mb-2">
            1. Photo of Problem
          </label>

          {imageUrl ? (
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] max-h-56 bg-[#121212] group border border-[#333333]">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700 flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging ? 'border-[#F97316] bg-[#F97316]/10' : 'border-[#333333] hover:border-[#F97316] bg-[#121212]'
              }`}
            >
              <Camera className="w-8 h-8 text-[#888888] mx-auto mb-1.5" />
              <p className="text-xs font-bold text-white">
                Tap to upload photo or drag & drop
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
            className="hidden"
          />

          {/* Quick presets */}
          <div className="mt-2.5 pt-2 border-t border-[#262626] flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-[#888888] shrink-0 font-medium">Quick sample:</span>
            {SAMPLE_CIVIC_IMAGES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setImageUrl(s.url);
                  setCategory(s.category);
                  if (!title) setTitle(s.title);
                }}
                className={`px-2.5 py-1 rounded-lg border font-bold shrink-0 transition-colors ${
                  imageUrl === s.url
                    ? 'border-[#F97316] bg-[#F97316]/20 text-[#F97316]'
                    : 'border-[#333333] bg-[#242424] text-[#A8A8A8] hover:text-white hover:border-[#444444]'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="bg-[#181818] rounded-2xl p-4 border border-[#2E2E2E]">
          <label className="block text-xs font-bold text-white mb-2">
            2. Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-[#F97316] bg-[#F97316]/15 text-white ring-1 ring-[#F97316]'
                      : 'border-[#333333] bg-[#121212] text-[#A8A8A8] hover:border-[#444444] hover:text-white'
                  }`}
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mr-2"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title & Details */}
        <div className="bg-[#181818] rounded-2xl p-4 border border-[#2E2E2E] space-y-3">
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              3. Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              placeholder="e.g. Broken streetlight on main road"
              className="w-full px-3 py-2.5 rounded-xl border border-[#333333] bg-[#121212] text-sm text-white placeholder:text-[#888888] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
              }}
              placeholder="Give a short description of the problem..."
              className="w-full px-3 py-2.5 rounded-xl border border-[#333333] bg-[#121212] text-sm text-white placeholder:text-[#888888] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Location & Map Picker */}
        <div className="bg-[#181818] rounded-2xl p-4 border border-[#2E2E2E] space-y-2.5">
          <label className="block text-xs font-bold text-white">
            4. Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#F97316] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location) setErrors((prev) => ({ ...prev, location: null }));
              }}
              placeholder="e.g. Sector 62, Noida"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#333333] bg-[#121212] text-sm text-white placeholder:text-[#888888] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            />
          </div>

          <LocationPickerMap
            lat={lat}
            lng={lng}
            onLocationSelect={handleMapLocationSelect}
            height="180px"
          />

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {NCR_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setLocation(p.address);
                  setLat(p.lat);
                  setLng(p.lng);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#333333] border border-[#333333] text-[#D4D4D4] hover:text-white font-bold transition-colors"
              >
                📍 {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting report...</span>
            </>
          ) : (
            <>
              <span>Share Report</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {createdIssueResult && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#181818] rounded-2xl shadow-2xl p-6 text-center relative z-10 border border-[#333333]"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">
                  Report Shared!
                </h3>
                <p className="text-xs text-[#A8A8A8] mt-1">
                  Your civic problem is now live on the public feed and map.
                </p>

                <div className="my-4 p-3 bg-[#121212] rounded-xl border border-[#2E2E2E] text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] block">
                    Tracking ID
                  </span>
                  <span className="font-mono text-base font-black text-white">
                    #{createdIssueResult.id}
                  </span>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedIssue(createdIssueResult);
                      navigate('/');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>View on Live Map</span>
                  </button>
                  <button
                    onClick={() => navigate('/track')}
                    className="flex-1 py-3 rounded-xl bg-[#242424] hover:bg-[#333333] text-white text-xs font-bold border border-[#333333] transition-colors cursor-pointer"
                  >
                    <span>Track Status</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
