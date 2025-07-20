import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes', icon: '📋' },
    { id: 'upload', name: 'Upload', icon: '📤' },
    { id: 'processing', name: 'Traitement', icon: '⚡' },
    { id: 'visualization', name: 'Visualisation', icon: '📊' },
    { id: 'account', name: 'Compte', icon: '👤' },
    { id: 'technical', name: 'Technique', icon: '🔧' }
  ];

  const faqs = [
    {
      category: 'upload',
      question: 'Comment uploader un fichier CSV ?',
      answer: 'Pour uploader un fichier CSV, allez sur la page "Upload", puis glissez-déposez votre fichier dans la zone prévue ou cliquez sur "Choisir un fichier" pour sélectionner votre fichier depuis votre ordinateur. Les fichiers doivent faire moins de 100MB.'
    },
    {
      category: 'upload',
      question: 'Quels formats de fichiers sont supportés ?',
      answer: 'DimaClean supporte actuellement les formats CSV (.csv), Excel (.xlsx, .xls), et TSV (.tsv). Nous travaillons sur le support de formats additionnels comme JSON et XML.'
    },
    {
      category: 'upload',
      question: 'Quelle est la taille maximale des fichiers ?',
      answer: 'La taille maximale autorisée est de 100MB par fichier. Pour des fichiers plus volumineux, nous recommandons de les diviser en plusieurs parties ou de nous contacter pour des solutions personnalisées.'
    },
    {
      category: 'processing',
      question: 'Comment fonctionne le nettoyage automatique ?',
      answer: 'Notre algorithme de nettoyage automatique détecte et corrige les erreurs courantes : doublons, valeurs manquantes, formats incohérents, caractères spéciaux indésirables, et erreurs de saisie. Vous pouvez aussi personnaliser les règles de nettoyage.'
    },
    {
      category: 'processing',
      question: 'Puis-je annuler une opération de nettoyage ?',
      answer: 'Oui, vous pouvez annuler une opération en cours en cliquant sur le bouton "Annuler" dans la barre de progression. Les données originales sont toujours préservées jusqu\'à ce que vous confirmiez les modifications.'
    },
    {
      category: 'processing',
      question: 'Combien de temps prend le traitement ?',
      answer: 'Le temps de traitement dépend de la taille du fichier et de la complexité des données. En général : moins de 1000 lignes = quelques secondes, 1000-10000 lignes = 1-2 minutes, plus de 10000 lignes = 2-10 minutes.'
    },
    {
      category: 'visualization',
      question: 'Quels types de graphiques sont disponibles ?',
      answer: 'DimaClean propose plusieurs types de visualisations : graphiques en barres, courbes, camemberts, histogrammes, nuages de points, et cartes de chaleur. Tous sont interactifs et exportables.'
    },
    {
      category: 'visualization',
      question: 'Puis-je exporter les graphiques ?',
      answer: 'Oui, tous les graphiques peuvent être exportés en formats PNG, JPG, SVG ou PDF. Vous pouvez aussi copier le code pour intégrer les graphiques dans vos propres applications.'
    },
    {
      category: 'account',
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Absolument. Toutes vos données sont chiffrées en transit et au repos. Elles sont automatiquement supprimées de nos serveurs après 30 jours d\'inactivité. Nous ne partageons jamais vos données avec des tiers.'
    },
    {
      category: 'account',
      question: 'Puis-je collaborer avec mon équipe ?',
      answer: 'Oui, vous pouvez inviter des membres de votre équipe à collaborer sur vos projets. Différents niveaux d\'accès sont disponibles : lecture seule, édition, ou administration complète.'
    },
    {
      category: 'technical',
      question: 'Que faire si j\'ai une erreur lors de l\'upload ?',
      answer: 'Vérifiez d\'abord que votre fichier respecte les formats supportés et la taille limite. Si le problème persiste, essayez de rafraîchir la page ou contactez notre support avec le message d\'erreur exact.'
    },
    {
      category: 'technical',
      question: 'L\'application est-elle compatible avec tous les navigateurs ?',
      answer: 'DimaClean fonctionne optimalement sur Chrome, Firefox, Safari et Edge (versions récentes). Pour une meilleure expérience, nous recommandons d\'utiliser la dernière version de votre navigateur.'
    },
    {
      category: 'technical',
      question: 'Puis-je utiliser DimaClean sur mobile ?',
      answer: 'L\'interface est responsive et fonctionne sur mobile, mais pour une expérience optimale avec des fichiers volumineux, nous recommandons d\'utiliser un ordinateur de bureau ou une tablette.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout currentPage="faq">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4 floating-element">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-white/70">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher dans les FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-12 pr-4 py-4 text-lg"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105'
                  : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <details key={index} className="card group">
                <summary className="cursor-pointer flex items-center justify-between p-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {faq.question}
                  </h3>
                  <span className="text-white/60 group-hover:text-white transition-colors text-xl">
                    +
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-white mb-2">Aucun résultat trouvé</h3>
              <p className="text-white/60 mb-6">
                Essayez avec d'autres mots-clés ou parcourez toutes les catégories
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="btn-secondary"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-white/70 mb-6">
              Notre équipe de support est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-primary">
                <span className="mr-2">💬</span>
                Chat en direct
              </button>
              <button className="btn-secondary">
                <span className="mr-2">📧</span>
                Envoyer un email
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;