

const Modal = ({ open, onClose, title = 'Dialog', children }) => {
  if (!open) return null  // ← si pas ouverte, on ne rend rien

  return (
    <div role="dialog" aria-modal="true" aria-label={title}>
      <div>
        {/* En-tête : titre + bouton ✕ */}
        <div>
          <strong>{title}</strong>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Contenu fourni par le parent */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal