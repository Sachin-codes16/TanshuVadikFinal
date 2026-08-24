import React, { useState } from 'react';
import { Product } from '../types';
import { useInquiry } from '../context/InquiryContext';
import { Sparkles, Layers, Check, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductShowcaseModalProps {
  heading: string;
  products: Product[];
  onClose: () => void;
}

export const ProductShowcaseModal: React.FC<ProductShowcaseModalProps> = ({ heading, products, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart, isInCart, removeFromCart, setIsPortalOpen } = useInquiry();

  return (
    <>
      {/* MODAL 1: PRODUCT GRID */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2C2623]/80 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#EBE4DC] p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white border border-[#EBE4DC] text-[#2C2623] hover:text-[#8F533C] transition-colors rounded-none cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="mb-6 flex flex-col gap-1 pr-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#8F533C] uppercase">
              Wholesale Selection
            </span>
            <h3 className="font-serif text-3xl text-[#2C2623] font-medium tracking-wide flex items-center gap-2">
              {heading}
            </h3>
            <div className="h-[2px] w-12 bg-[#8F533C] mt-2" />
          </div>

          {/* Body: Product listing */}
          <div className="overflow-y-auto flex-grow pr-2">
            {products.length === 0 ? (
              <div className="py-16 text-center text-sm text-[#615751] flex flex-col items-center gap-3">
                <Info size={32} className="text-[#8F533C]/60" />
                <p>No catalog items found in this category right now.</p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2 border border-[#8F533C] text-[#8F533C] font-button text-xs tracking-wider hover:bg-[#8F533C] hover:text-white transition-colors"
                >
                  Browse Other Categories
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-2">
                {products.map((product) => {
                  const inCart = isInCart(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-[#EBE4DC] hover:border-[#8F533C]/40 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-xs transition-all"
                    >
                      {/* Image */}
                      <div className="w-full sm:w-2/5 bg-[#F4EFEA] overflow-hidden border border-[#EBE4DC] relative group self-start">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Detail summary */}
                      <div className="w-full sm:w-2/3 flex flex-col justify-between">
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-serif text-lg text-[#2C2623] font-medium leading-tight">
                            {product.name}
                          </h4>
                          <p className="font-sans text-xs text-[#615751] leading-relaxed line-clamp-3">
                            {product.description}
                          </p>

                          {/* Specification indicators */}
                          <div className="grid grid-cols-2 gap-y-1 gap-x-2 border-t border-b border-[#FAF8F5] py-2 mt-2 text-[10px] text-[#615751]">
                            <div>
                              <span className="font-bold text-[#2C2623]">MOQ:</span> {product.minOrderQuantity}
                            </div>
                            <div>
                              <span className="font-bold text-[#2C2623]">Lead Time:</span> {product.leadTime}
                            </div>
                            <div className="col-span-2 line-clamp-1">
                              <span className="font-bold text-[#2C2623]">Material:</span> {product.material}
                            </div>
                            <div className="col-span-2 line-clamp-1">
                              <span className="font-bold text-[#2C2623]">Dimensions:</span> {product.dimensions}
                            </div>
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="flex items-center gap-2 mt-4">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="flex-1 py-2 border border-[#2C2623] text-[#2C2623] hover:bg-[#FAF8F5] font-button text-[11px] tracking-wider text-center transition-colors rounded-none cursor-pointer"
                          >
                            Full Specs
                          </button>
                          <button
                            onClick={() => (inCart ? removeFromCart(product.id) : addToCart(product))}
                            className={`flex-1 py-2 font-button text-[11px] tracking-wider text-center transition-colors rounded-none cursor-pointer border ${
                              inCart
                                ? 'bg-[#EBE4DC] border-[#8F533C] text-[#8F533C]'
                                : 'bg-[#8F533C] hover:bg-[#2C2623] border-[#8F533C] text-white'
                            }`}
                          >
                            {inCart ? 'Selected' : 'Add to RFQ'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-[#EBE4DC] flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="font-sans text-xs text-[#615751] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#8F533C]" />
              Need a bespoke dye matching or sizing spec? Contact our design floor.
            </span>
            <button
              onClick={() => {
                onClose();
                setIsPortalOpen(true);
              }}
              className="px-6 py-3 bg-[#2C2623] hover:bg-[#8F533C] text-white font-button text-xs tracking-widest cursor-pointer rounded-none transition-colors w-full sm:w-auto"
            >
              Configure Inquiry
            </button>
          </div>
        </motion.div>
      </div>

      {/* MODAL 2: DETAILED PRODUCT VIEWING */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#2C2623]/80 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#EBE4DC] grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-y-auto max-h-[90vh] rounded-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white border border-[#EBE4DC] text-[#2C2623] hover:text-[#8F533C] transition-colors rounded-none cursor-pointer"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              {/* Modal Left: High Res Image */}
              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-[#F4EFEA] border-r border-[#EBE4DC]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#2C2623]/95 text-white py-1 px-3 text-[10px] font-bold tracking-widest uppercase">
                  {selectedProduct.subcategory}
                </div>
              </div>

              {/* Modal Right: Specs & Description */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  {/* Category breadcrumb */}
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#8F533C] uppercase">
                    {selectedProduct.collection === 'home-decor'
                      ? 'Home Décor'
                      : selectedProduct.collection === 'pet-living'
                      ? 'Pet Living'
                      : 'Seasonal'}{' '}
                    Catalog
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium tracking-tight mt-1 mb-4 leading-snug">
                    {selectedProduct.name}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed font-light mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Specifications Matrix */}
                  <div className="border-t border-[#EBE4DC] pt-4 flex flex-col gap-3 text-xs text-[#2C2623] mb-6">
                    <div className="grid grid-cols-12 py-1 border-b border-[#FAF8F5]">
                      <span className="col-span-4 text-[#615751] font-bold uppercase text-[9px] tracking-wide">Base Material:</span>
                      <span className="col-span-8 font-light">{selectedProduct.material}</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 border-b border-[#FAF8F5]">
                      <span className="col-span-4 text-[#615751] font-bold uppercase text-[9px] tracking-wide">Sizing:</span>
                      <span className="col-span-8 font-light">{selectedProduct.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 border-b border-[#FAF8F5]">
                      <span className="col-span-4 text-[#615751] font-bold uppercase text-[9px] tracking-wide">Standard MOQ:</span>
                      <span className="col-span-8 font-bold text-[#8F533C]">{selectedProduct.minOrderQuantity}</span>
                    </div>
                    <div className="grid grid-cols-12 py-1 border-b border-[#FAF8F5]">
                      <span className="col-span-4 text-[#615751] font-bold uppercase text-[9px] tracking-wide">Port Lead Time:</span>
                      <span className="col-span-8 font-light">{selectedProduct.leadTime}</span>
                    </div>
                  </div>

                  {/* Safety & Compliance Checklist */}
                  <div className="flex flex-col gap-2 p-4 bg-[#F4EFEA]/60 border border-[#EBE4DC]/50 text-xs text-[#615751] font-sans">
                    <div className="font-semibold text-[#2C2623] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#8F533C]" />
                      Wholesale Compliance Guarantees
                    </div>
                    <div className="flex flex-col gap-1.5 mt-1 text-[11px] font-light">
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-[#8F533C]" />
                        100% AZO-Free Non-Toxic Veg Pigment Dyes
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-[#8F533C]" />
                        Machine Washable & Shrink-Resistant Pre-washed Fibers
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-[#8F533C]" />
                        Sedex Social Audit Fair Trade Certification Included
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="mt-8 pt-6 border-t border-[#EBE4DC] flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      if (isInCart(selectedProduct.id)) {
                        removeFromCart(selectedProduct.id);
                      } else {
                        addToCart(selectedProduct);
                      }
                    }}
                    className={`flex-grow py-3.5 font-button text-xs tracking-widest text-center transition-colors rounded-none cursor-pointer border ${
                      isInCart(selectedProduct.id)
                        ? 'border-red-600 hover:bg-red-50 text-red-600 bg-white'
                        : 'bg-[#2C2623] hover:bg-[#8F533C] border-[#2C2623] hover:border-[#8F533C] text-white'
                    }`}
                  >
                    {isInCart(selectedProduct.id) ? 'Remove Selection' : 'Select for Wholesale Inquiry'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setIsPortalOpen(true);
                    }}
                    className="py-3.5 px-6 border border-[#2C2623] hover:bg-[#2C2623] hover:text-white text-[#2C2623] font-button text-xs tracking-widest text-center transition-colors rounded-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Layers size={14} />
                    Check RFQ List
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
