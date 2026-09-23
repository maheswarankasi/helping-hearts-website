/**
 * Shown when a Firestore collection has no documents yet (or Firebase is not
 * configured), so the page never renders a bare gap.
 */
export default function EmptyState({
  icon = 'fa-solid fa-box-open',
  title = 'Nothing here yet',
  message,
}) {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-[2rem] border border-dashed border-gray-200">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-softblue text-brand-blue flex items-center justify-center text-3xl mb-6">
        <i className={icon}></i>
      </div>
      <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      {message && <p className="text-gray-500 max-w-md mx-auto">{message}</p>}
    </div>
  );
}
