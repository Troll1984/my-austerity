import { asceticTemplates } from '../componetsIndex/templateAscesa';

/**
 * Each entry is a card section. Edit `optionIds` to choose which templates
 * appear inside that section. New templates can be added to templateAscesa.ts
 * and then included in the sections where they belong.
 */
const allTemplateIds = asceticTemplates.map(template => template.id);

export const templateSections = asceticTemplates.map(template => ({
  id: template.id,
  image: template.img,
  optionIds: [...allTemplateIds],
}));
