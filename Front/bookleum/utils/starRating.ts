export function starRating(isbn: string): string {
  const secondLastDigit = parseInt(isbn[isbn.length - 2]);
  const lastDigit = parseInt(isbn[isbn.length - 1]);

  const baseRating = secondLastDigit % 2 === 0 ? 4 : 3;

  const mockRating = (baseRating + lastDigit * 0.1).toFixed(1);

  return mockRating;
}
