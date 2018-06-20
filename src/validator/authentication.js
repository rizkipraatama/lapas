export const isUsernameValid = (username) => {
  noSpace = /\s/; 
  return !username
    ? 'Username harus diisi' : noSpace.test(username)
    ? 'Tidak boleh menggunakan spasi' : undefined;
}

export const isEmailValid = (email) => {
  emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email 
    ? 'Email harus diisi' : !emailRegex.test(email) 
    ? 'Email tidak valid' : undefined;
}

export const isPasswordValid = (password) => {
  return !password
    ? 'Password harus diisi' : password.length < 5
    ? 'Password min 5 karakter' : undefined;
}

// TODO: Fungsi validasi sementara, buat lebih banyak fungsi validasi lainnya!
export const isNotEmpty = (value) => {
  return !value ? 'Field harus diisi' : undefined;
}

