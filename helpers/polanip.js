export function polaNIP(nip) {
  // Memisahkan bagian-bagian dari NIP
  let part1 = nip.substring(0, 8); // 19690115
  let part2 = nip.substring(8, 14); // 198903
  let part3 = nip.substring(14, 15); // 1
  let part4 = nip.substring(15, 18); // 006

  // Menggabungkan kembali dengan format yang diinginkan
  let formattedNIP = `${part1} ${part2} ${part3} ${part4}`;

  return formattedNIP;
}

// Contoh penggunaan
// let nip = "196901151989031006";
// let formattedNIP = formatNIP(nip);
// console.log(formattedNIP);  // Output: 19690115 198903 1 006
