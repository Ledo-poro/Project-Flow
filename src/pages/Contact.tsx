import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { ContactMessage } from '../types';
import { generateId } from '../utils/generateId';

export default function ContactPage() {
  const [messages, setMessages] = useLocalStorage<ContactMessage[]>('pm-messages', []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Message is required';
    else if (message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newMessage: ContactMessage = {
      id: generateId(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="page-subtitle">Have a question or feedback? We'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="contact-info-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>support@projectflow.app</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-icon">💬</div>
            <h3>Messages</h3>
            <p>{messages.length} messages sent</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-icon">⏰</div>
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>

        <div className="contact-form-section">
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
              <button
                className="btn btn-primary"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a message</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What's this about?"
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                Send Message ✉️
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

