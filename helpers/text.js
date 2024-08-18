export function limitCharacters(str, limit) {
  // Jika panjang string melebihi limit, potong string dan tambahkan "..."
  if (str.length > limit) {
    return str.substring(0, limit);
  }
  return str;
}

// Contoh penggunaan
// let originalString = "Ini adalah contoh teks yang sangat panjang.";
// let limitedString = limitCharacters(originalString, 20);

// console.log(limitedString); // Output: Ini adalah contoh teks...
