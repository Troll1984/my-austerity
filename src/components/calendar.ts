import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import 'flatpickr/dist/flatpickr.css';

const timeInput = document.querySelector<HTMLInputElement>('#time');

export const datePicker = timeInput
  ? flatpickr(timeInput, {
      mode: 'range',
      dateFormat: 'd.m.Y',
      locale: Ukrainian,
    })
  : null;