export function terbilangRupiah(angka) {
  var satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];

  function terbilangAngka(nomor) {
    if (nomor < 12) {
      return satuan[nomor];
    } else if (nomor < 20) {
      return terbilangAngka(nomor - 10) + " belas";
    } else if (nomor < 100) {
      return (
        terbilangAngka(Math.floor(nomor / 10)) +
        " puluh " +
        terbilangAngka(nomor % 10)
      );
    } else if (nomor < 200) {
      return "seratus " + terbilangAngka(nomor - 100);
    } else if (nomor < 1000) {
      return (
        terbilangAngka(Math.floor(nomor / 100)) +
        " ratus " +
        terbilangAngka(nomor % 100)
      );
    } else if (nomor < 2000) {
      return "seribu " + terbilangAngka(nomor - 1000);
    } else if (nomor < 1000000) {
      return (
        terbilangAngka(Math.floor(nomor / 1000)) +
        " ribu " +
        terbilangAngka(nomor % 1000)
      );
    } else if (nomor < 1000000000) {
      return (
        terbilangAngka(Math.floor(nomor / 1000000)) +
        " juta " +
        terbilangAngka(nomor % 1000000)
      );
    } else if (nomor < 1000000000000) {
      return (
        terbilangAngka(Math.floor(nomor / 1000000000)) +
        " miliar " +
        terbilangAngka(nomor % 1000000000)
      );
    } else if (nomor < 1000000000000000) {
      return (
        terbilangAngka(Math.floor(nomor / 1000000000000)) +
        " triliun " +
        terbilangAngka(nomor % 1000000000000)
      );
    } else {
      return "Angka terlalu besar";
    }
  }

  return terbilangAngka(angka) + " rupiah";
}

// Contoh penggunaan:
// console.log(terbilangRupiah(123456789));  // Output: "seratus dua puluh tiga juta empat ratus lima puluh enam ribu tujuh ratus delapan puluh sembilan rupiah"
