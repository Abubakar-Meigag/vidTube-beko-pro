
export function formatNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) {
    console.error('Invalid number passed to formatNumber:', num);
    return '0'; // Return a default value
  }

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
}
