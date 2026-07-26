export default function ContactPage() {
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
            <p>zwmkhaled@gmail.com</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-icon">💬</div>
            <h3>Message sent !</h3>
            <p>853 message</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-icon">⏰</div>
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>

        <div className="contact-form-section">
          <form
            className="contact-form"
            action="https://formspree.io/f/mojgpbjv"
            method="POST"
          >
            <h2>Send us a message</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                rows={5}
                required
              />
            </div>

            <input type="hidden" name="_subject" value="New ProjectFlow Contact Message" />
            <input type="hidden" name="_replyto" value="email" />

            <button type="submit" className="btn btn-primary btn-lg">
              Send Message ✉️
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

