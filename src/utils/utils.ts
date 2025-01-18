export type Item = {
    name: string,
    category: string,
    value: string,
    quantity: number,
    price: string,
    disabled: boolean
  };

export const getTotalValue = (items: Array<Item> | []) => {
    if (!items.length) return 0;
    const values = items.map((item => item.value.indexOf('$') !== -1 ? Number(item.value.split('$')[1]):Number(item.value)))
    return formatNumberWithCommas(values.reduce((acc, value) => acc+value, 0));
}

export const formatNumberWithCommas = (value: number): string => {
    return new Intl.NumberFormat('en-IN').format(value);
};

export const getTotalOutOfStock = (items: Array<Item> | []) => {
    return items.filter(item => Number(item.quantity) === 0 || !item.quantity).length;
}

export const getTotalCategory = (items: Array<Item> | []) => {
    const categories = items.map(item => item.category);
    return new Set([...categories]).size;
}

export const removeCurrencyFromValue = (symbol: string, value: string) => {
    if (!value) return '';
    const parts = value.split(symbol);
    return parts.length > 1 ? parts.slice(1).join(symbol) : value;
}

export const ensureDollarPrefix = (value: string): string => {
    return value.includes('$') ? value : `$${value}`;
};