import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ContactCTA = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, message });
    // Here you would typically send the form data to your backend
    alert("Votre message a été envoyé. Nous vous contacterons très prochainement!");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-20 bg-qit-purple text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-lg text-white/80 mb-6">
              Vous souhaitez nous confier la gestion de votre bien ou en savoir plus sur nos services ? 
              Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Téléphone / WhatsApp</p>
                  <p>+330601777633</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>guest.qitconcierge@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Adresse</p>
                  <p>123 Avenue des Champs-Élysées, 75008 Paris</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white text-foreground rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nom
                </label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  placeholder="Votre message..."
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full bg-qit-coral hover:bg-qit-coral/90">Envoyer</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
