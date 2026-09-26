import { formatDateParts } from './firestoreUtils';
import { toPlainText } from './richText';

/**
 * Builds .xlsx files for the admin panel.
 *
 * ExcelJS is loaded with a dynamic import so its ~1 MB never lands in any
 * page bundle — it is fetched only when someone actually clicks Export.
 */

/** Rich text and Firestore Timestamps need flattening before they hit a cell. */
function toCell(value) {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value;
  if (typeof value === 'object') {
    // A ProseMirror document, or a Firestore Timestamp.
    if (value.type === 'doc') return toPlainText(value);
    if (typeof value.toDate === 'function') return value.toDate();
    return JSON.stringify(value);
  }
  return value;
}

function dateCell(value) {
  return formatDateParts(value).label ?? '';
}

/**
 * Column definitions per collection. Keeping them here means the on-screen
 * table and the export can diverge without one breaking the other.
 */
export const SHEETS = {
  events: {
    title: 'Events',
    columns: [
      { header: 'Title', width: 34, get: (r) => r.title },
      { header: 'Date', width: 16, get: (r) => r.dateLabel || dateCell(r.eventDate) },
      { header: 'Location', width: 28, get: (r) => r.location },
      {
        header: 'Impact / Beneficiaries',
        width: 50,
        get: (r) => toPlainText(r.impact),
      },
      { header: 'Chief Guest', width: 50, get: (r) => toPlainText(r.chiefGuest) },
      { header: 'Sponsors / CSR', width: 50, get: (r) => toPlainText(r.sponsors) },
      { header: 'Description', width: 70, get: (r) => toPlainText(r.description) },
      { header: 'Photos', width: 10, get: (r) => r.images?.length ?? 0 },
      { header: 'Sponsor Logos', width: 14, get: (r) => r.sponsorLogos?.length ?? 0 },
      { header: 'Public URL', width: 44, get: (r, origin) => `${origin}/events/${r.id}` },
    ],
  },
  shelters: {
    title: 'Shelters',
    columns: [
      { header: 'Name', width: 32, get: (r) => r.name },
      { header: 'Type', width: 20, get: (r) => r.tag },
      { header: 'Address', width: 40, get: (r) => r.address },
      { header: 'Capacity', width: 18, get: (r) => r.capacity },
      { header: 'Description', width: 70, get: (r) => toPlainText(r.description) },
      { header: 'Map URL', width: 40, get: (r) => r.mapUrl },
      { header: 'Photos', width: 10, get: (r) => r.images?.length ?? 0 },
      { header: 'Public URL', width: 44, get: (r, origin) => `${origin}/shelters/${r.id}` },
    ],
  },
  volunteers: {
    title: 'Volunteers',
    columns: [
      { header: 'Name', width: 26, get: (r) => r.name },
      { header: 'Email', width: 32, get: (r) => r.email },
      { header: 'Phone', width: 20, get: (r) => r.phone },
      { header: 'City', width: 20, get: (r) => r.city },
      { header: 'Interest', width: 30, get: (r) => r.interest },
      { header: 'Availability', width: 20, get: (r) => r.availability },
      { header: 'Message', width: 50, get: (r) => r.message },
      { header: 'Status', width: 14, get: (r) => r.status },
      { header: 'Signed Up', width: 20, get: (r) => dateCell(r.createdAt) },
    ],
  },
  donors: {
    title: 'Donors',
    columns: [
      { header: 'Name', width: 26, get: (r) => r.name },
      { header: 'Email', width: 32, get: (r) => r.email },
      { header: 'Phone', width: 20, get: (r) => r.phone },
      { header: 'PAN', width: 16, get: (r) => r.pan },
      { header: 'Amount (INR)', width: 16, get: (r) => r.amount ?? '' },
      { header: 'Towards', width: 30, get: (r) => r.purpose },
      { header: 'Message', width: 50, get: (r) => r.message },
      { header: 'Submitted', width: 20, get: (r) => dateCell(r.createdAt) },
    ],
  },
};

function addSheet(workbook, key, rows, origin) {
  const spec = SHEETS[key];
  if (!spec) return;

  const sheet = workbook.addWorksheet(spec.title);

  sheet.columns = spec.columns.map((column) => ({
    header: column.header,
    key: column.header,
    width: column.width,
  }));

  rows.forEach((row) => {
    sheet.addRow(spec.columns.map((column) => toCell(column.get(row, origin))));
  });

  // Brand-blue header, frozen so it stays visible while scrolling.
  const header = sheet.getRow(1);
  header.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  header.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0A3085' },
  };
  header.alignment = { vertical: 'middle' };
  header.height = 22;
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: spec.columns.length },
  };

  // Long free-text columns read much better wrapped.
  spec.columns.forEach((column, index) => {
    if (column.width >= 50) {
      sheet.getColumn(index + 1).alignment = {
        wrapText: true,
        vertical: 'top',
      };
    }
  });

  if (rows.length === 0) {
    sheet.addRow(['No records yet']).getCell(1).font = {
      italic: true,
      color: { argb: 'FF888888' },
    };
  }
}

function triggerDownload(buffer, filename) {
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give the browser a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Exports a single collection as a one-sheet workbook. */
export async function exportSheet(key, rows) {
  const ExcelJS = (await import('exceljs')).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Helping Hearts Admin';
  workbook.created = new Date();

  addSheet(workbook, key, rows, window.location.origin);

  const buffer = await workbook.xlsx.writeBuffer();
  triggerDownload(buffer, `helping-hearts-${key}-${stamp()}.xlsx`);
}

/**
 * Exports everything as one workbook with a sheet per collection, plus a
 * summary sheet of record counts.
 *
 * @param {{events:[], shelters:[], volunteers:[], donors:[]}} data
 */
export async function exportAll(data) {
  const ExcelJS = (await import('exceljs')).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Helping Hearts Admin';
  workbook.created = new Date();

  const summary = workbook.addWorksheet('Summary');
  summary.columns = [
    { header: 'Section', key: 'section', width: 24 },
    { header: 'Records', key: 'count', width: 12 },
  ];
  Object.keys(SHEETS).forEach((key) => {
    summary.addRow([SHEETS[key].title, data[key]?.length ?? 0]);
  });
  summary.addRow([]);
  summary.addRow(['Exported', new Date().toLocaleString('en-IN')]);

  const summaryHeader = summary.getRow(1);
  summaryHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  summaryHeader.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFCC111A' },
  };

  Object.keys(SHEETS).forEach((key) => {
    addSheet(workbook, key, data[key] ?? [], window.location.origin);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  triggerDownload(buffer, `helping-hearts-all-data-${stamp()}.xlsx`);
}
