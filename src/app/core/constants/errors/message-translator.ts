export function translateErrorMessage(error: string): string{
    return errorTranslations[error];
}

const errorTranslations: { [key: string]: string } = {
    "Invalid login credentials": "E-mail ou senha inválidos",
    "Email link is invalid or has expired": "O link do e-mail é inválido ou expirou",
    "User already registered": "Usuário já registrado",
    "Invalid JWT": "JWT inválido",
    "New password should be different from the old password." : "A nova senha deve ser diferente da senha antiga",
    "For security purposes, you can only request this once every 60 seconds": "Por motivos de segurança, você só pode solicitar isso uma vez a cada 60 segundos",
    "Failed to fetch": ""
};