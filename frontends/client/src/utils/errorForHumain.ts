import { EError } from '@/Types/Enums'

const DIC_ERROR_MESSAGE: Record<EError, string> = {
  [EError.USER_NOT_FOUND]: 'Utilisateur introuvable',
  [EError.WRONG_PASSWORD]: 'Mot de passe incorrect',
  [EError.EMAIL_ALREADY_EXISTS]: 'Cet email est déjà utilisé',
  [EError.INVALID_OTP]: 'Code de vérification invalide',
  [EError.OTP_EXPIRED]: 'Le code de vérification a expiré',
  [EError.INTERNAL_SERVER_ERROR]: 'Erreur interne du serveur',
  [EError.TOKEN_EXPIRED]: 'Votre session a expiré. Veuillez vous reconnecter',
  [EError.TOKEN_INVALID]: 'Session invalide. Veuillez vous reconnecter',
  [EError.INCOMPLETE_DATA]: 'Données incomplètes. Veuillez vérifier tous les champs',
  [EError.UNAUTHORIZED]: 'Non autorisé. Veuillez vous connecter',
  [EError.FORBIDDEN]: "Accès refusé. Vous n'avez pas les permissions nécessaires",
  [EError.BAD_REQUEST]: 'Requête invalide',
  [EError.NOT_FOUND]: 'Ressource introuvable',
  [EError.EVENT_CAPACITY_EXCEEDED]: 'La capacité maximale a été atteinte',
  [EError.TICKET_NOT_FOUND]: 'Billet introuvable',
  [EError.TICKET_ALREADY_EXISTS]: 'Vous avez déjà un billet pour cet événement',
  [EError.EVENT_NOT_FOUND]: 'Événement introuvable',
  [EError.EVENT_ALREADY_EXISTS]: 'Un événement portant ce nom existe déjà',
  [EError.PAYMENT_NOT_FOUND]: 'Paiement introuvable',
  [EError.PAYMENT_REFUND_NOT_ALLOWED]: 'Remboursement non autorisé pour ce paiement',
  [EError.ERR_NETWORK]: 'Erreur de connexion au serveur\n. Vérifiez votre connexion internet',
}

export const translateError = (errorMessage: EError): string => {
  return DIC_ERROR_MESSAGE[errorMessage] ?? "Une erreur inattendue s'est produite"
}
