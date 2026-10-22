import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Language } from '../types';
import { X, Trash2, Plus, Minus, Send, Copy, Check, ShoppingBag, Coffee, ChevronRight, ShieldCheck } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language: Language;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [tableLocation, setTableLocation] = useState<string>('Terraza 3');
  const [customerName, setCustomerName] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Format Comanda text
  const generateTicketText = () => {
    let text = `☕ *LA KAFETERIA - COMANDA DIRECTA*\n`;
    text += `📍 *Ubicación:* ${tableLocation}\n`;
    if (customerName.trim()) text += `👤 *Cliente:* ${customerName.trim()}\n`;
    text += `🕒 *Hora:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `---------------------------------\n`;

    cart.forEach((c) => {
      text += `• *${c.quantity}x* ${language === 'es' ? c.item.nameEs : c.item.nameEn} (${(c.unitPrice * c.quantity).toFixed(2)}€)\n`;
      if (c.selectedOption.breadType) {
        const bLabel =
          c.selectedOption.breadType === 'blanco_integral'
            ? 'Pitufo Blanco/Integral'
            : c.selectedOption.breadType === 'cereal'
            ? 'Pitufo Cereal'
            : 'Baguetina Canteno/Espelta';
        text += `   🥖 Pan: ${bLabel}\n`;
      }
      if (c.selectedOption.isGlutenFree) {
        text += `   🌾 Sin Gluten (+0.90€)\n`;
      }
      if (c.selectedOption.milkType) {
        text += `   🥛 Leche: ${c.selectedOption.milkType}\n`;
      }
      if (c.selectedOption.drinkTemperature) {
        text += `   🌡️ Temp: ${c.selectedOption.drinkTemperature}\n`;
      }
      if (c.selectedOption.specialInstructions) {
        text += `   📝 Nota: "${c.selectedOption.specialInstructions}"\n`;
      }
    });

    text += `---------------------------------\n`;
    text += `*TOTAL A PAGAR:* ${totalAmount.toFixed(2)}€\n`;
    text += `San Pedro Alcántara · ¡0€ Comisiones de Intermediarios!`;
    return text;
  };

  const handleCopyTicket = () => {
    const text = generateTicketText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = generateTicketText();
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/34614124159?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel with Spring Physics */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 28 }}
              className="w-screen max-w-md bg-[#231a15] border-l border-[#a66a38]/30 shadow-2xl flex flex-col justify-between relative z-10"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-[#a66a38]/25 bg-[#1b1411] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d98236] text-[#1b1411] flex items-center justify-center font-bold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#f7f1e5]">
                      {language === 'es' ? 'Comanda Directa' : 'Direct Ticket'}
                    </h2>
                    <p className="text-[11px] text-[#c89666] font-mono">
                      {cart.length} {cart.length === 1 ? (language === 'es' ? 'artículo' : 'item') : (language === 'es' ? 'artículos' : 'items')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="p-1.5 rounded-lg text-xs text-[#a66a38] hover:text-red-400 hover:bg-[#2c211b] transition-colors"
                      title="Vaciar comanda"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg bg-[#231a15] hover:bg-[#2c211b] text-[#c89666] hover:text-[#f7f1e5] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Location & Table selector */}
              <div className="p-4 bg-[#2c211b]/70 border-b border-[#a66a38]/20 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-[#c89666]">
                    {language === 'es' ? 'Mesa / Destino:' : 'Table / Destination:'}
                  </label>
                  <select
                    value={tableLocation}
                    onChange={(e) => setTableLocation(e.target.value)}
                    className="bg-[#1b1411] border border-[#a66a38]/40 rounded-lg px-2.5 py-1 text-xs text-[#ede0d0] font-mono focus:outline-none focus:border-[#d98236]"
                  >
                    <option value="Terraza 1">Terraza 1</option>
                    <option value="Terraza 2">Terraza 2</option>
                    <option value="Terraza 3">Terraza 3 (Sol)</option>
                    <option value="Terraza 4">Terraza 4</option>
                    <option value="Mesa Interior 1">Mesa Interior 1</option>
                    <option value="Mesa Interior 2">Mesa Interior 2</option>
                    <option value="Barra">Barra Principal</option>
                    <option value="Para Llevar (Takeaway)">Para Llevar (Takeaway)</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={language === 'es' ? 'Nombre cliente (opcional)...' : 'Customer name (optional)...'}
                  className="w-full bg-[#1b1411] border border-[#a66a38]/30 rounded-lg px-3 py-1.5 text-xs text-[#ede0d0] placeholder-[#a66a38] focus:outline-none focus:border-[#d98236]"
                />
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="py-16 text-center text-xs text-[#a66a38] flex flex-col items-center">
                    <Coffee className="w-10 h-10 mb-3 text-[#a66a38]/50 stroke-1" />
                    <p className="font-serif text-base text-[#ede0d0] mb-1">
                      {language === 'es' ? 'Tu comanda está vacía' : 'Your ticket is empty'}
                    </p>
                    <p className="max-w-xs text-[#a66a38]">
                      {language === 'es'
                        ? 'Selecciona tus tostadas, café o zumos favoritos de la carta para añadirlos.'
                        : 'Choose your favorite toasts, coffee, or fresh juices to build your order.'}
                    </p>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="p-3 rounded-xl bg-[#2c211b] border border-[#a66a38]/25 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#f7f1e5]">
                            {language === 'es' ? cartItem.item.nameEs : cartItem.item.nameEn}
                          </h4>
                          
                          {/* Specs */}
                          <div className="text-[11px] text-[#c89666] font-mono mt-0.5 space-y-0.5">
                            {cartItem.selectedOption.breadType && (
                              <div>
                                🥖 {cartItem.selectedOption.breadType === 'blanco_integral'
                                  ? 'Pitufo Blanco/Integral'
                                  : cartItem.selectedOption.breadType === 'cereal'
                                  ? 'Pitufo Cereal'
                                  : 'Baguetina Canteno/Espelta'}
                              </div>
                            )}
                            {cartItem.selectedOption.isGlutenFree && (
                              <div className="text-[#d98236]">🌾 Sin Gluten (+0.90€)</div>
                            )}
                            {cartItem.selectedOption.milkType && (
                              <div>🥛 Leche: {cartItem.selectedOption.milkType}</div>
                            )}
                            {cartItem.selectedOption.drinkTemperature && (
                              <div>🌡️ {cartItem.selectedOption.drinkTemperature}</div>
                            )}
                            {cartItem.selectedOption.specialInstructions && (
                              <div className="text-[#dfcfbe] italic">"{cartItem.selectedOption.specialInstructions}"</div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          className="text-[#a66a38] hover:text-red-400 p-1 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#a66a38]/15 text-xs">
                        <div className="flex items-center gap-2 bg-[#1b1411] rounded-lg p-0.5 border border-[#a66a38]/30">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                            className="w-6 h-6 rounded bg-[#231a15] text-[#ede0d0] flex items-center justify-center hover:bg-[#382b23]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold px-1 text-[#f7f1e5]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                            className="w-6 h-6 rounded bg-[#231a15] text-[#ede0d0] flex items-center justify-center hover:bg-[#382b23]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right font-mono">
                          <span className="text-[11px] text-[#a66a38] mr-2">
                            {cartItem.unitPrice.toFixed(2)}€/u
                          </span>
                          <span className="font-bold text-sm text-[#d98236]">
                            {(cartItem.unitPrice * cartItem.quantity).toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Actions */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[#a66a38]/25 bg-[#1b1411] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#c89666] font-mono uppercase tracking-wider text-xs">
                      {language === 'es' ? 'Total (IVA Incluido):' : 'Total (VAT Included):'}
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#d98236]">
                      {totalAmount.toFixed(2)}€
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleSendWhatsApp}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Pedir WhatsApp</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleCopyTicket}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/40 text-[#f7f1e5] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#25D366]" />
                          <span className="text-[#25D366]">{language === 'es' ? '¡Copiado!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#c89666]" />
                          <span>{language === 'es' ? 'Copiar Ticket' : 'Copy Ticket'}</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#a66a38] font-mono pt-1">
                    <ShieldCheck className="w-3 h-3 text-[#d98236]" />
                    <span>0€ intermediarios · Pedido directo a cocina de San Pedro</span>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
