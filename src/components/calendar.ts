import flatpickr from "flatpickr";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js";
import "flatpickr/dist/flatpickr.css";

flatpickr("#time", {
  mode: "range",
  dateFormat: "d.m.Y",
  locale: Ukrainian, 
  minDate: "today"  
});

