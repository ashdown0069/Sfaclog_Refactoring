'use server';

export const testfn = async () => {
  const response = await fetch('https://swapi.dev/api/people/1');
  const result = await response.json();
  if (!result) return '';
  return result;
};
