# notes

## cryptography

- there are 2 keys user-key and password-key
- user key is randomly generated key
- password key is password derived key
- before storing user-key in database it is encrypted using the password-key
- when a user logs in password-key is derived from password and stored in session or token
- when a user requests data first the user-key is decrypted using password-key then the data is decrypted using the user-key and then sent back to user
- when a user posts some new data similar process if followed for encryption
- when a user changes password first the old-password-key is derived then the constant user-key is encrypted then new-password-key is derived then and the constant decrypted user-key is encrypted using the new password-key
- passwords can be changed but can not be forgotten

## references

[stackoverflow](https://security.stackexchange.com/questions/157422/store-encrypted-user-data-in-database)
