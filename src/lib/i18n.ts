import type { Locale } from "@/types";

type T = Record<Locale, string>;

export const t = {
  nav: {
    home: { en: "Home", fr: "Accueil" } as T,
    how: { en: "How it works", fr: "Comment ça marche" } as T,
    tool: { en: "Try it", fr: "L'outil" } as T,
    contact: { en: "Contact", fr: "Contact" } as T,
    cta: { en: "Get started", fr: "Commencer" } as T,
  },
  hero: {
    badge1: { en: "Built for you", fr: "IA personnalisée" } as T,
    badge2: { en: "Your data stays yours", fr: "Données privées" } as T,
    badge3: { en: "Ready in seconds", fr: "Résultats instantanés" } as T,
    title1: { en: "Eat better", fr: "Ta nutrition" } as T,
    title2: { en: "without the guesswork", fr: "sur mesure" } as T,
    sub: {
      en: "Tell us your goal, your stats, and your budget. We'll handle the meal plan, the macros, and the grocery list — down to the prices at your store.",
      fr: "Plans repas personnalisés, paniers de courses optimisés, macros calculées — le tout adapté à ton profil et ton supermarché.",
    } as T,
    cta: { en: "Build my free plan", fr: "Créer mon plan gratuit" } as T,
    how: { en: "See how it works", fr: "Comment ça marche" } as T,
  },
  features: {
    label: { en: "How it works", fr: "Comment ça marche" } as T,
    title: { en: "Three steps", fr: "3 étapes" } as T,
    sub: {
      en: "Pick a goal, share a few details, and let the tool do the heavy lifting.",
      fr: "De l'objectif au panier de courses, MealCraft gère tout pour toi.",
    } as T,
    step1Title: { en: "Pick your goal", fr: "Définis ton objectif" } as T,
    step1Desc: {
      en: "Gaining muscle, losing fat, or staying where you are. Add your weight, height, and how active you are.",
      fr: "Prise de masse, sèche ou maintien. Renseigne ton profil — poids, taille, activité — et on s'occupe du reste.",
    } as T,
    step2Title: { en: "Get a real plan", fr: "L'IA génère ton plan" } as T,
    step2Desc: {
      en: "Not a generic template. A full day of meals with macros that actually match your body and your goal.",
      fr: "Un plan repas complet avec macros calculées pour TON profil. Pas de template générique, tout est adapté.",
    } as T,
    step3Title: { en: "Grab your cart", fr: "Ton panier est prêt" } as T,
    step3Desc: {
      en: "A grocery list with real prices from Intermarché, Carrefour, or Leclerc. Stays within your weekly budget.",
      fr: "Liste de courses avec les vrais prix de ton Intermarché, Carrefour ou Leclerc. Respecte ton budget.",
    } as T,
    feat1Title: { en: "Macros that fit you", fr: "Macros sur mesure" } as T,
    feat1Desc: {
      en: "Calories, protein, carbs, and fats — all based on your actual stats, not some average.",
      fr: "Calories, protéines, glucides et lipides calculés pour ton profil exact.",
    } as T,
    feat2Title: { en: "Real store prices", fr: "Prix réels" } as T,
    feat2Desc: {
      en: "Your cart is built using prices from the store you actually shop at.",
      fr: "Panier basé sur les prix de ton supermarché préféré en France.",
    } as T,
    feat3Title: { en: "Swap anything", fr: "Ajuste en un clic" } as T,
    feat3Desc: {
      en: "Don't like salmon? Swap it. Want more snacks? Just ask. It adapts to you.",
      fr: "Change un repas, ajuste les portions, adapte à tes envies du moment.",
    } as T,
  },
  app: {
    label: { en: "Try it", fr: "L'outil" } as T,
    title: { en: "Build your plan now", fr: "Crée ton plan maintenant" } as T,
    sub: {
      en: "Pick a goal, fill in a few details, and see what comes out.",
      fr: "Choisis ton objectif, remplis ton profil et laisse l'IA faire le reste.",
    } as T,
  },
  contact: {
    label: { en: "Contact", fr: "Contact" } as T,
    title: { en: "Get in touch", fr: "Nous contacter" } as T,
    sub: {
      en: "Bug report, feature idea, or just want to say hi — we read everything.",
      fr: "On lit chaque message. Que ce soit pour un bug, une suggestion ou juste dire bonjour.",
    } as T,
    email: { en: "Email", fr: "Email" } as T,
    response: { en: "Response time", fr: "Temps de réponse" } as T,
    responseVal: { en: "Usually under 24h", fr: "Sous 24h en général" } as T,
    name: { en: "Name", fr: "Nom" } as T,
    message: { en: "What's on your mind?", fr: "Ton message..." } as T,
    send: { en: "Send", fr: "Envoyer" } as T,
    sent: { en: "Sent!", fr: "Message envoyé !" } as T,
  },
  footer: {
    desc: {
      en: "Meal plans and grocery carts that actually fit your life. Built around your stats, your store, and your budget.",
      fr: "Nutrition personnalisée, guidée par la science. Plans repas et paniers de courses adaptés à tes objectifs.",
    } as T,
    nav: { en: "Pages", fr: "Navigation" } as T,
    legal: { en: "Legal", fr: "Légal" } as T,
    terms: { en: "Terms of service", fr: "Mentions légales" } as T,
    privacy: { en: "Privacy", fr: "Politique de confidentialité" } as T,
    tos: { en: "TOS", fr: "CGU" } as T,
    copy: { en: "All rights reserved.", fr: "Tous droits réservés." } as T,
  },
  paywall: {
    title: { en: "Free trial ended", fr: "Essai gratuit terminé" } as T,
    sub: {
      en: "You've used your 2 free plans. Go premium to keep going — unlimited plans, unlimited carts.",
      fr: "Tu as utilisé tes 2 générations gratuites. Passe en premium pour un accès illimité.",
    } as T,
    cta: { en: "Go premium — €4.99/mo", fr: "Passer premium — 4,99€/mois" } as T,
    features: {
      en: "Unlimited plans • Unlimited carts • Priority support",
      fr: "Plans illimités • Paniers illimités • Support prioritaire",
    } as T,
  },
};
