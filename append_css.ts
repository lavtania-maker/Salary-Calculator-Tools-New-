import fs from 'fs';

const additionalCSS = `
/* Interactive Elements & Specific Layouts */
.indicator-blue {
  background-color: #3b82f6;
}

.toggle-indicator {
  margin-left: auto;
  font-size: 0.85rem;
  color: var(--primary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  border-radius: 6px;
  transition: all 0.2s;
}

.result-section-title:hover .toggle-indicator {
  background-color: var(--primary);
  color: white;
}

.collapsible-content {
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px;
  opacity: 1;
  margin-top: 12px;
}

.result-section.collapsed .collapsible-content {
  max-height: 0;
  opacity: 0;
  margin-top: 0 !important;
  pointer-events: none;
}

.cta-group {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.cta-group .btn {
  flex: 1;
  font-size: 0.95rem;
  padding: 10px;
  line-height: 1.4;
}

.visual-bar-container {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin: 20px 0;
  display: flex;
  overflow: hidden;
}

.bar-net {
  background: #059669;
  height: 100%;
  transition: width 0.5s ease;
}

.bar-deduction {
  background: var(--primary);
  height: 100%;
  transition: width 0.5s ease;
}

.bar-legend {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.trust-badges {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #059669;
  background: #ecfdf5;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #a7f3d0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  padding: 32px;
  border-radius: 20px;
  width: 100%;
  max-width: 440px;
  position: relative;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-hover);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.modal h2 {
  margin-bottom: 8px;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
}

.modal p {
  color: #64748b;
  margin-bottom: 24px;
  font-size: 0.95rem;
  line-height: 1.5;
}

#modalFeedback {
  display: none;
  padding: 16px;
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  margin-top: 16px;
  font-size: 0.95rem;
  text-align: center;
  font-weight: 600;
}

.success-icon {
  display: block;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  color: #10b981;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-accent {
  width: 6px;
  height: 1.8rem;
  background: var(--primary);
  border-radius: 4px;
}

.info-highlight {
  background: #f0f7ff;
  border: 1px solid #e0efff;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
}

.example-box {
  background: #f8fafc;
  border-left: 4px solid var(--primary);
  padding: 20px 24px;
  border-radius: 4px 16px 16px 4px;
  margin-top: 20px;
}

/* FAQ Layout */
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.faq-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.faq-title {
  padding: 20px;
  font-weight: 700;
  color: #0f172a;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.faq-title::-webkit-details-marker {
  display: none;
}

.faq-title::after {
  content: '+';
  font-size: 1.4rem;
  color: var(--primary);
  font-weight: 400;
  transition: transform 0.2s;
}

details[open] .faq-item {
  border-color: #bfdbfe;
  background: #f8fafc;
}

details[open] .faq-title::after {
  content: '−';
  transform: rotate(180deg);
}

.faq-content {
  padding: 0 20px 20px 20px;
  color: #475569;
  line-height: 1.7;
}

`;

fs.appendFileSync('calculator-styles.css', additionalCSS, 'utf8');

// I also need to ensure card-title does not have bottom margin and border everywhere if not needed,
// but the prompt says standard card layout. I will just rely on the CSS generated above.

