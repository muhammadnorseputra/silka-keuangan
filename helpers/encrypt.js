function encrypt(text, key) {
  return [...text]
    .map((x, i) =>
      (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
}
function decrypt(text, key) {
  return String.fromCharCode(
    ...text
      .match(/.{1,2}/g)
      .map((e, i) => parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
  );
}

export { encrypt, decrypt };

/* 
Ex :
let enc = encrypt("My String", "Passphrase")
let dec = decrypt(enc, "Passphrase")

console.log(enc) // 1d185320041a1b0f14
console.log(dec) // My String
*/