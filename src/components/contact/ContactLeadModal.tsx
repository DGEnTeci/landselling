'use client';

import React, { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { formatCOP, formatAreaSurface, formatPhoneDisplay, sanitizeColombianPhone } from '@/lib/formatters';
import { SITE_CONFIG } from '@/config/site';

export interface ContactLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  whatsappPhone?: string;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  acceptedHabeasData: boolean;
}

export const INQUIRY_OPTIONS = [
  { value: 'visita', label: 'Agendar visita en terreno' },
  { value: 'titulos', label: 'Solicitar estudio de títulos / ficha legal' },
  { value: 'financiacion', label: 'Asesoría de financiación e inversión' },
  { value: 'general', label: 'Información general del proyecto' },
];

/**
 * Normaliza teléfonos celulares colombianos eliminando espacios, guiones o prefijos +57/57.
 */
export function normalizeColombianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('57')) {
    return digits.slice(2);
  }
  return digits;
}

/**
 * Valida si el número telefónico es un celular colombiano válido de 10 dígitos iniciando en 3.
 */
export function isValidColombianMobile(raw: string): boolean {
  const normalized = normalizeColombianPhone(raw);
  return /^3\d{9}$/.test(normalized);
}

export const ContactLeadModal: React.FC<ContactLeadModalProps> = ({
  isOpen,
  onClose,
  property,
  whatsappPhone = SITE_CONFIG.contact.whatsappNumber,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'visita',
    message: '',
    acceptedHabeasData: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reiniciar estado de éxito y errores al abrir o cambiar de propiedad
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrors({});
    }
  }, [isOpen, property?.id]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Ingresa tu nombre completo (mínimo 3 caracteres)';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      newErrors.email = 'Ingresa una dirección de correo electrónico válida';
    }

    if (!isValidColombianMobile(formData.phone)) {
      newErrors.phone =
        'Ingresa un número celular colombiano válido de 10 dígitos (ej. 300 123 4567)';
    }

    if (!formData.acceptedHabeasData) {
      newErrors.acceptedHabeasData =
        'Debes autorizar el tratamiento de datos personales para continuar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulación de envío de lead segura
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiryType: 'visita',
      message: '',
      acceptedHabeasData: false,
    });
    setErrors({});
    onClose();
  };

  const selectedInquiryLabel =
    INQUIRY_OPTIONS.find((opt) => opt.value === formData.inquiryType)?.label ||
    'Asesoría Inmobiliaria';

  // Generación de URL de WhatsApp personalizada con los datos del formulario
  const cleanPhone = sanitizeColombianPhone(whatsappPhone) || '573000000000';
  const whatsappMessageLines = [
    '👋 ¡Hola, equipo de LandSelling!',
    '',
    'Acabo de solicitar asesoría a través del formulario web:',
    `👤 *Nombre:* ${formData.fullName.trim()}`,
    `📞 *Teléfono:* ${normalizeColombianPhone(formData.phone)}`,
    `✉️ *Correo:* ${formData.email.trim()}`,
    `📋 *Solicitud:* ${selectedInquiryLabel}`,
  ];

  if (property) {
    whatsappMessageLines.push(
      `📌 *Propiedad de Interés:* ${property.title}`,
      `🔖 *Referencia:* ${property.id.toUpperCase()}`,
      `💰 *Precio:* ${formatCOP(property.priceCOP)}`,
      `📍 *Ubicación:* ${property.location.municipality}, ${property.location.department}`
    );
  } else {
    whatsappMessageLines.push('📌 *Tipo:* Consulta y Asesoría General');
  }

  if (formData.message.trim()) {
    whatsappMessageLines.push(`📝 *Comentario:* ${formData.message.trim()}`);
  }

  whatsappMessageLines.push('', '¿Podrían darme atención y seguimiento? Muchas gracias.');
  const whatsappDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    whatsappMessageLines.join('\n')
  )}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={
        isSuccess
          ? '¡Solicitud Registrada con Éxito!'
          : property
          ? 'Solicitar Visita / Asesoría del Terreno'
          : 'Solicitud de Asesoría Inmobiliaria'
      }
      description={
        isSuccess
          ? 'Nos pondremos en contacto contigo a la mayor brevedad.'
          : property
          ? `Referencia: ${property.id.toUpperCase()} • ${property.location.municipality}, ${property.location.department}`
          : 'Completa tus datos y un especialista patrimonial se comunicará contigo.'
      }
      maxWidth="lg"
    >
      {isSuccess ? (
        /* Vista de Éxito Accesible (Success View) */
        <div
          role="status"
          aria-live="polite"
          className="text-center py-6 px-4 space-y-6 text-forest-950"
        >
          {/* Icono de Confirmación */}
          <div className="w-16 h-16 rounded-full bg-emerald-light border-2 border-emerald/30 flex items-center justify-center mx-auto text-emerald-dark">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-forest-950 tracking-tight">
              ¡Gracias por tu interés, {formData.fullName.split(' ')[0]}!
            </h3>
            <p className="text-sm text-forest-700 leading-relaxed max-w-md mx-auto">
              Hemos registrado tu solicitud para <strong>{selectedInquiryLabel.toLowerCase()}</strong>
              {property && (
                <>
                  {' '}
                  en <strong>{property.title}</strong>
                </>
              )}
              . Un asesor jurídico-comercial se comunicará contigo en breve al número{' '}
              <strong>{formatPhoneDisplay(formData.phone)}</strong> o a tu correo{' '}
              <strong>{formData.email}</strong>.
            </p>
          </div>

          {/* Resumen de la Solicitud */}
          <div className="bg-cream-100/70 border border-cream-300 rounded-2xl p-4 text-left text-xs text-forest-800 space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="font-semibold text-forest-600">Contacto:</span>
              <span className="font-bold text-forest-900">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-forest-600">Teléfono:</span>
              <span className="font-bold text-forest-900">
                {formatPhoneDisplay(formData.phone)}
              </span>
            </div>
            {property && (
              <div className="flex justify-between border-t border-cream-200 pt-2">
                <span className="font-semibold text-forest-600">Terreno:</span>
                <span className="font-bold text-forest-900 truncate max-w-[200px]">
                  {property.title}
                </span>
              </div>
            )}
          </div>

          {/* Acciones de Conversión Inmediatas */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full sm:w-auto inline-flex items-center justify-center gap-2
                px-5 py-3 rounded-xl font-bold text-sm bg-emerald text-white
                hover:bg-emerald-hover transition-colors shadow-sm min-h-[44px]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
              "
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.588 1.961.92 2.796.921 3.183 0 5.77-2.587 5.77-5.768 0-3.18-2.587-5.768-5.77-5.768zm0 10.364c-.753 0-1.637-.282-2.355-.708l-.169-.1-1.579.414.421-1.54-.111-.176c-.469-.747-.716-1.517-.716-2.488 0-2.483 2.02-4.503 4.508-4.503 2.484 0 4.505 2.02 4.505 4.504 0 2.484-2.02 4.505-4.504 4.505z" />
              </svg>
              <span>Abrir en WhatsApp con mis datos</span>
            </a>

            <Button
              variant="outline"
              size="md"
              onClick={handleResetAndClose}
              className="w-full sm:w-auto"
            >
              Finalizar y Cerrar
            </Button>
          </div>
        </div>
      ) : (
        /* Formulario de Captación Accesible */
        <form onSubmit={handleSubmit} className="space-y-4 text-forest-950" noValidate>
          {/* Encabezado Contextual de la Propiedad si aplica */}
          {property && (
            <div className="bg-cream-100/80 border border-cream-300 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="forest" size="sm">
                    {property.categoryName}
                  </Badge>
                  <span className="text-xs font-bold text-forest-700">
                    Ref: {property.id.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm font-bold text-forest-950 truncate max-w-sm">
                  {property.title}
                </p>
                <p className="text-xs text-forest-700">
                  {formatAreaSurface(property.areaHectares, property.areaSquareMeters)} •{' '}
                  {property.location.municipality}, {property.location.department}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] uppercase font-bold text-forest-600 block">
                  Precio
                </span>
                <span className="text-base sm:text-lg font-extrabold text-forest-900 block">
                  {formatCOP(property.priceCOP)}
                </span>
              </div>
            </div>
          )}

          {/* Campo: Nombre Completo */}
          <Input
            label="Nombre Completo"
            placeholder="Ej. Carlos Rodríguez"
            required
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            error={errors.fullName}
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />

          {/* Campo: Correo Electrónico */}
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="carlos.rodriguez@ejemplo.com"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />

          {/* Campo: Teléfono Móvil Colombiano */}
          <Input
            label="Teléfono Móvil (Colombia)"
            type="tel"
            placeholder="Ej. 300 123 4567 o +57 310..."
            required
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            error={errors.phone}
            helperText="Aceptamos formatos con o sin prefijo +57."
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
          />

          {/* Campo: Tipo de Solicitud */}
          <Select
            label="¿Qué deseas coordinar?"
            options={INQUIRY_OPTIONS}
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
          />

          {/* Campo: Mensaje Adicional (Opcional) */}
          <div className="w-full">
            <label
              htmlFor="lead-message"
              className="block text-sm font-semibold text-forest-900 mb-1.5"
            >
              Comentarios o requerimientos específicos (opcional)
            </label>
            <textarea
              id="lead-message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="¿Tienes alguna fecha de visita tentativa o preguntas sobre financiación?"
              className="
                w-full rounded-xl border border-cream-300 bg-white p-3 text-sm
                text-forest-950 placeholder-forest-700/50 focus:outline-none
                focus:ring-2 focus:ring-emerald focus:border-emerald
              "
            />
          </div>

          {/* Checkbox de Habeas Data (Ley 1581 de 2012) */}
          <div className="pt-1">
            <div className="flex items-start gap-3">
              <input
                id="habeas-data-checkbox"
                type="checkbox"
                checked={formData.acceptedHabeasData}
                onChange={(e) => {
                  setFormData({ ...formData, acceptedHabeasData: e.target.checked });
                  if (errors.acceptedHabeasData) {
                    setErrors({ ...errors, acceptedHabeasData: '' });
                  }
                }}
                className="
                  mt-1 h-4 w-4 rounded border-cream-300 text-emerald
                  focus:ring-emerald focus:ring-offset-1 cursor-pointer
                "
              />
              <label
                htmlFor="habeas-data-checkbox"
                className="text-xs text-forest-700 leading-normal cursor-pointer"
              >
                Autorizo de manera previa, expresa e informada el tratamiento de mis datos
                personales conforme a la <strong>Ley 1581 de 2012</strong> y la Política de
                Privacidad de LandSelling S.A.S. para fines de asesoría comercial y jurídica.
              </label>
            </div>

            {errors.acceptedHabeasData && (
              <p
                role="alert"
                className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errors.acceptedHabeasData}</span>
              </p>
            )}
          </div>

          {/* Botón de Envío */}
          <div className="pt-3 border-t border-cream-200">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              Enviar Solicitud
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
