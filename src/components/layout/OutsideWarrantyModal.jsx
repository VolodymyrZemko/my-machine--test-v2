import { useEffect } from 'react';
import { useTranslation } from '../../translations/translations.js';
import './OutsideWarrantyModal.css';

// Outside warranty service fees pop-up
export function OutsideWarrantyModal({ onClose }) {
  const t = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background scroll while the modal is open
  useEffect(() => {
    document.documentElement.classList.add('has-overlay');
    return () => document.documentElement.classList.remove('has-overlay');
  }, []);

  return (
    <div className="outside-warranty-overlay" onClick={onClose}>
      <div
        className="outside-warranty-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="outside-warranty-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="outside-warranty-modal-close"
          onClick={onClose}
          aria-label={t('closeModal')}
        >
          <nb-icon icon="24/symbol/close"></nb-icon>
        </button>

        <div className="outside-warranty-modal-body">
          <p id="outside-warranty-modal-title" className="outside-warranty-modal-title">
            {t('outsideWarrantyModalTitleLine1')}<br />{t('outsideWarrantyModalTitleLine2')}
          </p>
          <p className="outside-warranty-modal-desc">{t('outsideWarrantyModalDesc')}</p>

          <table className="outside-warranty-table">
            <thead>
              <tr>
                <th></th>
                <th><nb-icon icon="32/machine/machine-technology-ol"></nb-icon>{t('machineTechnology')}</th>
                <th><nb-icon icon="32/payment/cash"></nb-icon>{t('price')}</th>
                <th><nb-icon icon="32/service/machine-assistance"></nb-icon>{t('machineLoan')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tier-name">{t('ambassador')}</td>
                <td>{t('originalVertuo')}</td>
                <td>40€</td>
                <td className="loan-yes" aria-label="yes">
                  <nb-icon icon="24/symbol/check"></nb-icon>
                </td>
              </tr>
              <tr>
                <td className="tier-name non-border" rowSpan={2}>{t('clubMember')}</td>
                <td>{t('original')}</td>
                <td>60€</td>
                <td className="loan-yes" aria-label="yes">
                  <nb-icon icon="24/symbol/check"></nb-icon>
                </td>
              </tr>
              <tr className='non-border'>
                <td>{t('vertuo')}</td>
                <td>80€</td>
                <td className="loan-no" aria-label="no">
                  <nb-icon icon="24/symbol/close"></nb-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
