import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', priority: 'medium', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'lamiae.eljabri@emsi-edu.ma',
      action: 'Envoyer un email',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💬',
      title: 'Chat en direct',
      description: 'Disponible 24/7',
      action: 'Démarrer le chat',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📱',
      title: 'Support technique',
      description: 'Aide pour les problèmes techniques',
      action: 'Contacter le support',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const faqQuestions = [
    {
      question: 'Comment uploader un fichier CSV ?',
      answer: 'Allez sur la page Upload et glissez-déposez votre fichier ou cliquez sur "Choisir un fichier".'
    },
    {
      question: 'Quels formats de fichiers sont supportés ?',
      answer: 'Actuellement, nous supportons les fichiers CSV, Excel (.xlsx) et TSV.'
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Oui, toutes vos données sont chiffrées et supprimées automatiquement après traitement.'
    }
  ];

  return (
    <MainLayout currentPage="contact">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4 floating-element">
            Contactez-nous
          </h1>
          <p className="text-xl text-white/70">
            Une question ? Un problème ? Notre équipe est là pour vous aider
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Méthodes de contact</h2>
            
            {contactMethods.map((method, index) => (
              <div key={index} className="card group cursor-pointer">
                <div className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-xl">{method.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                <p className="text-white/70 mb-4">{method.description}</p>
                <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  {method.action} →
                </button>
              </div>
            ))}

            {/* Quick FAQ */}
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Questions fréquentes</h3>
              <div className="space-y-3">
                {faqQuestions.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="cursor-pointer text-white/80 hover:text-white font-medium">
                      {faq.question}
                    </summary>
                    <p className="text-white/60 mt-2 text-sm pl-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
              <button className="mt-4 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Voir toutes les FAQ →
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyer un message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✅</span>
                    <span className="text-green-300">Message envoyé avec succès ! Nous vous répondrons sous 24h.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Priorité
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="input-field w-full"
                    >
                      <option value="low">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Élevée</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field w-full resize-none"
                    placeholder="Décrivez votre problème ou votre question en détail..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white/60 text-sm">
                    * Champs obligatoires
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📤</span>
                        Envoyer le message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;