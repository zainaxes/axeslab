'use client';

import React from 'react';
import {
  DEFAULT_DIALS,
  DETAIL_FIELDS,
  DIAL_KEYS,
  DIALS,
  DialsState,
  SIZES,
} from '@/lib/customizer-engine';
import type { PromptField } from '@/lib/real-prompts';

interface MinimalistInputsProps {
  idPrefix: string;
  isMethodA: boolean;
  fields?: PromptField[];
  methodAValues?: Record<string, string>;
  methodBValues?: Record<string, string>;
  onMethodAChange?: (key: string, val: string) => void;
  onMethodBChange?: (key: string, val: string) => void;
}

const inputBaseClass =
  'w-full text-xs text-ink bg-paper-2/25 hover:bg-paper-2/40 focus:bg-paper-2/50 border border-rule/45 focus:border-rule-2/80 rounded-lg px-3 py-2 placeholder:text-muted/55 outline-none transition-colors';

export function MinimalistFieldControls({
  idPrefix,
  isMethodA,
  fields,
  methodAValues = {},
  methodBValues = {},
  onMethodAChange,
  onMethodBChange,
}: MinimalistInputsProps) {
  if (isMethodA && fields && onMethodAChange) {
    return (
      <div className="space-y-3.5">
        {fields.map((field) => {
          const val = methodAValues[field.key] ?? '';
          const fieldId = `${idPrefix}-${field.key}`;
          const isSize = field.key.toLowerCase().includes('size');
          const isLong =
            field.key === 'shots' || (field.default && field.default.length > 80);

          return (
            <div key={field.key} className="space-y-1">
              <label
                htmlFor={fieldId}
                className="text-[11px] font-medium text-muted block"
              >
                {field.label}
              </label>

              {isSize ? (
                <select
                  id={fieldId}
                  name={field.key}
                  value={val}
                  onChange={(e) => onMethodAChange(field.key, e.target.value)}
                  className={`${inputBaseClass} cursor-pointer`}
                >
                  {SIZES.map((s) => (
                    <option key={s.value} value={s.value} className="bg-paper-2 text-ink">
                      {s.label}
                    </option>
                  ))}
                </select>
              ) : isLong ? (
                <textarea
                  id={fieldId}
                  name={field.key}
                  rows={3}
                  value={val}
                  placeholder={field.default || field.label}
                  onChange={(e) => onMethodAChange(field.key, e.target.value)}
                  className={`${inputBaseClass} resize-y`}
                />
              ) : (
                <input
                  id={fieldId}
                  name={field.key}
                  type="text"
                  value={val}
                  placeholder={field.default || field.label}
                  onChange={(e) => onMethodAChange(field.key, e.target.value)}
                  className={inputBaseClass}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (!onMethodBChange) return null;

  return (
    <div className="space-y-3.5">
      {DETAIL_FIELDS.map((field) => {
        const val = methodBValues[field.key] || '';
        const fieldId = `${idPrefix}-${field.key}`;

        return (
          <div key={field.key} className="space-y-1">
            <label
              htmlFor={fieldId}
              className="text-[11px] font-medium text-muted block"
            >
              {field.label}
            </label>

            {field.key === 'format' ? (
              <select
                id={fieldId}
                name={field.key}
                value={val}
                onChange={(e) => onMethodBChange(field.key, e.target.value)}
                className={`${inputBaseClass} cursor-pointer`}
              >
                <option value="" className="bg-paper-2 text-ink">
                  Default
                </option>
                <option value="landscape" className="bg-paper-2 text-ink">
                  1920×1080 (16:9)
                </option>
                <option value="vertical" className="bg-paper-2 text-ink">
                  1080×1920 (9:16)
                </option>
                <option value="square" className="bg-paper-2 text-ink">
                  1080×1080 (1:1)
                </option>
                <option value="portrait" className="bg-paper-2 text-ink">
                  1080×1350 (4:5)
                </option>
              </select>
            ) : field.key === 'notes' ? (
              <textarea
                id={fieldId}
                name={field.key}
                rows={2}
                value={val}
                placeholder={field.placeholder}
                onChange={(e) => onMethodBChange(field.key, e.target.value)}
                className={`${inputBaseClass} resize-y`}
              />
            ) : (
              <input
                id={fieldId}
                name={field.key}
                type="text"
                value={val}
                placeholder={field.placeholder}
                onChange={(e) => onMethodBChange(field.key, e.target.value)}
                className={inputBaseClass}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function MinimalistDials({
  idPrefix,
  dials,
  onChange,
}: {
  idPrefix: string;
  dials: DialsState;
  onChange: (key: keyof DialsState, val: number) => void;
}) {
  return (
    <div className="pt-4 border-t border-rule/50 space-y-3.5">
      {DIAL_KEYS.map((k) => {
        const dial = DIALS[k];
        const activeStopIdx = dials[k];
        const activeStop = dial.stops[activeStopIdx];
        const isDefault = activeStopIdx === DEFAULT_DIALS[k];
        const sliderId = `${idPrefix}-dial-${k}`;

        return (
          <div key={k} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={sliderId} className="font-medium text-ink/90">
                {dial.label}
              </label>
              <span
                className={`font-mono text-[11px] ${
                  isDefault ? 'text-muted' : 'text-cool'
                }`}
              >
                {activeStop.label}
              </span>
            </div>
            <input
              id={sliderId}
              name={`dial-${k}`}
              type="range"
              min={0}
              max={4}
              step={1}
              value={activeStopIdx}
              onChange={(e) => onChange(k, parseInt(e.target.value, 10))}
              className="w-full accent-accent cursor-pointer h-1.5"
            />
          </div>
        );
      })}
    </div>
  );
}
