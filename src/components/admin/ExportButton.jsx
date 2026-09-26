"use client";

import { useState } from 'react';
import { exportAll, exportSheet } from '@/lib/exportExcel';

/**
 * Downloads admin data as .xlsx.
 *
 * Pass `sheet` + `rows` for a single collection, or `all` for a workbook
 * containing every collection on its own sheet.
 */
export default function ExportButton({
  sheet,
  rows,
  all,
  label = 'Export to Excel',
  disabled = false,
}) {
  const [isBusy, setIsBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  // `all` is null until the dashboard finishes loading, and `rows` can be
  // undefined on first render — both must produce 0, not throw.
  const isAllMode = all !== undefined;
  const count = isAllMode
    ? Object.values(all ?? {}).reduce((sum, list) => sum + (list?.length ?? 0), 0)
    : (rows?.length ?? 0);

  const handleClick = async () => {
    setIsBusy(true);
    setFailed(false);
    try {
      if (isAllMode) {
        await exportAll(all ?? {});
      } else {
        await exportSheet(sheet, rows ?? []);
      }
    } catch (error) {
      console.error('Excel export failed:', error);
      setFailed(true);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isBusy || count === 0}
      title={
        count === 0 ? 'Nothing to export yet' : `Download ${count} record(s) as .xlsx`
      }
      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200"
    >
      {isBusy ? (
        <>
          <i className="fa-solid fa-spinner fa-spin"></i> Preparing...
        </>
      ) : failed ? (
        <>
          <i className="fa-solid fa-circle-exclamation text-red-600"></i> Retry
          export
        </>
      ) : (
        <>
          <i className="fa-solid fa-file-excel"></i> {label}
        </>
      )}
    </button>
  );
}
