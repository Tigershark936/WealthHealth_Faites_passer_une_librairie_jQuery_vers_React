

const Modal = ({ open, onClose, title = "Dialog", children, okLabel = "OK" }) => {
  if (!open) return null; 

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <div className="modal-header">
            {/* En-tête : titre + bouton ✕ */}
            <strong className="modal-title">{title}</strong>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Contenu fourni par le parent */}
        <div className="modal-body">{children}</div>

        {/* Bouton OK */}
        <div className="modal-actions">
          <button className="btn-primary" onClick={onClose}>{okLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
