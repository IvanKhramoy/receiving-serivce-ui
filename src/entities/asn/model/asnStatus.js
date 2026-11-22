export const ASN_STATUS_LABELS = {
  EXPECTED: 'Ожидается',
  ARRIVED: 'Прибыла',
  CLOSED: 'Закрыта',
  CANCELLED: 'Отменена',
};

export const ASN_STATUS_OPTIONS  = Object.entries(ASN_STATUS_LABELS).
  map(([value, label]) => ({value, label}))

export const ASN_SORT_OPTIONS = [
  { value: 'arrivalTimeline.expected,desc', label: 'Сначала новые' },
  { value: 'arrivalTimeline.expected,asc', label: 'Сначала старые' },
  { value: 'vendorName,asc', label: 'Поставщик (А→Я)' },
  { value: 'vendorName,desc', label: 'Поставщик (Я→А)' },
  { value: 'status,asc', label: 'По статусу' },
];

export const ASN_FILTER_FIELDS = [
  { type: 'select', name: 'status', label: 'Статус', options: ASN_STATUS_OPTIONS },
  { type: 'dateRange', fromName: 'from_date', toName: 'to_date', label: 'Дата прибытия' },
];

/*
export const ASN_STATUS_COLOx RS = {
  EXPECTED: '#3b82f6',
  ARRIVED: '#f59e0b',
  CLOSED: '#10b981',
  CANCELLED: '#ef4444',
};*/
