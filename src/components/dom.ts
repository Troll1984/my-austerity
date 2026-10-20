export function getElement(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);

    if (!element) {
        throw new Error(`Элемент ${selector} не найден`);
    }

    return element;
}
export function getForm(selector: string): HTMLFormElement {
    const element = document.querySelector<HTMLFormElement>(selector);

    if (!element) {
        throw new Error(`Форма ${selector} не найдена`);
    }

    return element;
}

